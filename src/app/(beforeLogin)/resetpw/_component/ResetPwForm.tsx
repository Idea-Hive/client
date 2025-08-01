"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { useInput } from "@/hooks/hooks";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { validatePassword } from "@/utils/utils";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { onResetPwApi } from "../_api/apis";

export default function ResetPwForm({ setIsReset }: { setIsReset: Dispatch<SetStateAction<boolean>> }) {
    const password = useInput("");
    const passwordCheck = useInput("");

    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [errors, setErrors] = useState<Partial<{ password: string; passwordConfirm: string }>>({
        password: "",
        passwordConfirm: "",
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // 비밀번호 재설정 mutation
    const resetPwMutation = useCreateMutation(onResetPwApi, "resetPw", {
        onSuccess: () => {
            setIsReset(true);
        },
        onError: (error: AxiosError) => {
            setShowToast(true);
            setToastMessage(error.response?.data as string);
        },
    });

    // 비밀번호 유효성 검사
    const validate = (password: string, passwordCheck: string) => {
        const newErrors = {
            password: "",
            passwordConfirm: "",
        };

        if (password === "") {
            newErrors.password = "비밀번호를 입력해주세요.";
        } else if (!validatePassword(password)) {
            newErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
        }
        if (password && passwordCheck === "") {
            newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
        } else if (password !== passwordCheck) {
            newErrors.passwordConfirm = "입력한 비밀번호와 동일하게 입력해주세요.";
        }

        setErrors(newErrors);

        const isValid = newErrors.password === "" && newErrors.passwordConfirm === "";

        return isValid;
    };

    // 비밀번호 재설정
    const handleResetPw = () => {
        const isValid = validate(password.value, passwordCheck.value);
        if (!isValid) return;

        resetPwMutation.mutate({ email: email!, newPassword: password.value });
    };

    return (
        <div className="w-[420px] mx-auto mt-[92px]">
            <h2 className="text-h2 text-n900 text-center mb-2">비밀번호 재설정</h2>
            <div className="text-sm text-n700 text-center mb-8">새롭게 변경할 비밀번호를 입력해주세요</div>
            <div className="w-full flex flex-col gap-5 mb-6 p-10 border border-n400 rounded-lg">
                <Input label="비밀번호" isRequired={true} type="password" placeholder="비밀번호" {...password} isPassword={true} isErr={errors.password !== ""} errMsg={errors.password} />
                <Input
                    label="비밀번호 확인"
                    isRequired={true}
                    type="password"
                    placeholder="비밀번호 확인"
                    {...passwordCheck}
                    isPassword={true}
                    isErr={errors.passwordConfirm !== ""}
                    errMsg={errors.passwordConfirm}
                />
            </div>
            <Button btnType="primary" label="확인" size="large" className="w-full" disabled={password.value === "" || passwordCheck.value === ""} onClick={handleResetPw} />
            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
        </div>
    );
}
