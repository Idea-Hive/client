import { onLikeProjectApi, ProjectDetailData } from "@/apis/project/projectApis";
import { User } from "@/apis/user/userApis";
import Button from "@/components/Button";
import { LikedIcon, ShareIcon, ViewIcon } from "@/components/icons/icons";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useProjectDetail, useUserInfo } from "../../../hooks/Hooks";
import ApplicantButton from "./ApplicantButton";
import RecruitAdditionalMemberButton from "./RecruitAdditionalMemberButton";
import StartProjectButton from "./StartProjectButton";

export default function RightSection() {
    const { projectId } = useParams();
    const { user } = useUserInfo();
    const { project, projectIsPending } = useProjectDetail(Number(projectId), user);
    console.log("project:::", project);

    const [isCopied, setIsCopied] = useState<boolean>(false);

    if (!project) return null;
    return (
        <div className="flex flex-col justify-between">
            <div className="flex gap-3 items-center text-sm text-black">
                <div
                    className="flex gap-1.5 items-center cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setIsCopied(true);
                    }}
                >
                    <ShareIcon />
                    공유하기
                </div>
                <div className="flex gap-1.5 items-center">
                    <Like project={project} user={user} />
                </div>
                <div className="flex gap-1.5 items-center">
                    <ViewIcon />
                    {project.viewCnt}
                </div>
            </div>
            {user && (
                <div className="flex justify-end">
                    {/* 프로젝트 작성자 && 프로젝트 시작 전 */}
                    {project.creatorId === user.id && project.projectStatus === "RECRUITING" && <StartProjectButton projectId={project.projectId} isNew={project.isNew} />}
                    {/* 프로젝트 작성자 && 프로젝트 진행중 */}
                    {project.creatorId === user.id && project.projectStatus === "IN_PROGRESS" && <RecruitAdditionalMemberButton projectId={project.projectId} />}
                    {/* 지원자 && 아직 지원 안함 */}
                    {project.creatorId !== user.id && project.projectStatus === "RECRUITING" && !project.isApply && <ApplicantButton projectId={project.projectId} memberId={user.id} />}
                    {/* 지원자 && 지원 했음(확정도 포함) */}
                    {project.creatorId !== user.id && project.isApply && <Button label="지원완료" disabled={true} className="w-fit px-6" onClick={() => {}} />}
                </div>
            )}
            {isCopied && <Toast message="링크가 복사되었습니다." type="success" onClose={() => setIsCopied(false)} />}
        </div>
    );
}

const Like = ({ project, user }: { project: ProjectDetailData; user: User | undefined }) => {
    const spinner = useSpinner();
    const queryClient = useQueryClient();

    const [likedErr, setLikedErr] = useState<boolean>(false);
    const [likedErrMsg, setLikedErrMsg] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const onLikeMutation = useMutation({
        mutationFn: onLikeProjectApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: () => {
            setIsSuccess(true);
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId: Number(project.projectId), userId: user?.id }] });
        },
        onError: () => {
            setLikedErr(true);
            setLikedErrMsg("좋아요 처리 중 오류가 발생했습니다.");
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const onClickLikedIcon = () => {
        if (!user) {
            setLikedErr(true);
            setLikedErrMsg("로그인 후 이용해주세요.");
            return;
        }

        if (project.creatorId === user.id) {
            setLikedErr(true);
            setLikedErrMsg("작성자는 좋아요를 누를 수 없습니다.");
            return;
        }

        onLikeMutation.mutate({
            projectId: project.projectId,
            memberId: user.id,
            isLike: !project.isLike,
        });
    };

    return (
        <>
            <LikedIcon isLike={project.isLike} onClick={onClickLikedIcon} />
            {project.likedCnt}

            {likedErr && <Toast message={likedErrMsg} type="error" onClose={() => setLikedErr(false)} />}
            {isSuccess && <Toast message={`${project.isLike ? "좋아요" : "좋아요 취소"} 처리가 완료되었습니다.`} type="success" onClose={() => setIsSuccess(false)} />}
        </>
    );
};
