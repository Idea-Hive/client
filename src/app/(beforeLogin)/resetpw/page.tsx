"use client";

import { useState } from "react";
import ResetPwForm from "./_component/ResetPwForm";
import SuccessResetPw from "./_component/SuccessResetPw";

export default function ResetPwPage() {
    const [isReset, setIsReset] = useState(false);

    return isReset ? <SuccessResetPw /> : <ResetPwForm setIsReset={setIsReset} />;
}
