"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import EmailSignup from "./_component/EmailSignup/index";
import FinishSignup from "./_component/FinishSignup";
import TOS from "./_component/TOS";

const steps = [
    {
        step: 11,
        title: "이용약관동의",
        component: (setStep: (step: number) => void) => <TOS setStep={setStep} />,
    },
    {
        step: 2,
        title: "기본 정보 입력",
        component: (setStep: (step: number) => void) => <EmailSignup setStep={setStep} />,
    },
    {
        step: 1,
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
