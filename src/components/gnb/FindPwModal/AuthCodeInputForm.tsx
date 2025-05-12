import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../Button";

export default function AuthCodeInputForm({ onClose }: { onClose: () => void }) {
    const router = useRouter();

    const [authCode, setAuthCode] = useState<string[]>(["", "", "", "", ""]);
    const onChange = (index: number, value: string) => {
        setAuthCode([...authCode.slice(0, index), value, ...authCode.slice(index + 1)]);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // 백스페이스 누르면 이전 input으로 이동
        if (e.key === "Backspace" && !authCode[index] && index > 0) {
            const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
            prevInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push("/resetpw");
        onClose();
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
                        pattern="[0-9]"
                        inputMode="numeric"
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            onChange(index, value);
                            if (value && index < 4) {
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
