import { ProjectDetailData } from "@/apis/project/projectApis";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

export default function Header({ data }: { data: ProjectDetailData }) {
    return (
        <div className="w-full bg-n75">
            <div className="w-[1200px] mx-auto flex justify-between items-stretch py-10">
                <LeftSection data={data} />
                <RightSection data={data} />
            </div>
        </div>
    );
}
