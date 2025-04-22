import KakaoIcon from "@/assets/icons/kakao_symbol.png";
import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-[480px] h-fit p-12 bg-white shadow-xl mx-auto my-0 rounded-xl">
                <h1 className="text-2xl font-bold mb-10 text-center">로그인</h1>
                <EmailLoginForm />
                <LinkBtns onClose={onClose} />
                <SocialLoginForm />
                <CloseButton onClick={onClose} />
            </div>
        </div>
    );
}

const EmailLoginForm = () => {
    const email = useInput("");
    const password = useInput("");

    const [isErrors, setIsErrors] = useState({
        email: false,
        password: false,
        common: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        email: "",
        password: "",
        common: "",
    });

    const validate = (email: string, password: string) => {
        let isValid = true;
        setIsErrors({
            common: false,
            email: email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
            password: password === "",
        });
        setErrorMessages({
            common: "",
            email: email === "" ? "이메일을 입력해주세요." : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? "이메일 형식이 올바르지 않습니다." : "",
            password: password === "" ? "비밀번호를 입력해주세요." : "",
        });

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validate(email.value, password.value);
        if (!isValid) return;

        // 로그인 요청
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Input
                    label="이메일"
                    value={email.value}
                    onChange={(e) => {
                        email.onChange(e);
                        setIsErrors({ ...isErrors, email: false });
                        setErrorMessages({ ...errorMessages, email: "" });
                    }}
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    isErr={isErrors.email}
                    errMsg={errorMessages.email}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Input
                    label="비밀번호"
                    value={password.value}
                    onChange={(e) => {
                        password.onChange(e);
                        setIsErrors({ ...isErrors, password: false });
                        setErrorMessages({ ...errorMessages, password: "" });
                    }}
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    isErr={isErrors.password}
                    errMsg={errorMessages.password}
                />
            </div>

            <button className="w-full bg-blue-500 text-white rounded-md p-2" type="submit">
                이메일로 로그인
            </button>
        </form>
    );
};

const LinkBtns = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="flex gap-4 justify-center mt-4">
            <Link href="/" className="text-sm text-gray-500" onClick={onClose}>
                비밀번호 찾기
            </Link>
            <Link href="/signup" className="text-sm text-gray-500" onClick={onClose}>
                회원가입
            </Link>
        </div>
    );
};

const SocialLoginForm = () => {
    const handleGoogleLogin = () => {
        // 구글 로그인 요청
    };
    const handleKakaoLogin = () => {
        // 카카오 로그인 요청
    };
    const handleGithubLogin = () => {
        // 깃허브 로그인 요청
    };

    return (
        <div className="flex flex-col gap-2 justify-center mt-8">
            <button className="w-full h-10 rounded-md p-2 flex justify-center items-center gap-2.5 border border-gray-300" onClick={handleGoogleLogin}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.6 10.2273C19.6 9.51818 19.5364 8.83636 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z"
                        fill="#4285F4"
                    />
                    <path
                        d="M10 20C12.7 20 14.9636 19.1045 16.6181 17.5773L13.3863 15.0682C12.4909 15.6682 11.3454 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z"
                        fill="#34A853"
                    />
                    <path
                        d="M4.40455 11.9C4.20455 11.3 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20455 8.7 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z"
                        fill="#FBBC04"
                    />
                    <path
                        d="M10 3.97727C11.4681 3.97727 12.7863 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6954 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z"
                        fill="#E94235"
                    />
                </svg>
                Google 로그인
            </button>
            <button className="w-full h-10 bg-[#FEE500] text-[rgba(0,0,0,0.85)] rounded-md p-2 flex justify-center items-center gap-2.5" onClick={handleKakaoLogin}>
                <Image src={KakaoIcon} alt="kakao" width={20} height={20} />
                Kakao 로그인
            </button>
            <button className="w-full h-10 bg-black text-white rounded-md p-2 flex justify-center items-center gap-2.5" onClick={handleGithubLogin}>
                <FaGithub size={20} />
                Github 로그인
            </button>
        </div>
    );
};

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
        className="absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all"
        onClick={onClick}
        type="button"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);
