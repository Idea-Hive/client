"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import EmailSignup from "./_component/EmailSignup/index";
import FinishSignup from "./_component/FinishSignup";
import TOS from "./_component/TOS";

const steps = [
    {
        step: 1,
        title: "이용약관동의",
        component: (setStep: (step: number) => void) => <TOS setStep={setStep} />,
    },
    {
        step: 2,
        title: "기본 정보 입력",
        component: (setStep: (step: number) => void) => <EmailSignup setStep={setStep} />,
    },
    {
        step: 3,
        title: "가입이 완료되었습니다",
        component: () => <FinishSignup />,
    },
];

export default function Signup() {
    const [step, setStep] = useState(1);

    const user = false;

    if (user) {
        redirect("/");
    }

    return (
        <div className="w-[720px] mx-auto py-20">
            <div className="text-center text-2xl font-bold mb-4">{steps.find((stepItem) => stepItem.step === step)?.title}</div>
            {steps
                .filter((stepItem) => stepItem.step === step)
                .map((step) => (
                    <div key={step.step}>
                        <div>{step.component(setStep)}</div>
                    </div>
                ))}
        </div>
    );
}
