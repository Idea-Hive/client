import { Apis } from "@/utils/api";

// 회원가입
export interface SignupRequest {
    email: string;
    name: string;
    password: string;
    isServiceAgreed: boolean;
    isPrivacyAgreed: boolean;
    isMarketingAgreed: boolean;
}

export const onSignupApi = async (body: SignupRequest) => {
    try {
        return await Apis.post("/member/signup", body);
    } catch (error) {
        console.error("signup error :: ", error);
        throw error;
    }
};

// 이메일 인증코드 전송
export const onSendEmailVerificationCodeApi = async (email: string) => {
    try {
        return await Apis.post(`/email/signup/send?email=${email}`);
    } catch (error) {
        console.error("sendEmailVerificationCode error :: ", error);
        throw error;
    }
};

// 이메일 인증코드 확인
interface CheckEmailVerificationCodeRequest {
    email: string;
    code: string;
}
export const onCheckEmailVerificationCodeApi = async (body: CheckEmailVerificationCodeRequest) => {
    return await Apis.post(`/email/signup/verify?email=${body.email}&code=${body.code}`);
};
