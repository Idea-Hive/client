"use client";

import Button from "@/components/Button";
import { redirect } from "next/navigation";
import { useState } from "react";
import EmailSignup from "./_component/EmailSignup";

export default function Signup() {
    const user = false;

    const [isSelectedEmailLogin, setIsSelectedEmailLogin] = useState(false);

    if (user) {
        redirect("/");
    }

    return isSelectedEmailLogin ? (
        <EmailSignup />
    ) : (
        <div>
            <SocialLogins />
            <div>
                <Button
                    label="이메일로 회원가입"
                    onClick={() => {
                        setIsSelectedEmailLogin(true);
                    }}
                />
            </div>
        </div>
    );
}

const SocialLogins = () => {
    return <div>SocialLogins</div>;
};
