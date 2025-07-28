import { Apis } from "@/utils/api";

// 비밀번호 찾기 비밀번호 재설정
interface ResetPwRequest {
    email: string;
    newPassword: string;
}
export const onResetPwApi = async (body: ResetPwRequest) => {
    return await Apis.post(`/member/password-reset`, body);
};
