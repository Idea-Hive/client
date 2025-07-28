/**
 * 이메일 유효성 검사
 * @param email 이메일
 * @returns 유효성 검사 결과
 */
export const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

/**
 * 비밀번호 유효성 검사
 * @param password 비밀번호
 * @returns 유효성 검사 결과
 */
export const validatePassword = (password: string) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

/**
 * 토큰 가져오기
 * @returns 토큰
 */
export const getToken = () => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
};
