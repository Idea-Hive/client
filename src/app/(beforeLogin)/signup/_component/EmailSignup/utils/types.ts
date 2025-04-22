export interface SignupFormData {
    email: string;
    password: string;
    passwordConfirm: string;
    verificationCode?: string;
    nickname?: string;
    occupation?: string;
    experience?: string;
    interests?: string;
}

export interface InputHookType {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}
