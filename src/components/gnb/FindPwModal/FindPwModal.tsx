import { useState } from "react";
import { CloseBtn } from "../../icons/icons";
import AuthCodeInputForm from "./AuthCodeInputForm";
import SendAuthCodeForm from "./SendAuthCodeForm";

export default function FindPwModal({ onClose }: { onClose: () => void }) {
    const [isSendAuthCode, setIsSendAuthCode] = useState<boolean>(false);

    return (
        <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-[420px] h-fit pb-14 bg-white shadow-xl mx-auto my-0 rounded-lg">
                <div className="flex justify-end mb-[3px] mt-5 px-5">
                    <CloseBtn onClose={onClose} />
                </div>
                <div className={`${!isSendAuthCode ? "px-10" : "px-[46px]"}`}>
                    <div className="text-h2 text-n900 mb-3 text-center">{!isSendAuthCode ? "비밀번호 재설정" : "인증번호 입력"}</div>
                    <div className="text-sm text-n800 mb-6 text-center">
                        {!isSendAuthCode ? "비밀번호 재설정에 필요한 인증번호를 이메일로 보내드려요" : "입력하신 이메일로 전송된 인증번호를 입력해주세요"}
                    </div>

                    {!isSendAuthCode ? <SendAuthCodeForm setIsSendAuthCode={setIsSendAuthCode} /> : <AuthCodeInputForm onClose={onClose} />}
                </div>
            </div>
        </div>
    );
}
