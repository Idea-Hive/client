import { onLikeProjectApi } from "@/apis/project/projectApis";
import { LikedIcon } from "@/components/icons/icons";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useUserInfo } from "@/hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useProjectDetail } from "../../../hooks/Hooks";

export default function Like() {
    const { projectId } = useParams();

    const { user } = useUserInfo();
    const { project } = useProjectDetail(Number(projectId), user);

    const queryClient = useQueryClient();

    const [likedErr, setLikedErr] = useState<boolean>(false);
    const [likedErrMsg, setLikedErrMsg] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const onLikeMutation = useCreateMutation(onLikeProjectApi, "likeProject", {
        onSuccess: () => {
            setIsSuccess(true);
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId: Number(projectId), userId: user?.id }] });
        },
        onError: () => {
            setLikedErr(true);
            setLikedErrMsg("좋아요 처리 중 오류가 발생했습니다.");
        },
    });

    const onClickLikedIcon = () => {
        if (!user) {
            setLikedErr(true);
            setLikedErrMsg("로그인 후 이용해주세요.");
            return;
        }

        if (!project) return;
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

    if (!project) return null;
    return (
        <>
            <LikedIcon isLike={project.isLike} onClick={onClickLikedIcon} />
            {project.likedCnt}

            {likedErr && <Toast message={likedErrMsg} type="error" onClose={() => setLikedErr(false)} />}
            {isSuccess && <Toast message={`${project.isLike ? "좋아요" : "좋아요 취소"} 처리가 완료되었습니다.`} type="success" onClose={() => setIsSuccess(false)} />}
        </>
    );
}
