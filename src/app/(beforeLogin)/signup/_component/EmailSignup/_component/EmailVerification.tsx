import { EmailVerificationCheckIcon } from "@/components/icons/icons";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { validateEmail } from "@/utils/utils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useSignupStore from "../../../store/signupStore";
import { onCheckEmailVerificationCodeApi, onSendEmailVerificationCodeApi } from "../_api/apis";

export default function EmailVerification() {
    const { formData, setFormData, errors, setErrors, isEmailVerified, setIsEmailVerified } = useSignupStore();

    // 인증 요청 버튼 클릭 flag
    const [isClickEmailVerification, setIsClickEmailVerification] = useState(false);

    // Toast
    const [isToast, setIsToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // 이메일 인증 요청
    const handleEmailVerificationMutation = useCreateMutation(onSendEmailVerificationCodeApi, "emailVerification", {
        onSuccess: () => {
            setIsTimerFinish(false);
            setIsClickEmailVerification(true);
            setTimerResetKey((prev) => prev + 1); // 타이머 리셋
        },
        onError: (error: AxiosError) => {
            console.log(error.response?.data);
            setIsToast(true);
            setToastMessage(error.response?.data as string);
        },
    });

    // 이메일 인증 요청 버튼 클릭 시 호출
    const handleEmailVerification = () => {
        handleEmailVerificationMutation.mutate(formData.email);
    };

    // 이메일 인증 확인
    const handleEmailVerificationCheckMutation = useCreateMutation(onCheckEmailVerificationCodeApi, "emailVerificationCheck", {
        onSuccess: () => {
            setIsEmailVerified(true);
        },
        onError: (error: AxiosError) => {
            console.error(error);
            window.alert("인증번호를 확인해주세요.");
        },
    });

    // 이메일 인증 확인 버튼 클릭 시 호출
    const handleEmailVerificationCheck = () => {
        // 타이머 종료 시 return
        if (isTimerFinish) {
            setIsToast(true);
            setToastMessage("인증번호 유효기간이 만료되었습니다. 인증번호를 다시 요청해주세요.");
            return;
        }

        handleEmailVerificationCheckMutation.mutate({
            email: formData.email,
            code: formData.verificationCode,
        });
    };

    // Timer
    const [isTimerFinish, setIsTimerFinish] = useState(false); // 타이머 종료 flag
    const [timerResetKey, setTimerResetKey] = useState(0); // 타이머 리셋을 위한 key

    // 타이머 종료 시 호출
    const finishTimer = () => {
        setIsTimerFinish(true);
        setIsToast(true);
        setToastMessage("인증번호 유효기간이 만료되었습니다. 인증번호를 다시 요청해주세요.");
    };

    return (
        <div className="flex flex-col gap-5">
            {/** 이메일 입력 */}
            <div className="flex gap-2">
                <Input
                    label="이메일"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData("email", e.target.value);
                        setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="이메일을 입력해주세요"
                    type="email"
                    isRequired={true}
                    isErr={!!errors.email}
                    errMsg={errors.email}
                    isConfirm={isClickEmailVerification || isEmailVerified}
                    confirmMsg={isEmailVerified ? "본인 인증이 완료되었습니다" : isClickEmailVerification ? "인증번호가 전송되었습니다" : undefined}
                    children={isEmailVerified ? <EmailVerificationCheckIcon /> : undefined}
                />

                {/** 인증요청 버튼 */}
                {!isEmailVerified && (
                    <button
                        type="button"
                        onClick={handleEmailVerification}
                        className={`h-[46px] mt-7 text-white w-20 rounded focus:outline-none text-sm font-medium ${
                            validateEmail(formData.email) ? "bg-[#ff6363]" : "bg-[#d8dae5] text-[#8f95b2] cursor-not-allowed"
                        }`}
                        disabled={!validateEmail(formData.email)}
                    >
                        {isClickEmailVerification ? "재전송" : "인증요청"}
                    </button>
                )}
            </div>

            {/** 인증번호 입력 */}
            {!isEmailVerified && isClickEmailVerification && (
                <div className="flex gap-2">
                    <Input
                        label="인증번호 입력"
                        value={formData.verificationCode}
                        onChange={(e) => {
                            setFormData("verificationCode", e.target.value);
                            setErrors({ ...errors, verificationCode: undefined });
                        }}
                        placeholder="인증번호를 입력해 주세요"
                        type="text"
                        children={isTimerFinish ? undefined : <Timer isTimerFinish={finishTimer} resetKey={timerResetKey} />}
                        isErr={!!errors.verificationCode}
                        errMsg={errors.verificationCode}
                    />

                    <button
                        type="button"
                        className="h-[46px] mt-7 text-sm text-white w-20 rounded bg-[#ff6363] disabled:bg-[#d8dae5] disabled:text-[#8f95b2]"
                        onClick={handleEmailVerificationCheck}
                        disabled={formData.verificationCode.length !== 6 || isTimerFinish}
                    >
                        {isTimerFinish ? "인증 실패" : "인증 완료"}
                    </button>
                </div>
            )}
            {isToast && <Toast type="error" message={toastMessage} onClose={() => setIsToast(false)} />}
        </div>
    );
}

const Timer = ({ isTimerFinish, resetKey }: { isTimerFinish: () => void; resetKey: number }) => {
    const [time, setTime] = useState(180); // 3분 = 180초

    useEffect(() => {
        // resetKey가 변경되면 타이머를 리셋
        setTime(180);
    }, [resetKey]);

    useEffect(() => {
        if (time === 0) {
            isTimerFinish();
            return;
        }

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time, isTimerFinish]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return <div className="text-sm text-[#ff6363] font-medium">{formattedTime}</div>;
};
