import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import { useCreateMutation } from "@/hooks/mutations/hooks";
import { validateEmail } from "@/utils/utils";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../../Button";
import Spinner from "../../Spinner";
import { onSendAuthCodeForFindPwApi } from "./_api/apis";

export default function SendAuthCodeForm({ setIsSendAuthCode, setEmail }: { setIsSendAuthCode: Dispatch<SetStateAction<boolean>>; setEmail: Dispatch<SetStateAction<string>> }) {
    const email = useInput("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const sendAuthCodeMutation = useCreateMutation(onSendAuthCodeForFindPwApi, "onSendAuthCodeForFindPw", {
        onSuccess: () => {
            setEmail(email.value);
            setIsSendAuthCode(true);
        },
        onError: (error) => {
            setIsError(true);
            setErrorMessage("존재하지 않는 이메일입니다");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setIsError(false);
        setErrorMessage("");

        if (email.value === "") {
            setIsError(true);
            setErrorMessage("이메일을 입력해주세요");
            return;
        } else if (!validateEmail(email.value)) {
            setIsError(true);
            setErrorMessage("이메일 형식에 맞게 입력해주세요");
            return;
        }

        sendAuthCodeMutation.mutate(email.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            {sendAuthCodeMutation.isPending && <Spinner />}
            <Input {...email} type="email" placeholder="이메일을 입력해주세요." isErr={isError} errMsg={errorMessage} />
            <Button btnType="primary" label="인증번호 전송" size="large" className="w-full mt-5" type="submit" onClick={handleSubmit} />
        </form>
    );
}
