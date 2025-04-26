"use client";

import { useInput } from "@/hooks/hooks";
import { useCallback, useState } from "react";
import OptionalInfoSection from "./_component/OptionalInfoSection";
import RequiredInfoSection from "./_component/RequiredInfoSection";
import { SignupFormData } from "./utils/types";
import { validateEmail, validatePassword } from "./utils/utils";

export default function EmailSignup({ setStep }: { setStep: (step: number) => void }) {
    // 필수 정보
    const email = useInput(""); // 이메일
    const password = useInput(""); // 비밀번호
    const passwordConfirm = useInput(""); // 비밀번호 확인
    const verificationCode = useInput(""); // 인증코드

    // 선택 정보
    const nickname = useInput(""); // 닉네임
    const occupation = useInput(""); // 직업
    const [career, setCareer] = useState(""); // 경력
    const [interests, setInterests] = useState<string[]>([]); // 관심사

    const [errors, setErrors] = useState<Partial<SignupFormData>>({});

    // 필수 사항 validate function
    const validate = () => {
        const newErrors: Partial<SignupFormData> = {};

        if (email.value === "") {
            newErrors.email = "이메일을 입력해주세요.";
        } else if (!validateEmail(email.value)) {
            newErrors.email = "이메일 형식에 맞게 입력해주세요";
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
        if (verificationCode.value === "") {
            newErrors.verificationCode = "인증코드를 입력해주세요.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handlePrev = () => {
        // 기본 정보 client state로 저장 (작업 전)

        // 이용 약관 동의로 이동
        setStep(1);
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const requiredValue = {
                email: email.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value,
                verificationCode: verificationCode.value,
            };
            const optionalValue = {
                nickname: nickname.value,
                occupation: occupation.value,
                career: career,
                interests: interests,
            };

            if (validate()) {
                // 회원가입 API 호출
                setStep(3);
            }
        },
        [validate, email, password, passwordConfirm, verificationCode, nickname, occupation, career, interests]
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <RequiredInfoSection email={email} password={password} passwordConfirm={passwordConfirm} verificationCode={verificationCode} errors={errors} setErrors={setErrors} />
                <OptionalInfoSection nickname={nickname} occupation={occupation} setCareer={setCareer} setInterests={setInterests} />
            </div>

            <div className="w-full flex justify-center gap-2 mt-6">
                <button type="button" className="flex-1 h-12 bg-white border border-[#c1c4d6] text-base text-[#474d66] rounded-md" onClick={handlePrev}>
                    이전
                </button>
                <button type="submit" className="flex-1 h-12 bg-[#ff6363] text-white rounded-md">
                    가입하기
                </button>
            </div>
        </form>
    );
}
