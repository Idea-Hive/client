import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import Button from "../Button";
import { CloseBtn } from "../icons/icons";

export default function FindPwModal({ onClose }: { onClose: () => void }) {
    const email = useInput("");

    return (
        <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-[420px] h-fit pb-10 bg-white shadow-xl mx-auto my-0 rounded-lg">
                <div className="flex justify-end mb-[3px] mt-5 px-5">
                    <CloseBtn onClose={onClose} />
                </div>
                <div className="px-[50px]">
                    <div className="text-h2 text-n900 mb-3 text-center">비밀번호 재설정</div>
                    <div className="text-sm text-n800 mb-6 text-center">비밀번호 재설정에 필요한 인증번호를 이메일로 보내드려요</div>
                    <Input {...email} type="email" placeholder="이메일을 입력해주세요." />
                    <Button btnType="secondary" label="인증번호 전송" size="large" className="w-full mt-5" onClick={() => {}} />
                </div>
            </div>
        </div>
    );
}
