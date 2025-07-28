"use client";

import { useUserInfo } from "@/hooks/queries";
import { useState } from "react";
import EmailSignup from "./_component/EmailSignup/index";
import FinishSignup from "./_component/FinishSignup";

const steps = [
    {
        step: 1,
        title: "회원가입",
        component: (setStep: (step: number) => void) => <EmailSignup setStep={setStep} />,
    },
    {
        step: 2,
        component: () => <FinishSignup />,
    },
];

export default function Signup() {
    const [step, setStep] = useState(1);

    // 이미 로그인 된 상태라면 메인 페이지로 이동
    const { user } = useUserInfo();
    if (user) {
        window.location.href = "/";
    }

    return (
        <div className="w-[420px] mx-auto py-[100px]">
            {steps
                .filter((stepItem) => stepItem.step === step)
                .map((step) => {
                    return (
                        <div key={step.step}>
                            {step.title && <div className="text-center text-2xl font-semibold mb-8">{step.title}</div>}
                            {step.component(setStep)}
                        </div>
                    );
                })}
        </div>
    );
}
