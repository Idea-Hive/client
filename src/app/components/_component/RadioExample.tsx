"use client";

import Radio from "@/components/Radio";
import { useState } from "react";
import Content from "./Content";

const RadioExample = () => {
    const [selectedOption, setSelectedOption] = useState("option1");
    const options = [
        { label: "옵션 1", value: "option1" },
        { label: "옵션 2", value: "option2" },
        { label: "옵션 3", value: "option3" },
    ];

    return (
        <Content
            description="Radio Component 입니다."
            props={[
                { name: "label", type: "string", description: "Radio 라벨" },
                { name: "name", type: "string", description: "Radio 이름" },
                { name: "value", type: "string", description: "Radio 값" },
                { name: "checked?", type: "boolean", description: "Radio 체크 여부 (default: false)" },
                { name: "disabled?", type: "boolean", description: "Radio 비활성화 여부 (default: false)" },
                { name: "onChange", type: "function", description: "Radio 변경 시 실행될 함수" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <div className="flex gap-4">
                            {options.map((option) => (
                                <Radio
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    name="options"
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                />
                            ))}
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default RadioExample;
