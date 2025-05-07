interface ButtonProps {
    label: React.ReactNode;
    onClick: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset" | undefined;
    btnType?: "primary" | "secondary" | "line_red" | "line" | "minimal";
    size?: "large" | "medium" | "small";
    icLeft?: React.ReactNode;
    icRight?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export default function Button({ label, onClick, type = "button", btnType = "primary", size = "large", icLeft, icRight, disabled = false, className = "" }: ButtonProps) {
    const buttonStyles = {
        primary: "bg-taskmateRed text-n0 border border-transparent hover:bg-[#f54b4a] disabled:bg-n400 disabled:text-n600",
        secondary: "bg-n800 text-n0 border border-transparent hover:bg-[#333952] disabled:bg-n400 disabled:text-n600",
        line_red: "bg-white text-taskmateRed border border-taskmateRed hover:bg-taskmateRed/5 disabled:bg-n400 disabled:text-n600 disabled:border-transparent",
        line: "bg-white text-n800 border border-n500 hover:bg-n75 disabled:bg-n400 disabled:text-n600 disabled:border-transparent",
        minimal: "bg-white text-n800 border border-transparent hover:bg-n75 disabled:bg-n400 disabled:text-n600",
    };

    const buttonSizeStyles = {
        large: "px-4 h-12 text-baseEmphasize",
        medium: "px-4 h-[46px] text-smEmphasize",
        small: "px-3 h-8 text-smEmphasize",
    };

    return (
        <button
            className={`rounded-md transition-colors flex items-center justify-center gap-1 ${buttonStyles[btnType]} ${buttonSizeStyles[size]} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {icLeft}
            {label}
            {icRight}
        </button>
    );
}
