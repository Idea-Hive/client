import MyProjects from "./_component/MyProjects";
import ProfileInfo from "./_component/ProfileInfo";

export default function Profile() {
    return (
        <div className="flex flex-col gap-5">
            <ProfileInfo />
            <MyProjects />
        </div>
    );
}
