import { ProjectDetailData } from "@/apis/project/projectApis";
import { User } from "@/apis/user/userApis";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

export default function Header({ data, user }: { data: ProjectDetailData; user: User | undefined }) {
    return (
        <div className="w-full bg-n75">
            <div className="w-[1200px] mx-auto flex justify-between items-stretch py-10">
                <LeftSection data={data} />
                <RightSection data={data} user={user} />
            </div>
        </div>
    );
}
