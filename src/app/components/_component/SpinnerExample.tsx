import Button from "@/components/Button";
import { useSpinner } from "@/components/Spinner";
import Content from "./Content";

const SpinnerExample = () => {
    const spinner = useSpinner();

    return (
        <Content
            description="Spinner Component 입니다."
            props={[
                { name: "open", type: "function", description: "Spinner 열기" },
                { name: "close", type: "function", description: "Spinner 닫기" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <div className="flex gap-2">
                            <Button
                                label="Spinner 실행"
                                onClick={() => {
                                    spinner.open();
                                }}
                            ></Button>
                            <Button
                                label="Spinner 닫기"
                                onClick={() => {
                                    spinner.close();
                                }}
                            ></Button>
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default SpinnerExample;
