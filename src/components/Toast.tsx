import { useEffect, useState } from "react";

interface ToastProps {
    type?: "success" | "warning" | "error" | "info";
    message: string;
    duration?: number;
    onClose?: () => void;
    className?: string;
}

export default function Toast({ type = "error", message, duration = 3000, onClose, className }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`
                fixed bottom-5 left-1/2 -translate-x-1/2 z-[100]
                p-4 rounded-lg border text-sm
                animate-[slideUp_3s_ease-in-out_forwards]
                flex items-center justify-between
                w-[488px]
                ${type === "success" && "bg-[#f5fbf8] border-green shadow-[0px_4px_8px_0px_rgba(49,113,89,0.16)]"}
                ${type === "warning" && "bg-[#fffaf1] border-yellow shadow-[0px_4px_8px_0px_rgba(125,40,40,0.16)]"}
                ${type === "error" && "bg-[#fdf4f4] border-red shadow-[0px_4px_8px_0px_rgba(125,40,40,0.16)]"}
                ${type === "info" && "bg-[#f3f6ff] border-blue shadow-[0px_4px_8px_0px_rgba(31,61,153,0.16)]"}
                ${className}
            `}
        >
            <div
                className={`flex items-center gap-4 
                    ${type === "success" && "text-green"}
                    ${type === "warning" && "text-yellow"}
                    ${type === "error" && "text-red"}
                    ${type === "info" && "text-blue"}
                `}
            >
                {type === "success" && <SuccessIcon />}
                {type === "warning" && <WarningIcon />}
                {type === "error" && <ErrorIcon />}
                {type === "info" && <InfoIcon />}
                {message}
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.0575 6L9.525 3.5325C9.6675 3.3975 9.75 3.21 9.75 3C9.75 2.5875 9.4125 2.25 9 2.25C8.79 2.25 8.6025 2.3325 8.4675 2.4675L6 4.9425L3.5325 2.4675C3.3975 2.3325 3.21 2.25 3 2.25C2.5875 2.25 2.25 2.5875 2.25 3C2.25 3.21 2.3325 3.3975 2.4675 3.5325L4.9425 6L2.475 8.4675C2.3325 8.6025 2.25 8.79 2.25 9C2.25 9.4125 2.5875 9.75 3 9.75C3.21 9.75 3.3975 9.6675 3.5325 9.5325L6 7.0575L8.4675 9.525C8.6025 9.6675 8.79 9.75 9 9.75C9.4125 9.75 9.75 9.4125 9.75 9C9.75 8.79 9.6675 8.6025 9.5325 8.4675L7.0575 6Z"
                    fill={`${type === "success" ? "#317159" : type === "warning" ? "#7D2828" : type === "error" ? "#7D2828" : "#1F3D99"}`}
                />
            </svg>
        </div>
    );
}

const SuccessIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 8 16C3.58 16 0 12.42 0 8C0 3.58 3.58 0 8 0ZM12 5C11.72 5 11.47 5.11004 11.29 5.29004L7 9.58984L4.70996 7.29004C4.52996 7.11004 4.28 7 4 7C3.45 7 3 7.45 3 8C3 8.28 3.11004 8.52996 3.29004 8.70996L6.29004 11.71C6.47004 11.89 6.72 12 7 12C7.28 12 7.52996 11.89 7.70996 11.71L12.71 6.70996C12.89 6.52996 13 6.28 13 6C13 5.45 12.55 5 12 5Z"
            fill="#52BD94"
        />
    </svg>
);

const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.00098 1C8.3707 1.00004 8.68071 1.20003 8.85059 1.5L8.86035 1.49023L15.8555 13.4902L15.8457 13.5C15.9356 13.65 15.9961 13.81 15.9961 14C15.9961 14.55 15.5458 15 14.9961 15H1.00488C0.455386 14.9998 0.00585938 14.5499 0.00585938 14C0.00585938 13.81 0.0663062 13.65 0.15625 13.5L0.145508 13.4902L7.1416 1.49023L7.15137 1.5C7.33125 1.2 7.63121 1 8.00098 1ZM7.00195 12.9902H9V10.9902H7.00195V12.9902ZM7.00195 4.99023V9.99023H9V4.99023H7.00195Z"
            fill="#FFB020"
        />
    </svg>
);

const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.00098 0.00500488C12.4182 0.00506642 15.9961 3.58292 15.9961 8.00012C15.996 12.4173 12.4181 15.9952 8.00098 15.9952C3.58378 15.9952 0.00592091 12.4173 0.00585938 8.00012C0.00585938 3.58288 3.58374 0.00500488 8.00098 0.00500488ZM7.00195 12.9972H9V10.9982H7.00195V12.9972ZM7.00195 3.00305V9.99915H9V3.00305H7.00195Z"
            fill="#D14343"
        />
    </svg>
);

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 8 16C3.58 16 0 12.42 0 8C0 3.58 3.58 0 8 0ZM6 6V7H7V12H6V13H10V12H9V6H6ZM7 5H9V3H7V5Z" fill="#3366FF" />
    </svg>
);
