"use client";

import { Suspense, useState } from "react";
import ResetPwForm from "./_component/ResetPwForm";
import SuccessResetPw from "./_component/SuccessResetPw";

export default function ResetPwPage() {
    const [isReset, setIsReset] = useState(false);

    return isReset ? (
        <SuccessResetPw />
    ) : (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPwForm setIsReset={setIsReset} />
        </Suspense>
    );
}
