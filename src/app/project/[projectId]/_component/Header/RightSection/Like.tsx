import { onLikeProjectApi } from "@/apis/project/projectApis";
import { LikedIcon } from "@/components/icons/icons";
import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { useUserInfo } from "@/hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useProjectDetail } from "../../../hooks/Hooks";

export default function Like() {
    const { showToast } = useToast();

    const { projectId } = useParams();

    const { user } = useUserInfo();
    const { project } = useProjectDetail(Number(projectId), user);

    const queryClient = useQueryClient();

    const onLikeMutation = useCreateMutation(onLikeProjectApi, "likeProject", {
        onSuccess: () => {
            showToast("success", `${project!.isLike ? "좋아요" : "좋아요 취소"} 처리가 완료되었습니다.`);
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId: Number(projectId), userId: user?.id }] });
        },
        onError: () => {
            showToast("error", "좋아요 처리 중 오류가 발생했습니다.");
        },
    });

    const onClickLikedIcon = () => {
        if (!user) {
            showToast("error", "로그인 후 이용해주세요.");
            return;
        }

        if (!project) return;
        if (project.creatorId === user.id) {
            showToast("error", "작성자는 좋아요를 누를 수 없습니다.");
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
        </>
    );
}
