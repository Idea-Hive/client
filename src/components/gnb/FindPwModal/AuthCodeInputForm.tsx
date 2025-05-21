import { onCheckAuthCodeForFindPwApi } from "@/apis/user/userApis";
import { useSpinner } from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../Button";

export default function AuthCodeInputForm({ onClose, email }: { onClose: () => void; email: string }) {
    const router = useRouter();
    const spinner = useSpinner();

    const onCheckAuthCodeMutation = useMutation({
        mutationFn: onCheckAuthCodeForFindPwApi,
        onMutate: () => {
            spinner.open();
        },
        onSuccess: (data) => {
            console.log("success:::", data);
            router.push(`/resetpw?email=${encodeURIComponent(email)}`);
            onClose();
        },
        onError: (error) => {
            console.log("error:::", error);
        },
        onSettled: () => {
            spinner.close();
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
                <Button btnType="line_red" label="인증번호 재전송" size="large" className="flex-1" type="button" onClick={() => {}} />
                <Button btnType="primary" label="확인" size="large" className="flex-1" type="button" onClick={handleSubmit} />
            </div>
        </div>
    );
}
