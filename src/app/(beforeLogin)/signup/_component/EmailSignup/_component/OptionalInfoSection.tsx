import Input from "@/components/Input";
import { InputHookType } from "../utils/types";

interface OptionalInfoSectionProps {
    nickname: InputHookType;
    occupation: InputHookType;
    experience: InputHookType;
    interests: InputHookType;
}

export default function OptionalInfoSection({ nickname, occupation, experience, interests }: OptionalInfoSectionProps) {
    return (
        <div className="space-y-4 mt-8 border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">선택 정보</h3>
            <Input label="닉네임" {...nickname} placeholder="닉네임을 입력해주세요." type="text" />
            <Input label="직업" {...occupation} placeholder="직업을 입력해주세요." type="text" />
            <Input label="경력" {...experience} placeholder="경력을 입력해주세요." type="text" />
            <Input label="관심사" {...interests} placeholder="관심사를 입력해주세요." type="text" />
            <div className="text-sm text-gray-500">선택 정보는 나중에 마이페이지에서 언제든 수정할 수 있어요 &#58;&#41;</div>
        </div>
    );
}
