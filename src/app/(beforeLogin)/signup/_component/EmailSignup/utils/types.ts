export interface SignupFormData {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    verificationCode?: string;
}

export interface InputHookType {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}
