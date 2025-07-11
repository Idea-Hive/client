import Input from "@/components/Input";
import { Dispatch, SetStateAction } from "react";
import { InputHookType, SignupFormData } from "../utils/types";
import EmailVerification from "./EmailVerification";

interface RequiredInfoSectionProps {
    email: InputHookType;
    password: InputHookType;
    passwordConfirm: InputHookType;
    name: InputHookType;
    verificationCode: InputHookType;
    errors: Partial<SignupFormData>;
    setErrors: (errors: Partial<SignupFormData>) => void;
    isEmailVerified: boolean;
    setIsEmailVerified: Dispatch<SetStateAction<boolean>>;
}

export default function RequiredInfoSection({ email, password, passwordConfirm, name, verificationCode, errors, setErrors, isEmailVerified, setIsEmailVerified }: RequiredInfoSectionProps) {
    return (
        <div className="p-10 rounded-lg border border-[#d8dae5]">
            <h3 className="text-base font-medium mb-5">필수사항</h3>
            <div>
                <EmailVerification email={email} verificationCode={verificationCode} errors={errors} setErrors={setErrors} isEmailVerified={isEmailVerified} setIsEmailVerified={setIsEmailVerified} />

                <div className="my-5 flex flex-col gap-2">
                    <Input
                        label="비밀번호"
                        {...password}
                        onChange={(e) => {
                            password.onChange(e);
                            setErrors({ ...errors, password: undefined });
                        }}
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        isRequired={true}
                        isErr={!!errors.password}
                        errMsg={errors.password}
                    />

                    <Input
                        {...passwordConfirm}
                        onChange={(e) => {
                            passwordConfirm.onChange(e);
                            setErrors({ ...errors, passwordConfirm: undefined });
                        }}
                        placeholder="비밀번호를 다시 입력해주세요"
                        type="password"
                        disabled={!password.value}
                        isRequired={true}
                        isErr={!!errors.passwordConfirm}
                        errMsg={errors.passwordConfirm}
                    />
                </div>

                <Input
                    label="이름"
                    {...name}
                    onChange={(e) => {
                        name.onChange(e);
                        setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="이름을 입력해주세요"
                    type="text"
                    isRequired={true}
                    isErr={!!errors.name}
                    errMsg={errors.name}
                />
            </div>
        </div>
    );
}
