import { MemberResponse, onChangeLeaderApi } from "@/apis/project/manageApis";
import { CTAButton, ProfileLargerIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useSpinner } from "@/components/Spinner";
import { useToast } from "@/components/Toast/ToastProvider";
import { useClickOutside } from "@/hooks/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import Dropbox from "./Dropbox";

interface MemberCardProps {
    userId: number | undefined;
    member: MemberResponse;
    currentLeaderId: number;
    projectId: number;
}

const memberRole = {
    LEADER: "팀장",
    TEAM_MEMBER: "팀원",
    GUEST: "게스트",
};

const MemberCard = ({ userId, member, currentLeaderId, projectId }: MemberCardProps) => {
    return (
        <div className="w-[270px] h-[180px] border border-n400 bg-n0 rounded-lg hover:shadow-floatingCard ">
            <div className="p-6">
                <div className="flex flex-col">
                    <div className="flex justify-between w-full">
                        {member?.profileUrl ? <img src={member.profileUrl} alt="프로필이미지" className="w-10 h-10 rounded-full object-over" /> : <ProfileLargerIcon />}
                        {userId === currentLeaderId && member.projectRole !== "LEADER" && <MemberSettingDropDown beforeLeaderId={currentLeaderId} afterLeaderId={member.id} projectId={projectId} />}
                    </div>
                    <div className="flex mt-5 gap-1">
                        <p className="text-n900 text-smEmphasis">{member?.name}</p>
                        <div className="flex justify-center items-center">
                            <p className="text-n800 text-sm">{memberRole[member.projectRole]}</p>
                        </div>
                    </div>
                    <p className="mt-2 text-n900">{member?.job ? member?.job : "-"}</p>
                </div>
            </div>
        </div>
    );
};

const MemberSettingDropDown = ({ beforeLeaderId, afterLeaderId, projectId }: { beforeLeaderId: number; afterLeaderId: number; projectId: number }) => {
    const spinner = useSpinner();
    const { showToast } = useToast();
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const dropBoxRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropBoxRef, () => {
        if (isOpen) setIsOpen(false);
    });

    const [isModal, setIsModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // const deleteMemberMutation = useMutation({
    //     mutationFn: onDeleteMemberApi,
    //     onSuccess: () => {
    //         console.log("삭제 성공");
    //     },
    //     onError: (err: AxiosError) => {
    //         console.error("삭제 오류:", err);
    //     },
    // });

    const handleDeleteMember = () => {
        console.log("삭제");
        // deleteMemberMutation.mutate({ beforeLeaderId, afterLeaderId, projectId });
    };

    const changeLeaderMutation = useMutation({
        mutationFn: onChangeLeaderApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: () => {
            setIsModal(true);
            setModalTitle("팀장 변경");
            setModalMessage("팀장 변경이 완료되었습니다.");

            // 팀장 변경 후, 팀 멤버 query refresh
            queryClient.invalidateQueries({ queryKey: ["getTeamMembers", { id: projectId }] });
        },
        onError: (err: AxiosError) => {
            console.error("팀장 변경 오류:", err);
            showToast("error", "팀장 변경에 실패했습니다.");
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleChangeLeader = () => {
        changeLeaderMutation.mutate({ beforeLeaderId, afterLeaderId, projectId });
    };

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <CTAButton />
            </div>
            {isOpen && (
                <Dropbox
                    items={[
                        {
                            label: "삭제",
                            onClick: handleDeleteMember,
                        },
                        {
                            label: "팀장 변경",
                            onClick: handleChangeLeader,
                        },
                    ]}
                    dropBoxRef={dropBoxRef}
                    className="top-1/2 mt-1 right-0"
                />
            )}
            <Modal
                isOpen={isModal}
                title={modalTitle}
                children={modalMessage}
                onConfirm={() => {
                    setIsModal(false);
                }}
            />{" "}
        </div>
    );
};

export default MemberCard;
