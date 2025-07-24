"use client";

import { SignupRequest } from "@/apis/user/userApis";
import Toast from "@/components/Toast";
import { useSignupMutation } from "@/hooks/mutations";
import { AxiosError } from "axios";
import { useCallback } from "react";
import useSignupStore from "../../store/signupStore";
import TOS from "../TOS";
import RequiredInfoSection from "./_component/RequiredInfoSection";

export default function EmailSignup({ setStep }: { setStep: (step: number) => void }) {
    const { formData, validate, showToast, toastMessage, toastType, setShowToast, setToastMessage, setToastType } = useSignupStore();
    // 회원가입 API 호출
    const signupMutation = useSignupMutation({
        onError: (error: AxiosError) => {
            setToastType("error");
            setShowToast(true);
            setToastMessage(error.response?.data as string);
        },
        onSuccess: () => {
            // 회원가입 성공 시, 회원가입 성공 페이지로 전환
            setStep(2);
        },
    });

    // 회원가입 버튼 클릭 시 호출
    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const { email, password, nickname, terms1, terms2, terms3 } = formData;
            if (validate()) {
                // validate에 포함되면 좋겠지만 toast message 중복 처리 때문에 따로 처리(이용약관 동의가 후순위)
                if (!terms1 || !terms2) {
                    setShowToast(true);
                    setToastMessage("필수 이용약관에 동의해주세요.");
                    return;
                }

                // 회원가입 API 호출
                const request: SignupRequest = {
                    email,
                    password,
                    name: nickname,
                    isServiceAgreed: terms1,
                    isPrivacyAgreed: terms2,
                    isMarketingAgreed: terms3,
                };

                signupMutation.mutate(request);
            }
        },
        [validate, formData]
    );

    return (
        <form onSubmit={handleSubmit}>
            {/** 필수 정보(이전에 선택정보가 있었으나 사라짐) */}
            <div className="flex flex-col gap-4 mb-6">
                <RequiredInfoSection />
            </div>

            {/** 이용약관 */}
            <TOS />

            {/** 가입하기 버튼 */}
            <div className="w-full flex justify-center gap-2 mt-6">
                <button type="submit" className="flex-1 h-12 bg-[#ff6363] text-white rounded-md">
                    가입하기
                </button>
            </div>
            {showToast && <Toast type={toastType} message={toastMessage} onClose={() => setShowToast(false)} />}
        </form>
    );
}
