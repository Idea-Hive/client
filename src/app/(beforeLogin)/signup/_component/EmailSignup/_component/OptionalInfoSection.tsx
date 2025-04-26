import Input from "@/components/Input";
import Selectbox from "@/components/Selectbox";
import { Dispatch, SetStateAction, useState } from "react";
import { InputHookType } from "../utils/types";

interface OptionalInfoSectionProps {
    nickname: InputHookType;
    occupation: InputHookType;
    setCareer: Dispatch<SetStateAction<string>>;
    setInterests: Dispatch<SetStateAction<string[]>>;
}

interface Interests {
    value: string;
    isSelected: boolean;
}

const careerOptions = [
    { value: "1", label: "1년" },
    { value: "2", label: "2년" },
    { value: "3", label: "3년" },
    { value: "4", label: "4년" },
    { value: "5", label: "5년 이상" },
];

export default function OptionalInfoSection({ nickname, occupation, setCareer, setInterests }: OptionalInfoSectionProps) {
    const [interestsList, setInterestsList] = useState<Interests[]>([
        { value: "개발", isSelected: false },
        { value: "AI", isSelected: false },
        { value: "IT서비스", isSelected: false },
        { value: "커뮤니케이션", isSelected: false },
        { value: "디자인", isSelected: false },
        { value: "기획", isSelected: false },
        { value: "프로덕트", isSelected: false },
        { value: "백엔드", isSelected: false },
        { value: "스타트업", isSelected: false },
    ]);

    const handleCareer = (value: string) => {
        setCareer(value);
    };

    const handleInterest = (value: string) => {};

    return (
        <div className="p-10 rounded-lg border border-[#d8dae5] flex flex-col gap-5">
            <h3 className="text-base font-medium">선택 정보</h3>
            <Input label="닉네임" {...nickname} placeholder="닉네임을 입력해 주세요" type="text" />
            <Input label="직업" {...occupation} placeholder="직업을 입력해 주세요" type="text" />

            <div>
                <div className="text-sm font-medium mb-2">경력</div>
                <Selectbox options={careerOptions} placeholder="경력을 선택해 주세요" onChange={(value) => handleCareer(value)} />
            </div>

            <div>
                <div className="text-sm font-medium mb-2">관심사</div>
                <div className="w-full flex flex-wrap gap-2">
                    {interestsList.map((item) => {
                        return (
                            <button
                                type="button"
                                key={item.value}
                                className={`px-3 h-[30px] rounded-[50px] border text-[#474d66] text-sm font-normal ${
                                    item.isSelected ? "bg-[#ff6363] bg-opacity-10 border-[#ff6363] text-[#ff6363]" : "border-[#c1c4d6] bg-white"
                                }`}
                                onClick={() => {
                                    setInterestsList(interestsList.map((interest) => ({ ...interest, isSelected: interest.value === item.value ? !interest.isSelected : interest.isSelected })));
                                }}
                            >
                                {item.value}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
