import Tab from "@/components/Tab";
import Content from "./Content";

const TabExample = () => {
    return (
        <Content
            description="Tab Component 입니다."
            props={[
                { name: "items", type: "{ value: string; label: string; children: React.ReactNode }[]", description: "Tab 아이템 목록" },
                { name: "defaultTab", type: "string", description: "기본 선택된 탭" },
            ]}
            examples={[
                {
                    description: "기본 사용1",
                    code: (
                        <Tab
                            items={[
                                { value: "tab1", label: "Tab1", children: <div>Tab1</div> },
                                { value: "tab2", label: "Tab2", children: <div>Tab2</div> },
                                { value: "tab3", label: "Tab3", children: <div>Tab3</div> },
                                { value: "tab4", label: "Tab4", children: <div>Tab4</div> },
                                { value: "tab5", label: "Tab5", children: <div>Tab5</div> },
                            ]}
                            defaultTab="tab1"
                        />
                    ),
                },
                {
                    description: "기본 사용2",
                    code: (
                        <Tab
                            items={[
                                { value: "tab1", label: "Tab1", children: <div>Tab1</div> },
                                { value: "tab2", label: "Tab2", children: <div>Tab2</div> },
                                { value: "tab3", label: "Tab3", children: <div>Tab3</div> },
                                { value: "tab4", label: "Tab4", children: <div>Tab4</div> },
                                { value: "tab5", label: "Tab5", children: <div>Tab5</div> },
                            ]}
                            defaultTab="tab1"
                        />
                    ),
                },
            ]}
        />
    );
};

export default TabExample;
