interface PropsType {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    isRequired?: boolean;
    isErr?: boolean;
    errMsg?: string;
    isConfirm?: boolean;
    confirmMsg?: string;
    disabled?: boolean;
    height?: string;
}

export default function Textarea({
    label = "",
    value,
    onChange,
    placeholder,
    isErr = false,
    errMsg,
    isRequired = false,
    isConfirm = false,
    confirmMsg,
    disabled = false,
    height = "172px",
}: PropsType) {
    return (
        <div className="flex-1">
            {label !== "" && (
                <div className="mb-2 text-sm font-medium text-n800">
                    {label}
                    {isRequired && <span className="text-taskmateRed">*</span>}
                </div>
            )}

            <div
                className={`w-full flex gap-2 rounded border p-3 border-n400 
                    ${disabled ? "bg-n200 border-n400" : isErr ? "border-red" : isConfirm ? "border-green" : value ? "border-n700" : "has-[:focus]:border-n700"}`}
            >
                <textarea
                    className="flex-1 border-none text-sm text-n800 focus:outline-none placeholder:text-n600 resize-none"
                    style={{ height }}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>
            {isErr && <div className="text-red text-xs mt-2">{errMsg}</div>}
            {isConfirm && <div className="text-green text-xs mt-2">{confirmMsg}</div>}
        </div>
    );
}
