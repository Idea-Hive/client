"use client";

import { onLoginApi } from "@/apis/user/userApis";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSpinner } from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useInput } from "@/hooks/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function EmailLoginForm({ onClose }: { onClose: () => void }) {
    const spinner = useSpinner();
    const queryClient = useQueryClient();

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
        const newIsErrors = {
            common: false,
            email: email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
            password: password === "",
        };

        const newErrorMessages = {
            common: "",
            email: email === "" ? "이메일을 입력해주세요." : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ? "이메일 형식이 올바르지 않습니다." : "",
            password: password === "" ? "비밀번호를 입력해주세요." : "",
        };

        setIsErrors(newIsErrors);
        setErrorMessages(newErrorMessages);

        const isValid = Object.values(newIsErrors).filter((value) => value === true).length === 0;

        return isValid;
    };

    const [showToast, setShowToast] = useState(false);

    const loginMutation = useMutation({
        mutationFn: onLoginApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: async (data) => {
            // 배포 환경과 로컬 환경에 따른 쿠키 설정
            const isProduction = process.env.NODE_ENV === "production";
            const cookieOptions = isProduction ? `token=${data.accessToken}; path=/; SameSite=Lax; Secure; domain=${window.location.hostname}` : `token=${data.accessToken}; path=/; SameSite=Lax`;

            document.cookie = cookieOptions;
            console.log("쿠키 설정됨:", cookieOptions);
            console.log("현재 모든 쿠키:", document.cookie);

            // 쿠키 설정 후 잠시 대기하여 브라우저가 쿠키를 처리할 시간 확보
            await new Promise((resolve) => setTimeout(resolve, 500));

            console.log("캐시 무효화 직전");
            // 캐시를 완전히 제거하고 새로 요청
            queryClient.removeQueries({ queryKey: ["isLoggedIn"] });
            queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });

            // 모든 쿼리 캐시를 무효화
            queryClient.clear();

            // 강제로 새로 요청
            await queryClient.refetchQueries({ queryKey: ["isLoggedIn"] });

            console.log("캐시 무효화 완료");

            // 강제로 페이지 리렌더링
            // window.location.reload();

            onClose();
        },
        onError: (error) => {
            console.error("loginError:::", error);
            setShowToast(true);
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

            {showToast && <Toast message="아이디 / 비밀번호를 다시 확인해주세요" onClose={() => setShowToast(false)} />}
        </form>
    );
}
