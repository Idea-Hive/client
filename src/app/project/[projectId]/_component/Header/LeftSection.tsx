import { SmallUserImgIcon } from "@/components/icons/icons";
import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";
import { useProjectDetail, useUserInfo } from "../../hooks/Hooks";

export default function LeftSection() {
    const { projectId } = useParams();
    const { user } = useUserInfo();
    const { project, projectIsPending } = useProjectDetail(Number(projectId), user);

    if (projectIsPending) return <Spinner />;
    if (!project) return <div>존재하지 않는 프로젝트입니다.</div>;
    return (
        <div>
            <div className="text-taskmateRed text-smEmphasize mb-2">모집중</div>

            <div className="text-h2 text-n900 mb-3 flex items-center">
                {project.title}
                <span className="ml-2 text-h3 text-taskmateRed">D-12</span>
            </div>

            <div className="flex gap-2 items-center mb-6">
                {project.hashtagNames.map((item) => {
                    return (
                        <div key={item} className="w-fit h-8 px-3 text-n800 text-xs leading-8 rounded-md bg-[#edeff5]">
                            {item}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-2">
                <div className="flex gap-2 items-center">
                    <SmallUserImgIcon />
                    <div className="text-smEmphasize text-n900">{project.creatorName}</div>
                </div>

                <div className="flex gap-2 items-center text-sm text-n800">
                    <div>{project.creatorJob}</div>
                    <div className="w-[1px] h-[15.5px] bg-n300"></div>
                    <div>경력 {project.creatorCareer || 0}년</div>
                    <div className="w-[1px] h-[15.5px] bg-n300"></div>
                    <div>프로젝트 경험 {project.creatorCompletedProjectCnt}회</div>
                    <div>·</div>
                    <div>{project.dueDateFrom.slice(0, 10)}</div>
                </div>
            </div>
        </div>
    );
}
