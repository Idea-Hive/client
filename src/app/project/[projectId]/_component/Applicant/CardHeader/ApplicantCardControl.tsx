import { Applicant, onCancelApplicantApi } from "@/apis/project/projectApis";
import { HamburgerIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useIdsForApplicant } from "../../../store/store";
import ProjectApplicantApplicantCardDropdown from "../ProjectApplicantApplicantCardDropdown";

// 지원자 3DotsVertical
export default function ApplicantCardControl({ setIsEdit, applicant }: { setIsEdit: Dispatch<SetStateAction<boolean>>; applicant: Applicant }) {
    const { projectId, loginUserId } = useIdsForApplicant();

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

    const onCancelApplicantMutation = useCreateMutation(onCancelApplicantApi, "cancelApplicant", {
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
                    <ProjectApplicantApplicantCardDropdown
                        setIsDotsThreeVerticalOpen={setIsDotsThreeVerticalOpen}
                        setIsCancelModalOpen={setIsCancelModalOpen}
                        setIsEdit={setIsEdit}
                        state={applicant.isAccepted}
                    />
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
}
