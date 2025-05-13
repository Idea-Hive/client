"use client";

import { onLoginApi } from "@/apis/user/userApis";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSpinner } from "@/components/Spinner";
import { useInput } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function EmailLoginForm({ onClose }: { onClose: () => void }) {
    const spinner = useSpinner();

    const email = useInput("");
    const password = useInput("");

    const [isErrors, setIsErrors] = useState({
        email: false,
        password: false,
        common: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        email: "",
        password: "",
        common: "",
    });

    const validate = (email: string, password: string) => {
        setIsErrors({
            common: false,
            email: email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
            password: password === "",
        });
        setErrorMessages({
            common: "",
            email: email === "" ? "이메일을 입력해주세요." : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? "이메일 형식이 올바르지 않습니다." : "",
            password: password === "" ? "비밀번호를 입력해주세요." : "",
        });

        const isValid = Object.values(isErrors).every((value) => value === false);
        return isValid;
    };

    const loginMutation = useMutation({
        mutationFn: onLoginApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                console.log("loginSuccess:::", data.data);
                localStorage.setItem("token", data.data.accessToken);
                onClose();
            } else {
                console.error("loginError:::", data);
            }
        },
        onError: (error) => {
            console.error("loginError:::", error);
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validate(email.value, password.value);
        if (!isValid) return;

        // 로그인 요청
        loginMutation.mutate({
            email: email.value,
            rawPassword: password.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-3">
            <div className="flex flex-col gap-2">
                <Input
                    label="이메일"
                    value={email.value}
                    onChange={(e) => {
                        email.onChange(e);
                        setIsErrors({ ...isErrors, email: false });
                        setErrorMessages({ ...errorMessages, email: "" });
                    }}
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    isErr={isErrors.email}
                    errMsg={errorMessages.email}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Input
                    label="비밀번호"
                    value={password.value}
                    onChange={(e) => {
                        password.onChange(e);
                        setIsErrors({ ...isErrors, password: false });
                        setErrorMessages({ ...errorMessages, password: "" });
                    }}
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    isErr={isErrors.password}
                    errMsg={errorMessages.password}
                />
            </div>

            <Button label="이메일로 로그인" type="submit" onClick={() => {}}></Button>
        </form>
    );
}
