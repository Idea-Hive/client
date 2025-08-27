import { useToast } from "@/components/Toast/ToastProvider";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../Button";
import { onCheckAuthCodeForFindPwApi, onSendAuthCodeForFindPwApi } from "./_api/apis";

export default function AuthCodeInputForm({ onClose, email }: { onClose: () => void; email: string }) {
    const router = useRouter();
    const { showToast } = useToast();

    const sendAuthCodeMutation = useCreateMutation(onSendAuthCodeForFindPwApi, "sendAuthCodeForFindPw", {
        onSuccess: (data, variables, context) => {
            showToast("success", "인증번호가 재전송되었습니다");
        },
        onError: (error: AxiosError) => {
            showToast("error", (error.response?.data as string) || "인증번호 전송에 실패했습니다.");
        },
    });

    const resendAuthCode = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        sendAuthCodeMutation.mutate(email);
    };

    const onCheckAuthCodeMutation = useCreateMutation(onCheckAuthCodeForFindPwApi, "checkAuthCodeForFindPw", {
        onSuccess: (data) => {
            console.log("onCheckAuthCodeMutation success:::", data);
            router.push(`/resetpw?email=${encodeURIComponent(email)}`);
            onClose();
        },
        onError: (error: AxiosError) => {
            showToast("error", (error.response?.data as string) || "인증번호를 확인해주세요.");
        },
    });

    const [authCode, setAuthCode] = useState<string[]>(["", "", "", "", ""]);
    const onChange = (index: number, value: string) => {
        setAuthCode([...authCode.slice(0, index), value, ...authCode.slice(index + 1)]);
    };

    // 백스페이스 시, 이전 Input 으로 이동
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !authCode[index] && index > 0) {
            const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
            prevInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (authCode.some((code) => code === "")) {
            showToast("error", "인증번호를 입력해주세요");
            return;
        }

        const code = authCode.join("");
        onCheckAuthCodeMutation.mutate({ email, code });
    };

    return (
        <div>
            <div className="w-full mb-5 flex justify-between">
                {authCode.map((code, index) => (
                    <input
                        key={index}
                        data-index={index}
                        className="w-14 h-14 rounded-md bg-white border border-n400 data-[filled=true]:border-n700 focus:border-taskmateRed focus:bg-taskmateRed/10 focus:outline-none text-n800 text-h3 text-center"
                        data-filled={code !== ""}
                        value={code}
                        maxLength={1}
                        onChange={(e) => {
                            onChange(index, e.target.value);
                            if (e.target.value && index < 4) {
                                const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                                nextInput?.focus();
                            }
                        }}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                ))}
            </div>
            <div className="w-full flex gap-2">
                <Button btnType="line_red" label="인증번호 재전송" size="large" className="flex-1" type="button" onClick={resendAuthCode} />
                <Button btnType="primary" label="확인" size="large" className="flex-1" type="button" onClick={handleSubmit} />
            </div>
        </div>
    );
}
