import { Apis } from "@/utils/api";

// 로그인
export interface LoginRequest {
    email: string;
    rawPassword: string;
}

export const onLoginApi = async (body: LoginRequest) => {
    return await Apis.post("/auth/login", body);
};

// 이메일 인증코드 전송
export const onSendEmailVerificationCodeApi = async (email: string) => {
    return await Apis.post(`/email/send?email=${email}`);
};

// 비밀번호 찾기 이메일 인증코드 전송
export const onSendAuthCodeForFindPwApi = async (email: string) => {
    return await Apis.post(`/auth/send-auth-code?email=${email}`);
};

// 회원가입
export interface SignupRequest {
    email: string;
    password: string;
    passwordCheck: string;
}

export const onSignupApi = async (body: SignupRequest) => {
    return await Apis.post("/member/signup", body);
};
