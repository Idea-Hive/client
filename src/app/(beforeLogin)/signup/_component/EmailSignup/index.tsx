"use client";

import { useInput } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import OptionalInfoSection from "./_component/OptionalInfoSection";
import RequiredInfoSection from "./_component/RequiredInfoSection";
import { SignupFormData } from "./utils/types";
import { validateEmail, validatePassword } from "./utils/utils";

interface SignupRequest {
    email: string;
    password: string;
    passwordCheck: string;
    name: string;
    job: string;
    career: number;
    type: string;
    hashtagIds: number[];
}

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

    const signupApi = async (data: SignupRequest) => {
        return await axios.post("http://localhost:8080/api/member/signup", data);
    };

    const signupMutation = useMutation({
        mutationFn: signupApi,
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

    const handlePrev = () => {
        // 기본 정보 client state로 저장 (작업 전)

        // 이용 약관 동의로 이동
        setStep(1);
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (validate()) {
                // 회원가입 API 호출
                const request: SignupRequest = {
                    email: email.value,
                    password: password.value,
                    passwordCheck: passwordConfirm.value,
                    name: nickname.value,
                    job: occupation.value,
                    career: parseInt(career),
                    type: "email",
                    hashtagIds: interests.map((interest) => parseInt(interest)), // 나중에 백에서 데이터 받으면 달라질 내용
                };

                console.log("signup request:::", request);

                signupMutation.mutate(request);
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
