import Selectbox from "@/components/Selectbox";
import Content from "./Content";

const SelectboxExample = () => {
    return (
        <Content
            description="Selectbox Component 입니다."
            props={[
                { name: "placeholder", type: "string", description: "Selectbox 플레이스홀더" },
                { name: "options", type: "Array<{ value: string; label: string }>", description: "Selectbox 옵션" },
                { name: "onChange", type: "function", description: "Selectbox 값 변경 시 실행될 함수" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <Selectbox
                            placeholder="Selectbox"
                            options={[
                                { value: "1", label: "1" },
                                { value: "2", label: "2" },
                                { value: "3", label: "3" },
                            ]}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

export default SelectboxExample;
