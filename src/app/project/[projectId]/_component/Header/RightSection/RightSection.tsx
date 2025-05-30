import { onLikeProjectApi, ProjectDetailData } from "@/apis/project/projectApis";
import { User } from "@/apis/user/userApis";
import Button from "@/components/Button";
import { LikedIcon, ShareIcon, ViewIcon } from "@/components/icons/icons";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ApplicantButton from "./ApplicantButton";
import RecruitAdditionalMemberButton from "./RecruitAdditionalMemberButton";
import StartProjectButton from "./StartProjectButton";

export default function RightSection({ data, user }: { data: ProjectDetailData; user: User | undefined }) {
    console.log(data);
    console.log("user:::", user);

    if (!user) return null;
    return (
        <div className="flex flex-col justify-between">
            <div className="flex gap-3 items-center text-sm text-black">
                <div className="flex gap-1.5 items-center">
                    <ShareIcon />
                    공유하기
                </div>
                <div className="flex gap-1.5 items-center">
                    <Like data={data} user={user} />
                </div>
                <div className="flex gap-1.5 items-center">
                    <ViewIcon />
                    {data.viewCnt}
                </div>
            </div>
            <div className="flex justify-end">
                {/* 프로젝트 작성자 && 프로젝트 시작 전 */}
                {data.creatorId === user.id && data.projectStatus === "RECRUITING" && <StartProjectButton projectId={data.projectId} />}
                {/* 프로젝트 작성자 && 프로젝트 진행중 */}
                {data.creatorId === user.id && data.projectStatus === "IN_PROGRESS" && <RecruitAdditionalMemberButton projectId={data.projectId} />}
                {/* 지원자 && 아직 지원 안함 */}
                {data.creatorId !== user.id && data.projectStatus === "RECRUITING" && <ApplicantButton projectId={data.projectId} memberId={user.id} />}
                {/* 지원자 && 지원 했음 */}
                {data.creatorId !== user.id && data.projectStatus === "IN_PROGRESS" && <Button label="지원완료" disabled={true} className="w-fit px-6" onClick={() => {}} />}
            </div>
        </div>
    );
}

const Like = ({ data, user }: { data: ProjectDetailData; user: User | undefined }) => {
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
            queryClient.invalidateQueries({ queryKey: ["getProjectDetail", { projectId: Number(data.projectId) }] });
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

        if (data.creatorId === user.id) {
            setLikedErr(true);
            setLikedErrMsg("작성자는 좋아요를 누를 수 없습니다.");
            return;
        }

        onLikeMutation.mutate({
            projectId: data.projectId,
            memberId: user.id,
            like: false,
        });
    };

    return (
        <>
            <LikedIcon onClick={onClickLikedIcon} />
            {data.likedCnt}

            {likedErr && <Toast message={likedErrMsg} type="error" onClose={() => setLikedErr(false)} />}
            {isSuccess && <Toast message="좋아요 처리가 완료되었습니다." type="success" onClose={() => setIsSuccess(false)} />}
        </>
    );
};
