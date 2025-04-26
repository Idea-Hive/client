import { create } from "zustand";

export const useSignupStore = create((set) => ({
    terms: {
        terms1: false,
        terms2: false,
        terms3: false,
    },
    setTerms: (terms: { terms1: boolean; terms2: boolean; terms3: boolean }) => set({ terms }),

    information: {
        email: "",
        password: "",
        passwordConfirm: "",
        verificationCode: "",
        isEmailVerified: false,
        isClickEmailVerification: false,
        errors: {
            email: "",
            password: "",
        },
    },
}));
