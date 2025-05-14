import { FolderIcon } from "@/components/icons/icons"; //TODO
import Content from "./Content";
import Menu from "@/components/Menu";

const MenuExample = () => {
    return (
        <Content
            description="Menu Component 입니다."
            props={[
                 { name: "label", type: "string", description: "상위 메뉴명" },
                 { name: "href", type: "string", description: "상위 메뉴별 화면링크"},
                 { name: "subItems", type: "Array<{ label: string; href: string; icon: string; }>", description: "하위 메뉴 항목들"},
                 { name: "defaultOpen", type: "boolean", description: "메뉴 펼치기 여부"},
                 { name: "icon", type: "React.ReactNode", description: "상위 메뉴 아이콘"}
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <Menu
                            label="Menu"
                            href="#"
                            subItems={[
                                {label: "SubMenu0", href: "#"},
                                {label: "SubMenu1", href: "#"},
                                {label: "SubMenu2", href: "#"}
                            ]}
                            defaultOpen={true}
                            icon={<FolderIcon/>}
                        />
                    ),
                },
            ]}
        />
    );
}

export default MenuExample;
