import Input from "@/components/Input";
import { InputHookType, SignupFormData } from "../utils/types";
import { validateEmail } from "../utils/utils";

interface EmailVerificationProps {
    email: InputHookType;
    verificationCode: InputHookType;
    isEmailVerified: boolean;
    setIsEmailVerified: (value: boolean) => void;
    isClickEmailVerification: boolean;
    setIsClickEmailVerification: (value: boolean) => void;
    errors: Partial<SignupFormData>;
    setErrors: (errors: Partial<SignupFormData>) => void;
}

export default function EmailVerification({
    email,
    verificationCode,
    isEmailVerified,
    setIsEmailVerified,
    isClickEmailVerification,
    setIsClickEmailVerification,
    errors,
    setErrors,
}: EmailVerificationProps) {
    const handleEmailVerification = () => {
        if (!validateEmail(email.value)) {
            setErrors({ ...errors, email: "올바른 이메일 형식이 아닙니다." });
            return;
        }
        setIsClickEmailVerification(true);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Input
                    label="이메일"
                    value={email.value}
                    onChange={(e) => {
                        email.onChange(e);
                        setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="이메일을 입력해주세요."
                    type="email"
                    isRequired={true}
                    isErr={!!errors.email}
                    errMsg={errors.email}
                    disabled={isClickEmailVerification}
                    icon={isEmailVerified ? <CheckIcon /> : undefined}
                />
                {!isEmailVerified && (
                    <button
                        type="button"
                        onClick={handleEmailVerification}
                        className={`h-10 mt-7 text-white w-24 px-4 rounded focus:outline-none ${validateEmail(email.value) ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                        disabled={!validateEmail(email.value)}
                    >
                        {isClickEmailVerification ? "재요청" : "인증요청"}
                    </button>
                )}
            </div>

            {!isEmailVerified && isClickEmailVerification && (
                <div className="flex gap-2">
                    <Input
                        label="인증코드"
                        value={verificationCode.value}
                        onChange={(e) => {
                            verificationCode.onChange(e);
                            setErrors({ ...errors, verificationCode: undefined });
                        }}
                        placeholder="인증코드를 입력해주세요."
                        type="text"
                        isRequired={true}
                        isErr={!!errors.verificationCode}
                        errMsg={errors.verificationCode}
                    />

                    {/* 인증 작업 아직 안했음 */}
                    <button type="button" className="h-10 mt-7 text-white w-24 px-4 rounded bg-blue-500 hover:bg-blue-600" onClick={() => setIsEmailVerified(true)}>
                        인증하기
                    </button>
                </div>
            )}
        </div>
    );
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);
