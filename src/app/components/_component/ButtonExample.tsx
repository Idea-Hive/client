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
                { name: "btnType", type: "Enum['primary' | 'secondary' | 'line_red' | 'line' | 'minimal']", description: "Button 타입" },
                { name: "size", type: "Enum['large' | 'medium' | 'small']", description: "Button 크기" },
                { name: "disabled", type: "boolean", description: "Button 비활성화 여부" },
            ]}
            examples={[
                {
                    description: "Primary Btns",
                    code: (
                        <div className="flex gap-2">
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Primary Large Button clicked");
                                }}
                                size="large"
                                btnType="primary"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Primary Medium Button clicked");
                                }}
                                size="medium"
                                btnType="primary"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Primary Small Button clicked");
                                }}
                                size="small"
                                btnType="primary"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("disabled Button clicked");
                                }}
                                size="large"
                                btnType="primary"
                                disabled={true}
                            />
                        </div>
                    ),
                },
                {
                    description: "Secondary Btns",
                    code: (
                        <div className="flex gap-2">
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Secondary Large Button clicked");
                                }}
                                size="large"
                                btnType="secondary"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Secondary Medium Button clicked");
                                }}
                                size="medium"
                                btnType="secondary"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Secondary Small Button clicked");
                                }}
                                size="small"
                                btnType="secondary"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("disabled Button clicked");
                                }}
                                size="large"
                                btnType="secondary"
                                disabled={true}
                            />
                        </div>
                    ),
                },
                {
                    description: "Line_red Btns",
                    code: (
                        <div className="flex gap-2">
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Line_red Large Button clicked");
                                }}
                                size="large"
                                btnType="line_red"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Line_red Medium Button clicked");
                                }}
                                size="medium"
                                btnType="line_red"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Line_red Small Button clicked");
                                }}
                                size="small"
                                btnType="line_red"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("disabled Button clicked");
                                }}
                                size="large"
                                btnType="line_red"
                                disabled={true}
                            />
                        </div>
                    ),
                },
                {
                    description: "Line Btns",
                    code: (
                        <div className="flex gap-2">
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Line Large Button clicked");
                                }}
                                size="large"
                                btnType="line"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Line Medium Button clicked");
                                }}
                                size="medium"
                                btnType="line"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Line Small Button clicked");
                                }}
                                size="small"
                                btnType="line"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("disabled Button clicked");
                                }}
                                size="large"
                                btnType="line"
                                disabled={true}
                            />
                        </div>
                    ),
                },
                {
                    description: "Minimal Btns",
                    code: (
                        <div className="flex gap-2">
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Minimal Large Button clicked");
                                }}
                                size="large"
                                btnType="minimal"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Minimal Medium Button clicked");
                                }}
                                size="medium"
                                btnType="minimal"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("Minimal Small Button clicked");
                                }}
                                size="small"
                                btnType="minimal"
                            />
                            <Button
                                label="Button"
                                onClick={() => {
                                    console.log("disabled Button clicked");
                                }}
                                size="large"
                                btnType="minimal"
                                disabled={true}
                            />
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default ButtonExample;
