import { Apis } from "@/utils/api";

// 비밀번호 찾기 이메일 인증코드 전송
export const onSendAuthCodeForFindPwApi = async (email: string) => {
    return await Apis.post(`/email/password-reset/send?email=${email}`);
};

// 비밀번호 찾기 이메일 인증코드 확인
interface CheckEmailVerificationCodeRequest {
    email: string;
    code: string;
}
export const onCheckAuthCodeForFindPwApi = async (body: CheckEmailVerificationCodeRequest) => {
    return await Apis.post(`/email/password-reset/verify?email=${body.email}&code=${body.code}`);
};
