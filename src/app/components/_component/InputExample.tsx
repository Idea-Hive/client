import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import Content from "./Content";

const InputExample = () => {
    const value = useInput("");

    return (
        <Content
            description="Input Component 입니다."
            props={[
                { name: "label", type: "string", description: "Input 라벨" },
                { name: "value", type: "string", description: "Input 값" },
                { name: "onChange", type: "function", description: "Input 값 변경 시 실행될 함수" },
                { name: "placeholder", type: "string", description: "Input 플레이스홀더" },
                { name: "type", type: "Enum['text' | 'password' | 'number' | 'email' | 'tel']", description: "Input 타입" },
                { name: "isRequired?", type: "boolean", description: "Input 필수 여부" },
                { name: "isErr?", type: "boolean", description: "Input 에러 여부" },
                { name: "errMsg?", type: "string", description: "Input 에러 메시지" },
                { name: "isConfirm?", type: "boolean", description: "Input 확인 여부" },
                { name: "confirmMsg?", type: "string", description: "Input 확인 메시지" },
                { name: "icon?", type: "ReactNode", description: "Input 아이콘" },
                { name: "disabled?", type: "boolean", description: "Input 비활성화 여부" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: <Input label="Label" {...value} placeholder="Input test" type="text" />,
                },
            ]}
        />
    );
};

export default InputExample;
