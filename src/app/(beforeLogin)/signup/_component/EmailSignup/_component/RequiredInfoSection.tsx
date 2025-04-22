import Input from "@/components/Input";
import { InputHookType, SignupFormData } from "../utils/types";
import EmailVerification from "./EmailVerification";

interface RequiredInfoSectionProps {
    email: InputHookType;
    password: InputHookType;
    passwordConfirm: InputHookType;
    verificationCode: InputHookType;
    isEmailVerified: boolean;
    setIsEmailVerified: (value: boolean) => void;
    isClickEmailVerification: boolean;
    setIsClickEmailVerification: (value: boolean) => void;
    errors: Partial<SignupFormData>;
    setErrors: (errors: Partial<SignupFormData>) => void;
}

export default function RequiredInfoSection({
    email,
    password,
    passwordConfirm,
    verificationCode,
    isEmailVerified,
    setIsEmailVerified,
    isClickEmailVerification,
    setIsClickEmailVerification,
    errors,
    setErrors,
}: RequiredInfoSectionProps) {
    return (
        <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">필수 정보</h3>
            <div className="space-y-4">
                <EmailVerification
                    email={email}
                    verificationCode={verificationCode}
                    isEmailVerified={isEmailVerified}
                    setIsEmailVerified={setIsEmailVerified}
                    isClickEmailVerification={isClickEmailVerification}
                    setIsClickEmailVerification={setIsClickEmailVerification}
                    errors={errors}
                    setErrors={setErrors}
                />

                <Input
                    label="비밀번호"
                    {...password}
                    onChange={(e) => {
                        password.onChange(e);
                        setErrors({ ...errors, password: undefined });
                    }}
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    isRequired={true}
                    isErr={!!errors.password}
                    errMsg={errors.password}
                />

                <Input
                    label="비밀번호 확인"
                    {...passwordConfirm}
                    onChange={(e) => {
                        passwordConfirm.onChange(e);
                        setErrors({ ...errors, passwordConfirm: undefined });
                    }}
                    placeholder="비밀번호를 다시 입력해주세요."
                    type="password"
                    isRequired={true}
                    isErr={!!errors.passwordConfirm}
                    errMsg={errors.passwordConfirm}
                />
            </div>
        </div>
    );
}
