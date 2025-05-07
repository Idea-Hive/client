import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import Button from "../Button";

export default function FindPwModal({ onClose }: { onClose: () => void }) {
    const email = useInput("");

    return (
        <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-[420px] h-fit pb-10 bg-white shadow-xl mx-auto my-0 rounded-lg">
                <div className="flex justify-end mb-[3px] mt-5 px-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClose}>
                        <path
                            d="M19.281 18.2193C19.3507 18.289 19.406 18.3717 19.4437 18.4628C19.4814 18.5538 19.5008 18.6514 19.5008 18.7499C19.5008 18.8485 19.4814 18.9461 19.4437 19.0371C19.406 19.1281 19.3507 19.2109 19.281 19.2806C19.2114 19.3502 19.1286 19.4055 19.0376 19.4432C18.9465 19.4809 18.849 19.5003 18.7504 19.5003C18.6519 19.5003 18.5543 19.4809 18.4632 19.4432C18.3722 19.4055 18.2895 19.3502 18.2198 19.2806L12.0004 13.0602L5.78104 19.2806C5.64031 19.4213 5.44944 19.5003 5.25042 19.5003C5.05139 19.5003 4.86052 19.4213 4.71979 19.2806C4.57906 19.1398 4.5 18.949 4.5 18.7499C4.5 18.5509 4.57906 18.36 4.71979 18.2193L10.9401 11.9999L4.71979 5.78055C4.57906 5.63982 4.5 5.44895 4.5 5.24993C4.5 5.05091 4.57906 4.86003 4.71979 4.7193C4.86052 4.57857 5.05139 4.49951 5.25042 4.49951C5.44944 4.49951 5.64031 4.57857 5.78104 4.7193L12.0004 10.9396L18.2198 4.7193C18.3605 4.57857 18.5514 4.49951 18.7504 4.49951C18.9494 4.49951 19.1403 4.57857 19.281 4.7193C19.4218 4.86003 19.5008 5.05091 19.5008 5.24993C19.5008 5.44895 19.4218 5.63982 19.281 5.78055L13.0607 11.9999L19.281 18.2193Z"
                            fill="#474D66"
                        />
                    </svg>
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
