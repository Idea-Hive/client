import Selectbox from "@/components/Selectbox";
import Menu from "../_component/Menu";
import { FolderIcon, SquaresFourIcon } from "@/components/icons/icons";

export default function ManageProjects() {
    return (
        <div className="flex flex-col gap-4">
            <Selectbox
                placeholder="Selectbox"
                options={[
                    { value: "1", label: "테스크메이트" },
                    { value: "2", label: "음하하프로젝트" },
                    { value: "3", label: "냐하하프로젝트" },
                ]}
            />
            <div>
                <Menu
                    label="프로젝트"
                    href="#"
                    subItems={[
                        { label: "대시보드", href: "#" },
                        { label: "캘린더", href: "#" },
                    ]}
                    defaultOpen={true}
                    icon={<div className='w-[20px] h-[20px] p-[3px]'><SquaresFourIcon /></div>}
                />
                <Menu
                    label="프로세스"
                    href="#"
                    subItems={[
                        { label: "기획", href: "#" },
                        { label: "디자인", href: "#" },
                        { label: "개발", href: "#" },
                        { label: "배포", href: "#" },
                        { label: "완료", href: "#" },
                    ]}
                    defaultOpen={true}
                    icon={<FolderIcon width={20} height={20}/>}
                />
                <Menu label="팀" href="#" subItems={[]} defaultOpen={true} icon={<FolderIcon width={20} height={20}/>} />
            </div>
        </div>
    );
}
