import Checkbox from "@/components/Checkbox";
import Content from "./Content";

const CheckboxExample = () => {
    return (
        <Content
            description="Checkbox Component 입니다."
            props={[
                { name: "checked", type: "boolean", description: "Checkbox 체크 여부" },
                { name: "value", type: "string", description: "Checkbox 값" },
                { name: "label", type: "string", description: "Checkbox 라벨" },
                { name: "onClick", type: "function", description: "Checkbox 클릭 시 실행될 함수" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <Checkbox
                            checked={false}
                            value="Checkbox"
                            label="Checkbox"
                            onClick={(value, checked) => {
                                console.log(value, checked);
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

export default CheckboxExample;
