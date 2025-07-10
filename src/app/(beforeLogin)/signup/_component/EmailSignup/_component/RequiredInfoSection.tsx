import Input from "@/components/Input";
import useSignupStore from "../../../store/signupStore";
import EmailVerification from "./EmailVerification";

export default function RequiredInfoSection() {
    const { formData, setFormData, errors, setErrors } = useSignupStore();

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(field, value);
        // 에러가 있으면 클리어
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    return (
        <div className="p-10 rounded-lg border border-[#d8dae5]">
            <h3 className="text-base font-medium mb-5">필수사항</h3>
            <div>
                {/** 이메일 인증 */}
                <EmailVerification />

                <div className="my-5 flex flex-col gap-2">
                    <Input
                        label="비밀번호"
                        value={formData.password}
                        onChange={(e) => {
                            handleInputChange("password", e.target.value);
                        }}
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        isRequired={true}
                        isErr={!!errors.password}
                        errMsg={errors.password}
                    />

                    <Input
                        value={formData.passwordConfirm}
                        onChange={(e) => {
                            handleInputChange("passwordConfirm", e.target.value);
                        }}
                        placeholder="비밀번호를 다시 입력해주세요"
                        type="password"
                        disabled={!formData.password}
                        isRequired={true}
                        isErr={!!errors.passwordConfirm}
                        errMsg={errors.passwordConfirm}
                    />
                </div>

                <Input
                    label="닉네임"
                    value={formData.nickname}
                    onChange={(e) => {
                        handleInputChange("nickname", e.target.value);
                    }}
                    placeholder="닉네임을 입력해주세요"
                    type="text"
                    isRequired={true}
                    isErr={!!errors.nickname}
                    errMsg={errors.nickname}
                />
            </div>
        </div>
    );
}
