import Logo from "@/assets/LoginModalLogo.png";
import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../Button";

export default function LoginModal({ onClose, onOpenFindPwModal }: { onClose: () => void; onOpenFindPwModal: () => void }) {
    return (
        <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-[420px] h-fit pb-10 bg-white shadow-xl mx-auto my-0 rounded-lg">
                <div className="flex justify-end mb-1.5 mt-5 px-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClose}>
                        <path
                            d="M19.281 18.2193C19.3507 18.289 19.406 18.3717 19.4437 18.4628C19.4814 18.5538 19.5008 18.6514 19.5008 18.7499C19.5008 18.8485 19.4814 18.9461 19.4437 19.0371C19.406 19.1281 19.3507 19.2109 19.281 19.2806C19.2114 19.3502 19.1286 19.4055 19.0376 19.4432C18.9465 19.4809 18.849 19.5003 18.7504 19.5003C18.6519 19.5003 18.5543 19.4809 18.4632 19.4432C18.3722 19.4055 18.2895 19.3502 18.2198 19.2806L12.0004 13.0602L5.78104 19.2806C5.64031 19.4213 5.44944 19.5003 5.25042 19.5003C5.05139 19.5003 4.86052 19.4213 4.71979 19.2806C4.57906 19.1398 4.5 18.949 4.5 18.7499C4.5 18.5509 4.57906 18.36 4.71979 18.2193L10.9401 11.9999L4.71979 5.78055C4.57906 5.63982 4.5 5.44895 4.5 5.24993C4.5 5.05091 4.57906 4.86003 4.71979 4.7193C4.86052 4.57857 5.05139 4.49951 5.25042 4.49951C5.44944 4.49951 5.64031 4.57857 5.78104 4.7193L12.0004 10.9396L18.2198 4.7193C18.3605 4.57857 18.5514 4.49951 18.7504 4.49951C18.9494 4.49951 19.1403 4.57857 19.281 4.7193C19.4218 4.86003 19.5008 5.05091 19.5008 5.24993C19.5008 5.44895 19.4218 5.63982 19.281 5.78055L13.0607 11.9999L19.281 18.2193Z"
                            fill="#474D66"
                        />
                    </svg>
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-3">
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

            <Button label="이메일로 로그인" type="submit" onClick={() => {}}></Button>
        </form>
    );
};

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

const SocialLoginForm = () => {
    const handleGoogleLogin = () => {
        // 구글 로그인 요청
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };
    const handleKakaoLogin = () => {
        // 카카오 로그인 요청
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    };
    const handleGithubLogin = () => {
        // 깃허브 로그인 요청
        window.location.href = "http://localhost:8080/oauth2/authorization/github";
    };

    return (
        <div className="flex flex-col gap-3 justify-center">
            <button className="w-full h-12 text-base font-medium rounded-md flex justify-center items-center gap-4 border border-n400" onClick={handleGoogleLogin}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.02 12.7727C24.02 11.9218 23.9436 11.1036 23.8018 10.3181H12.5V14.9599H18.9582C18.68 16.4599 17.8345 17.7308 16.5636 18.5818V21.5927H20.4418C22.7109 19.5036 24.02 16.4272 24.02 12.7727Z"
                        fill="#4285F4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5 24.5C15.74 24.5 18.4564 23.4255 20.4418 21.5928L16.5636 18.5818C15.4891 19.3018 14.1145 19.7273 12.5 19.7273C9.37455 19.7273 6.72909 17.6164 5.78546 14.78H1.77637V17.8891C3.75091 21.8109 7.80909 24.5 12.5 24.5Z"
                        fill="#34A853"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.78545 14.7799C5.54545 14.0599 5.40909 13.2908 5.40909 12.4999C5.40909 11.709 5.54545 10.9399 5.78545 10.2199V7.11084H1.77636C0.963636 8.73084 0.5 10.5636 0.5 12.4999C0.5 14.4363 0.963636 16.269 1.77636 17.889L5.78545 14.7799Z"
                        fill="#FBBC05"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5 5.27273C14.2618 5.27273 15.8436 5.87818 17.0873 7.06727L20.5291 3.62545C18.4509 1.68909 15.7345 0.5 12.5 0.5C7.80909 0.5 3.75091 3.18909 1.77637 7.11091L5.78546 10.22C6.72909 7.38364 9.37455 5.27273 12.5 5.27273Z"
                        fill="#EA4335"
                    />
                </svg>
                Google 로그인
            </button>
            <button className="w-full h-[46px] text-base font-medium bg-black text-white rounded-md flex justify-center items-center gap-4" onClick={handleGithubLogin}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_678_2)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9642 0.5C5.34833 0.5 0 6 0 12.8042C0 18.2432 3.42686 22.8472 8.18082 24.4767C8.77518 24.5992 8.9929 24.212 8.9929 23.8862C8.9929 23.601 8.97331 22.6232 8.97331 21.6045C5.64514 22.338 4.95208 20.1378 4.95208 20.1378C4.41722 18.7118 3.62473 18.3452 3.62473 18.3452C2.53543 17.5915 3.70408 17.5915 3.70408 17.5915C4.91241 17.673 5.54645 18.8545 5.54645 18.8545C6.61592 20.7285 8.33926 20.199 9.03257 19.873C9.13151 19.0785 9.44865 18.5285 9.78539 18.223C7.13094 17.9377 4.33812 16.8785 4.33812 12.1523C4.33812 10.8078 4.81322 9.70775 5.56604 8.85225C5.44727 8.54675 5.03118 7.2835 5.68506 5.59275C5.68506 5.59275 6.69527 5.26675 8.97306 6.85575C9.94827 6.58642 10.954 6.4494 11.9642 6.44825C12.9744 6.44825 14.0042 6.591 14.9552 6.85575C17.2332 5.26675 18.2434 5.59275 18.2434 5.59275C18.8973 7.2835 18.481 8.54675 18.3622 8.85225C19.1349 9.70775 19.5904 10.8078 19.5904 12.1523C19.5904 16.8785 16.7976 17.9172 14.1233 18.223C14.5592 18.61 14.9353 19.3433 14.9353 20.5045C14.9353 22.1545 14.9158 23.4788 14.9158 23.886C14.9158 24.212 15.1337 24.5992 15.7278 24.477C20.4818 22.847 23.9087 18.2432 23.9087 12.8042C23.9282 6 18.5603 0.5 11.9642 0.5Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_678_2">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>
                Github 로그인
            </button>
            <button className="w-full h-[46px] text-base font-medium bg-[#FEE500] text-[rgba(0,0,0,0.85)] rounded-md flex justify-center items-center gap-4" onClick={handleKakaoLogin}>
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        opacity="0.902"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 1.39062C5.24333 1.39062 0 6.12079 0 10.1226C0 13.1211 1.90422 15.766 4.80456 17.3377L3.58478 21.918C3.476 22.324 3.927 22.6464 4.27289 22.4127L9.62256 18.7833C10.0736 18.8283 10.5331 18.8545 11 18.8545C17.0744 18.8545 22 14.9452 22 10.1226C22 6.12079 17.0744 1.39062 11 1.39062Z"
                        fill="black"
                    />
                </svg>
                카카오 로그인
            </button>
        </div>
    );
};
