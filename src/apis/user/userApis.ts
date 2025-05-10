import axios from "axios";

export interface LoginRequest {
    email: string;
    rawPassword: string;
}

export const onLoginApi = async (body: LoginRequest) => {
    return await axios.post("http://localhost:8080/api/auth/login", body);
};

export const onSendEmailVerificationCodeApi = async (email: string) => {
    return await axios.post(`http://localhost:8080/api/email/send?email=${email}`);
};
