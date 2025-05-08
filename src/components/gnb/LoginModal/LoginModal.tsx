import Logo from "@/assets/LoginModalLogo.png";
import { CloseBtn } from "@/components/icons/icons";
import Image from "next/image";
import Link from "next/link";
import EmailLoginForm from "./EmailLoginForm";
import SocialLoginForm from "./SocialLoginForm";

export default function LoginModal({ onClose, onOpenFindPwModal }: { onClose: () => void; onOpenFindPwModal: () => void }) {
    return (
        <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-[420px] h-fit pb-10 bg-white shadow-xl mx-auto my-0 rounded-lg">
                <div className="flex justify-end mb-1.5 mt-5 px-5">
                    <CloseBtn onClose={onClose} />
                </div>
                <div className="px-[50px]">
                    <Image src={Logo} alt="logo" width={176} height={32} className="mx-auto mb-6" />
                    <EmailLoginForm />
                    <LinkBtns onClose={onClose} onOpenFindPwModal={onOpenFindPwModal} />
                    <SocialLoginForm />
                </div>
            </div>
        </div>
    );
}

const LinkBtns = ({ onClose, onOpenFindPwModal }: { onClose: () => void; onOpenFindPwModal: () => void }) => {
    return (
        <div className="flex gap-2 justify-center mb-8">
            <Link
                href="/"
                className="text-sm text-n900"
                onClick={() => {
                    onClose();
                    onOpenFindPwModal();
                }}
            >
                비밀번호 찾기
            </Link>
            <div className="text-n900 font-bold text-sm">ㅣ</div>
            <Link href="/signup" className="text-sm text-n900" onClick={onClose}>
                회원가입
            </Link>
        </div>
    );
};
