import { handleApplicantDecisionApi } from "@/apis/applicant/applicantApis";
import { Applicant, onCancelApplicantApi } from "@/apis/project/projectApis";
import Button from "@/components/Button";
import { HamburgerIcon, UserImgIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useIdsForApplicant } from "../../store/store";
import { CardState } from "./ApplicantCard";
import ProjectApplicantApplicantCardDropdown from "./ProjectApplicantApplicantCardDropdown";
import ProjectOwnerApplicantCardDropdown from "./ProjectOwnerApplicantCardDropdown";

export default function CardHeader({
    state,
    isEdit,
    setIsEdit,
    applicant,
    isReject,
    setIsReject,
}: {
    state: CardState;
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    applicant: Applicant;
    isReject: boolean;
    setIsReject: Dispatch<SetStateAction<boolean>>;
}) {
    const { projectCreatorId, loginUserId } = useIdsForApplicant();

    return (
        <div className={`flex justify-between ${projectCreatorId === loginUserId ? "items-center" : "items-start"}`}>
            <UserInfo applicant={applicant} state={state} />

            {!isEdit &&
                (projectCreatorId === loginUserId ? (
                    applicant.isAccepted === "CONFIRMED" ? (
                        <ProjectOwnerCardControlConfirmed applicantMemberId={applicant.memberId} />
                    ) : applicant.isAccepted === "UNDECIDED" ? (
                        <ProjectOwnerCardControlUnconfirmed applicantMemberId={applicant.memberId} applicantId={applicant.applyId} setIsReject={setIsReject} isReject={isReject} />
                    ) : null
                ) : (
                    <ApplicantCardControl applicant={applicant} setIsEdit={setIsEdit} />
                ))}
        </div>
    );
}

const UserInfo = ({ applicant, state }: { applicant: Applicant; state: CardState }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
                <UserImgIcon />

                <div className="text-lg text-n900 font-medium flex gap-1 items-center">
                    {applicant.name}
                    {state === "confirm" && <div className="w-fit h-[18px] px-1.5 bg-taskmateRed rounded-[12px] text-[10px] leading-[18px] text-white font-normal">확정</div>}
                </div>
            </div>

            <div className="flex gap-2 items-center text-sm text-n900">
                <div>{applicant.job || "프론트엔드 개발자"}</div>
                <div className="w-[1px] h-[15.5px] bg-n300"></div>
                <div>경력 {applicant.career || 0}년</div>
                <div className="w-[1px] h-[15.5px] bg-n300"></div>
                <div>프로젝트 경험 {applicant.completedProjectCnt}회</div>
            </div>
        </div>
    );
};

// 지원자 3DotsVertical
const ApplicantCardControl = ({ setIsEdit, applicant }: { setIsEdit: Dispatch<SetStateAction<boolean>>; applicant: Applicant }) => {
    const { projectId, loginUserId } = useIdsForApplicant();

    const spinner = useSpinner();
    const queryClient = useQueryClient();

    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);

    // DotsThreeVertical Dropdown 오픈 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dotsThreeVerticalRef.current && !dotsThreeVerticalRef.current.contains(event.target as Node)) {
                setIsDotsThreeVerticalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false); // 지원 취소 모달 오픈

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false); // 성공 모달 오픈
    const [isErrorToastOpen, setIsErrorToastOpen] = useState<boolean>(false); // 에러메세지 토스트 오픈
    const [errorMessage, setErrorMessage] = useState<string>(""); // 에러메세지

    const onCancelApplicantMutation = useMutation({
        mutationFn: onCancelApplicantApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("onCancelApplicantMutation Success:::", response);
            setIsCancelModalOpen(false);
            setIsSuccessModalOpen(true);
        },
        onError: (error) => {
            console.error("onCancelApplicantMutation Error:::", error);
            setErrorMessage("지원 취소 중 오류가 발생했습니다.");
            setIsErrorToastOpen(true);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const onCancelApplicant = () => {
        onCancelApplicantMutation.mutate({
            applyId: applicant.applyId,
        });
    };

    return (
        <>
            <div className="relative" ref={dotsThreeVerticalRef}>
                <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                    <HamburgerIcon />
                </div>

                {isDotsThreeVerticalOpen && (
                    <ProjectApplicantApplicantCardDropdown setIsDotsThreeVerticalOpen={setIsDotsThreeVerticalOpen} setIsCancelModalOpen={setIsCancelModalOpen} setIsEdit={setIsEdit} />
                )}
            </div>

            <Modal title="지원 취소" children="지원을 취소하시겠습니까?" isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} onConfirm={onCancelApplicant} />
            <Modal
                title="지원 취소"
                children="지원이 취소되었습니다."
                isOpen={isSuccessModalOpen}
                onConfirm={() => {
                    queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId, userId: loginUserId }] });
                    queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
                    setIsSuccessModalOpen(false);
                }}
            />

            {isErrorToastOpen && <Toast message={errorMessage} onClose={() => setIsErrorToastOpen(false)} />}
        </>
    );
};

