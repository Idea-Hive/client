"use client";

import Input from "@/components/common/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import githubIcon from "../../../public/github-mark-white.png";
import kakao from "../../../public/kakao_symbol.png";

export default function Signup() {
    const [isEmailSignup, setIsEmailSignup] = useState<boolean>(false);

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div>
                <h1 className="text-center text-[#FF7864] text-3xl font-bold mb-8">
                    <Link href="/">IdeaHive</Link>
                </h1>

                <div className="w-fit bg-white p-20 rounded-lg border border-gray-200">
                    {isEmailSignup ? (
                        <EmailSignup />
                    ) : (
                        <div>
                            {/* 소셜 로그인 버튼 */}
                            <SocialLogins />

                            <div className="w-full h-[1px] bg-gray-200 my-8"></div>

                            {/* 이메일로 가입하기 */}
                            <div>
                                <button className="w-full h-12 rounded-xl bg-[#FF7864] text-white hover:bg-[#FF7864]/80" onClick={() => setIsEmailSignup(true)}>
                                    이메일로 가입하기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const SocialLogins = () => {
    return (
        <div className="flex flex-col gap-4 w-[400px]">
            <GoogleLogin />
            <KakaoLogin />
            <GithubLogin />
        </div>
    );
};

const GoogleLogin = () => {
    return (
        <button className="flex gap-2 items-center justify-center w-full h-12 rounded-xl border border-gray-200 hover:bg-gray-50">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="block w-6 h-6">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span>Google 로그인</span>
        </button>
    );
};

const KakaoLogin = () => {
    return (
        <button className="flex gap-2 items-center justify-center w-full h-12 rounded-xl bg-[#FEE500] hover:bg-[#FEE500]/80">
            <Image src={kakao} alt="google" width={24} height={24} />
            <span>카카오 로그인</span>
        </button>
    );
};

const GithubLogin = () => {
    return (
        <button className="flex gap-2 items-center justify-center w-full h-12 rounded-xl bg-[#010409] text-white hover:bg-[#010409]/80">
            <Image src={githubIcon} alt="google" width={24} height={24} />
            <span>Github 로그인</span>
        </button>
    );
};

const EmailSignup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<{
        email: string;
        password: string;
        confirmPassword: string;
    }>();

    const onSubmit = (data: any) => {
        console.log(data);
        // TODO: 회원가입 로직 구현
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[400px]">
            <Input
                register={register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "올바른 이메일 형식이 아닙니다",
                    },
                })}
                label="이메일"
                placeholder="이메일"
                error={errors.email?.message}
                required
            />

            <Input
                register={register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                        value: 8,
                        message: "비밀번호는 최소 8자 이상이어야 합니다",
                    },
                })}
                label="비밀번호"
                type="password"
                placeholder="비밀번호"
                error={errors.password?.message}
                required
            />

            <Input
                register={register("confirmPassword", {
                    required: "비밀번호를 다시 입력해주세요",
                    validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다",
                })}
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호 확인"
                error={errors.confirmPassword?.message}
                required
            />

            <button type="submit" className="w-full h-12 rounded-xl bg-[#FF7864] text-white hover:bg-[#FF7864]/80">
                가입하기
            </button>
        </form>
    );
};
