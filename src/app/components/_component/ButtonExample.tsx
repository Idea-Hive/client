import Button from "@/components/Button";
import Content from "./Content";

const ButtonExample = () => {
    return (
        <Content
            description="Button Component 입니다."
            props={[
                { name: "label", type: "string", description: "Button 라벨" },
                { name: "onClick", type: "function", description: "Button 클릭 시 실행될 함수" },
                { name: "type", type: "Enum['submit' | 'button' | 'reset']", description: "Button 타입" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <Button
                            label="Button"
                            onClick={() => {
                                console.log("Button clicked");
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};

export default ButtonExample;
