import { ToastType } from "../Toast";

let toastFunction: ((type: ToastType, message: string, duration?: number) => void) | null = null;

export const setToastFunction = (fn: (type: ToastType, message: string, duration?: number) => void) => {
    toastFunction = fn;
};

export const toast = (type: ToastType, message: string, duration?: number) => {
    if (toastFunction) {
        toastFunction(type, message, duration);
    } else {
        console.warn("Toast function not initialized. Make sure ToastProvider is set up.");
    }
};

// 편의 함수들
export const toastSuccess = (message: string, duration?: number) => toast("success", message, duration);
export const toastWarning = (message: string, duration?: number) => toast("warning", message, duration);
export const toastError = (message: string, duration?: number) => toast("error", message, duration);
export const toastInfo = (message: string, duration?: number) => toast("info", message, duration);
