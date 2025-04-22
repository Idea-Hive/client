"use client";

import { useInput } from "@/hooks/hooks";
import { useCallback, useState } from "react";
import OptionalInfoSection from "./_component/OptionalInfoSection";
import RequiredInfoSection from "./_component/RequiredInfoSection";
import { SignupFormData } from "./utils/types";
import { validateEmail, validatePassword } from "./utils/utils";

export default function EmailSignup({ setStep }: { setStep: (step: number) => void }) {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isClickEmailVerification, setIsClickEmailVerification] = useState(false);
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});

    const email = useInput(""); // 이메일
    const password = useInput(""); // 비밀번호
    const passwordConfirm = useInput(""); // 비밀번호 확인
    const verificationCode = useInput(""); // 인증코드

    const nickname = useInput(""); // 닉네임
    const occupation = useInput(""); // 직업
    const experience = useInput(""); // 경력
    const interests = useInput(""); // 관심사

    const validate = () => {
        const newErrors: Partial<SignupFormData> = {};

        if (email.value === "") {
            newErrors.email = "이메일을 입력해주세요.";
        } else if (!validateEmail(email.value)) {
            newErrors.email = "올바른 이메일 형식이 아닙니다.";
        }
        if (password.value === "") {
            newErrors.password = "비밀번호를 입력해주세요.";
        } else if (!validatePassword(password.value)) {
            newErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
        }
        if (passwordConfirm.value === "") {
            newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
        } else if (password.value !== passwordConfirm.value) {
            newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
        }
        if (isClickEmailVerification && verificationCode.value === "") {
            newErrors.verificationCode = "인증코드를 입력해주세요.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (validate()) {
                // 회원가입 API 호출
            }
        },
        [validate]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <RequiredInfoSection
                email={email}
                password={password}
                passwordConfirm={passwordConfirm}
                verificationCode={verificationCode}
                isEmailVerified={isEmailVerified}
                setIsEmailVerified={setIsEmailVerified}
                isClickEmailVerification={isClickEmailVerification}
                setIsClickEmailVerification={setIsClickEmailVerification}
                errors={errors}
                setErrors={setErrors}
            />

            <OptionalInfoSection nickname={nickname} occupation={occupation} experience={experience} interests={interests} />

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                가입하기
            </button>
        </form>
    );
}
