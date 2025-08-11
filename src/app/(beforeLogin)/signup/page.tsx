"use client";

import { useState } from "react";
import EmailSignup from "./_component/EmailSignup/index";
import FinishSignup from "./_component/FinishSignup";

export default function Signup() {
    const [step, setStep] = useState(1);

    return <div className="w-[420px] mx-auto py-[100px]">{step === 1 ? <EmailSignup setStep={setStep} /> : <FinishSignup />}</div>;
}
