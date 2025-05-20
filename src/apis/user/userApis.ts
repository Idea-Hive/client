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

// 회원가입
export interface SignupRequest {
    email: string;
    password: string;
    passwordCheck: string;
}

export const onSignupApi = async (body: SignupRequest) => {
    const requestBody = {
        ...body,
        email: "dbswpgur3@naver.com",
        name: "윤제혁",
        job: "프론트엔드",
        career: 3,
        type: "email",
        skillstackIds: [0, 1, 2],
    };

    return await Apis.post("/member/signup", requestBody);
};

export const getUserInfoApi = async () => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    // 토큰이 없으면 api 태우지 않음
    if (!token) {
        console.log("No token found, skipping API call");
        return null;
    }

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
