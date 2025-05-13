"use client";

import { onSignupApi, SignupRequest } from "@/apis/user/userApis";
import { useInput } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import TOS from "../TOS";
import RequiredInfoSection from "./_component/RequiredInfoSection";
import { SignupFormData } from "./utils/types";
import { validateEmail, validatePassword } from "./utils/utils";

export default function EmailSignup({ setStep }: { setStep: (step: number) => void }) {
    // 이용 약관 동의
    const [agreements, setAgreements] = useState({
        all: false,
        terms1: false,
        terms2: false,
        terms3: false,
    });

    // 필수 정보
    const email = useInput(""); // 이메일
    const password = useInput(""); // 비밀번호
    const passwordConfirm = useInput(""); // 비밀번호 확인
    const verificationCode = useInput(""); // 인증코드

    const [errors, setErrors] = useState<Partial<SignupFormData>>({});

    const signupMutation = useMutation({
        mutationFn: onSignupApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error) => {
            console.log("signupError", error);
            window.alert("회원가입에 실패했습니다.");
        },
        onSuccess: (data, variables, context) => {
            console.log("signupSuccess", data, variables, context);
            // 회원가입 성공 로직 추가
            setStep(3);
        },
        onSettled: () => {
            console.log("signupEnd");
        },
    });

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

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (validate()) {
                if (!agreements.terms1 || !agreements.terms2) {
                    window.alert("필수 이용약관에 동의해주세요.");
                    return;
                }

                // 회원가입 API 호출
                const request: SignupRequest = {
                    email: email.value,
                    password: password.value,
                    passwordCheck: passwordConfirm.value,
                };

                console.log("signup request:::", request);

                signupMutation.mutate(request);
            }
        },
        [validate, email, password, passwordConfirm, verificationCode]
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-6">
                <RequiredInfoSection email={email} password={password} passwordConfirm={passwordConfirm} verificationCode={verificationCode} errors={errors} setErrors={setErrors} />
            </div>

            <TOS agreements={agreements} setAgreements={setAgreements} />

            <div className="w-full flex justify-center gap-2 mt-6">
                <button type="submit" className="flex-1 h-12 bg-[#ff6363] text-white rounded-md">
                    가입하기
                </button>
            </div>
        </form>
    );
}
