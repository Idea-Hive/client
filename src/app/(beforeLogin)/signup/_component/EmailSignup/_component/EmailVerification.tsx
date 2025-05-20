import { onCheckEmailVerificationCodeApi, onSendEmailVerificationCodeApi } from "@/apis/user/userApis";
import Input from "@/components/Input";
import { useSpinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { InputHookType, SignupFormData } from "../utils/types";
import { validateEmail } from "../utils/utils";

interface EmailVerificationProps {
    email: InputHookType;
    verificationCode: InputHookType;
    errors: Partial<SignupFormData>;
    setErrors: (errors: Partial<SignupFormData>) => void;
}

export default function EmailVerification({ email, verificationCode, errors, setErrors }: EmailVerificationProps) {
    const spinner = useSpinner();

    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 완료 flag
    const [isClickEmailVerification, setIsClickEmailVerification] = useState(false); // 인증 요청 버튼 클릭 flag

    const handleEmailVerificationMutation = useMutation({
        mutationFn: onSendEmailVerificationCodeApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (data) => {
            console.log("success data:::", data);
            setIsClickEmailVerification(true);
        },
        onError: (error) => {
            console.log(error);
            window.alert("이메일 인증 요청에 실패했습니다.");
        },
        onSettled: () => {
            spinner.close();
        },
    });

    const handleEmailVerificationCheckMutation = useMutation({
        mutationFn: onCheckEmailVerificationCodeApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (data) => {
            console.log("success data:::", data);
            setIsEmailVerified(true);
        },
        onError: (error) => {
            console.log(error);
            window.alert("인증번호를 확인해주세요.");
        },
        onSettled: () => {
            spinner.close();
        },
    });

    // 이메일 인증 요청
    const handleEmailVerification = () => {
        console.log("email.value:::", email.value);
        handleEmailVerificationMutation.mutate(email.value);
    };

    const handleEmailVerificationCheck = () => {
        console.log("verificationCode.value:::", verificationCode.value);
        handleEmailVerificationCheckMutation.mutate({
            email: email.value,
            code: verificationCode.value,
        });
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2">
                <Input
                    label="이메일"
                    value={email.value}
                    onChange={(e) => {
                        email.onChange(e);
                        setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="이메일을 입력해주세요"
                    type="email"
                    isRequired={true}
                    isErr={!!errors.email}
                    errMsg={errors.email}
                    isConfirm={isClickEmailVerification || isEmailVerified}
                    confirmMsg={isEmailVerified ? "본인 인증이 완료되었습니다" : isClickEmailVerification ? "인증번호가 전송되었습니다" : undefined}
                    children={isEmailVerified ? <CheckIcon /> : undefined}
                />

                {!isEmailVerified && (
                    <button
                        type="button"
                        onClick={handleEmailVerification}
                        className={`h-[46px] mt-7 text-white w-20 rounded focus:outline-none text-sm font-medium ${
                            validateEmail(email.value) ? "bg-[#ff6363]" : "bg-[#d8dae5] text-[#8f95b2] cursor-not-allowed"
                        }`}
                        disabled={!validateEmail(email.value)}
                    >
                        {isClickEmailVerification ? "재전송" : "인증요청"}
                    </button>
                )}
            </div>

            {!isEmailVerified && isClickEmailVerification && (
                <div className="flex gap-2">
                    <Input
                        label="인증번호 입력"
                        value={verificationCode.value}
                        onChange={(e) => {
                            verificationCode.onChange(e);
                            setErrors({ ...errors, verificationCode: undefined });
                        }}
                        placeholder="인증번호를 입력해 주세요"
                        type="text"
                        isErr={!!errors.verificationCode}
                        errMsg={errors.verificationCode}
                    />

                    {/* 인증 작업 아직 안했음 */}
                    <button
                        type="button"
                        className="h-[46px] mt-7 text-sm text-white w-20 rounded bg-[#ff6363] disabled:bg-[#d8dae5] disabled:text-[#8f95b2]"
                        onClick={handleEmailVerificationCheck}
                        disabled={verificationCode.value.length !== 6}
                    >
                        인증 완료
                    </button>
                </div>
            )}
        </div>
    );
}

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.62474 12.8098 7.57868 12.8857 7.54725C12.9616 7.51583 13.0429 7.49965 13.125 7.49965C13.2071 7.49965 13.2884 7.51583 13.3643 7.54725C13.4402 7.57868 13.5091 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7342 7.96156 13.7504 8.04288 13.7504 8.125C13.7504 8.20712 13.7342 8.28844 13.7027 8.36431C13.6713 8.44018 13.6253 8.50912 13.5672 8.56719Z"
            fill="#52BD94"
        />
    </svg>
);
