import { ToastType } from "@/components/Toast";
import { validateEmail, validatePassword } from "@/utils/utils";
import { create } from "zustand";

export interface SignupFormData {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    verificationCode: string;
    terms1: boolean;
    terms2: boolean;
    terms3: boolean;
}

interface SignupStore {
    // 폼 데이터
    formData: SignupFormData;
    setFormData: (field: keyof SignupFormData, value: string | boolean) => void;

    // 유틸리티
    validate: () => boolean;

    // 상태 관리
    isEmailVerified: boolean;
    errors: Partial<SignupFormData>;
    setIsEmailVerified: (isEmailVerified: boolean) => void;
    setErrors: (errors: Partial<SignupFormData>) => void;

    // Toast
    showToast: boolean;
    toastMessage: string;
    toastType: ToastType;
    setShowToast: (showToast: boolean) => void;
    setToastMessage: (toastMessage: string) => void;
    setToastType: (toastType: ToastType) => void;
}

const initialState: SignupFormData = {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    verificationCode: "",
    terms1: false,
    terms2: false,
    terms3: false,
};

const useSignupStore = create<SignupStore>((set, get) => ({
    // 폼 데이터
    formData: initialState,
    setFormData: (field, value) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
            },
        }));
    },

    // 유틸리티
    validate: () => {
        const { formData, isEmailVerified, setToastType, setShowToast, setToastMessage, setErrors } = get();
        const { email, password, passwordConfirm, nickname, verificationCode } = formData;

        const newErrors: Partial<SignupFormData> = {};

        if (email === "") {
            newErrors.email = "이메일을 입력해주세요.";
        } else if (!validateEmail(email)) {
            newErrors.email = "이메일 형식에 맞게 입력해주세요";
        }
        if (password === "") {
            newErrors.password = "비밀번호를 입력해주세요.";
        } else if (!validatePassword(password)) {
            newErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
        }
        if (password && passwordConfirm === "") {
            newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
        } else if (password !== passwordConfirm) {
            newErrors.passwordConfirm = "입력한 비밀번호와 동일하게 입력해주세요.";
        }
        if (nickname === "") {
            newErrors.nickname = "닉네임을 입력해주세요.";
        }
        if (!isEmailVerified) {
            setToastType("error");
            setShowToast(true);
            setToastMessage("이메일 인증을 완료해주세요.");
        } else if (verificationCode === "") {
            newErrors.verificationCode = "인증 코드를 입력해주세요.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0 && isEmailVerified;
    },

    // 상태 관리
    isEmailVerified: false,
    setIsEmailVerified: (isEmailVerified) => set({ isEmailVerified }),
    errors: {},
    setErrors: (errors) => set({ errors }),

    // Toast
    showToast: false,
    toastMessage: "",
    toastType: "error",
    setShowToast: (showToast) => set({ showToast }),
    setToastMessage: (toastMessage) => set({ toastMessage }),
    setToastType: (toastType) => set({ toastType }),
}));

export default useSignupStore;
