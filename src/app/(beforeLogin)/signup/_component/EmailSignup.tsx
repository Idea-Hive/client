"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupFormData {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname?: string;
    occupation?: string;
    experience?: string;
    interests?: string;
}

export default function EmailSignup() {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<SignupFormData>();

    const onSubmit = (data: SignupFormData) => {
        if (!isEmailVerified) {
            alert("이메일 인증이 필요합니다.");
            return;
        }
    };

    const handleEmailVerification = () => {
        const email = watch("email");
        setError("email", { message: "" });

        if (email === "") {
            setError("email", { message: "이메일을 입력해주세요." });
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError("email", { message: "올바른 이메일 형식이 아닙니다." });
            return;
        }

        // TODO: 이메일 인증 로직 추가
        setIsEmailVerified(true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-6">회원가입</h2>

            {/* 필수 입력 필드 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">필수 정보</h3>

                <div>
                    <label className="block mb-1">
                        이메일&nbsp;<span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            {...register("email", {
                                required: "이메일은 필수입니다.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "올바른 이메일 형식이 아닙니다.",
                                },
                            })}
                            placeholder="이메일을 입력해주세요."
                            className="border p-2 rounded flex-1"
                        />
                        <button type="button" onClick={handleEmailVerification} className="bg-blue-500 text-white px-4 py-2 rounded">
                            인증하기
                        </button>
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block mb-1">
                        비밀번호&nbsp;<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상이어야 합니다.",
                            },
                        })}
                        placeholder="비밀번호를 입력해주세요."
                        className="border p-2 rounded w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block mb-1">
                        비밀번호 확인&nbsp;<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        {...register("passwordConfirm", {
                            required: "비밀번호 확인은 필수입니다.",
                            validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다.",
                        })}
                        placeholder="비밀번호를 입력해주세요."
                        className="border p-2 rounded w-full"
                    />
                    {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm.message}</p>}
                </div>
            </div>

            {/* 선택 입력 필드 */}
            <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold">선택 정보</h3>

                <div>
                    <label className="block mb-1">닉네임</label>
                    <input type="text" {...register("nickname")} placeholder="닉네임을 입력해주세요." className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block mb-1">직업</label>
                    <input type="text" {...register("occupation")} placeholder="직업을 입력해주세요." className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block mb-1">경력</label>
                    <input type="text" {...register("experience")} placeholder="경력을 입력해주세요." className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block mb-1">관심사</label>
                    <input type="text" {...register("interests")} placeholder="관심사를 입력해주세요." className="border p-2 rounded w-full" />
                </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                가입하기
            </button>
        </form>
    );
}