// 프로젝트 생성자 카드 컨트롤 (For 확정 지원자)
const ProjectOwnerCardControlConfirmed = ({ applicantMemberId }: { applicantMemberId: number }) => {
    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);

    // DotsThreeVertical Dropdown 오픈 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dotsThreeVerticalRef.current && !dotsThreeVerticalRef.current.contains(event.target as Node)) {
                setIsDotsThreeVerticalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dotsThreeVerticalRef}>
            <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                <HamburgerIcon />
            </div>

            {isDotsThreeVerticalOpen && <ProjectOwnerApplicantCardDropdown setIsDotsThreeVerticalOpen={setIsDotsThreeVerticalOpen} applicantMemberId={applicantMemberId} />}
        </div>
    );
};

// 프로젝트 생성자 카드 컨트롤 (For 미정 지원자)
const ProjectOwnerCardControlUnconfirmed = ({
    applicantMemberId,
    setIsReject,
    isReject,
    applicantId,
}: {
    applicantMemberId: number;
    setIsReject: Dispatch<SetStateAction<boolean>>;
    isReject: boolean;
    applicantId: number;
}) => {
    const { projectId, loginUserId } = useIdsForApplicant();

    const spinner = useSpinner();
    const queryClient = useQueryClient();

    const [isErrorToastOpen, setIsErrorToastOpen] = useState<boolean>(false); // 에러메세지 토스트 오픈

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false); // 지원 승낙 모달 오픈
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false); // 성공 모달 오픈

    const handleApplicantDecisionMutation = useMutation({
        mutationFn: handleApplicantDecisionApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (response) => {
            console.log("handleApplicantDecisionMutation Success:::", response);
            setIsConfirmModalOpen(false);
            setIsSuccessModalOpen(true);
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId, userId: loginUserId }] });
            queryClient.invalidateQueries({ queryKey: ["getApplicantInfo", { projectId: Number(projectId), page: 1, size: 4 }] });
        },
        onError: (error) => {
            console.error("handleApplicantDecisionMutation Error:::", error);
            setIsErrorToastOpen(true);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const onConfirmApplicant = () => {
        handleApplicantDecisionMutation.mutate({
            projectId,
            userId: applicantMemberId,
            applyId: applicantId,
            decision: "CONFIRMED",
            rejectionMessage: "",
        });
    };

    if (isReject) return null;
    return (
        <>
            <div className="flex gap-2">
                <Button label="거절" btnType="line" size="small" className="w-[74px]" onClick={() => setIsReject(true)} />
                <Button label="승낙" btnType="primary" size="small" className="w-[74px]" onClick={() => setIsConfirmModalOpen(true)} />
            </div>

            <Modal title="지원 승낙" children="지원을 승낙하시겠습니까?" isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={onConfirmApplicant} />
            <Modal
                title="지원 승낙"
                children="지원이 승낙되었습니다."
                isOpen={isSuccessModalOpen}
                onConfirm={() => {
                    setIsSuccessModalOpen(false);
                }}
            />

            {isErrorToastOpen && <Toast message="지원 승낙 중 오류가 발생했습니다." onClose={() => setIsErrorToastOpen(false)} />}
        </>
    );
};
