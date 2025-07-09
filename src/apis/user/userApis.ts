import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

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
    return await Apis.post(`/email/signup/send?email=${email}`);
};

// 이메일 인증코드 확인
interface CheckEmailVerificationCodeRequest {
    email: string;
    code: string;
}
export const onCheckEmailVerificationCodeApi = async (body: CheckEmailVerificationCodeRequest) => {
    return await Apis.post(`/email/signup/verify?email=${body.email}&code=${body.code}`);
};

// 비밀번호 찾기 이메일 인증코드 전송
export const onSendAuthCodeForFindPwApi = async (email: string) => {
    return await Apis.post(`/email/password-reset/send?email=${email}`);
};

// 비밀번호 찾기 이메일 인증코드 확인
export const onCheckAuthCodeForFindPwApi = async (body: CheckEmailVerificationCodeRequest) => {
    return await Apis.post(`/email/password-reset/verify?email=${body.email}&code=${body.code}`);
};

// 비밀번호 찾기 비밀번호 재설정
interface ResetPwRequest {
    email: string;
    newPassword: string;
}
export const onResetPwApi = async (body: ResetPwRequest) => {
    return await Apis.post(`/member/password-reset`, body);
};

// 회원가입
export interface SignupRequest {
    email: string;
    password: string;
    passwordCheck: string;
    name: string;
}

export const onSignupApi = async (body: SignupRequest) => {
    const requestBody = {
        ...body,
        career: 3,
        type: "email",
        skillstackIds: [0, 1, 2],
    };

    return await Apis.post("/member/signup", requestBody);
};

export interface EditUserInfoRequest {
    name: string;
    job: string;
    career: number;
    skillStackIds: number[];
}
export const onEditUserInfoApi = async (body: EditUserInfoRequest): Promise<User> => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    if (!token) throw new Error("토큰이 없습니다.");

    try {
        return await Apis.put("/member/update", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};

// 유저 정보 가져오기
export interface User {
    id: number;
    name: string;
    email: string;
    createdDate: string;
    job: string;
    career: number;
    type: string;
    modifiedDate: string;
    profileUrl: string;
    SkillStacks: {
        id: number;
        category: string;
        name: string;
    }[];
    isDeleted: boolean;
    isVerified: boolean;
}
export const getUserInfoApi: QueryFunction<User, [_1: string]> = async ({ queryKey }) => {
    // 더 안전한 토큰 파싱
    const getToken = () => {
        try {
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find((row) => row.trim().startsWith("token="));
            if (!tokenCookie) return null;

            const token = tokenCookie.split("=")[1];
            return token && token.trim() !== "" ? token : null;
        } catch (error) {
            console.error("토큰 파싱 에러:", error);
            return null;
        }
    };

    const token = getToken();
    console.log("token:::", token);
    // 토큰이 없으면 api 태우지 않음
    if (!token) return null;

    try {
        const response = await Apis.get("/member/info", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
