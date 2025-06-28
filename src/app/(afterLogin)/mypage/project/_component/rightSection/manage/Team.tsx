import { useTeamStore } from "../../../_store/teamStore";

const Team = () => {
    const { members } = useTeamStore();

    return (
        <div>
            Team 컴포넌트입니다.
        </div>
    );
}

export default Team;