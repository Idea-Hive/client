import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import { useParams } from "next/navigation";
import { useTeamStore } from "../../../_store/teamStore";
import MemberCard from "../../MemberCard";

const Team = () => {
    const { members } = useTeamStore();
    const { projectId } = useParams();
    const { user } = useUserInfo();

    return (
        <div className="p-10">
            <div className="text-h2 text-n900 left-0 pb-[16px]">팀</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {members?.map((member) => (
                    <MemberCard key={member.id} userId={user?.id} member={member} currentLeaderId={members.find((m) => m.projectRole === "LEADER")!.id} projectId={Number(projectId)} />
                ))}
            </div>
        </div>
    );
};

export default Team;
