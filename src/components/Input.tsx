interface PropsType {
    label?: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    type: string;
    isRequired?: boolean;
    isErr?: boolean;
    errMsg?: string;
    isConfirm?: boolean;
    confirmMsg?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export default function Input({ label = "", value, onChange, placeholder, type, isErr = false, errMsg, isRequired = false, isConfirm = false, confirmMsg, icon, disabled = false }: PropsType) {
    return (
        <div className="flex-1">
            {label !== "" && (
                <div className="mb-2 font-medium text-sm text-[#474d66]">
                    {label}
                    {isRequired && <span className="text-[#ff6363]">*</span>}
                </div>
            )}

            {/** disabled 상태의 우선순위 높게 주는 방법이 이거밖에 안보이는데.. */}
            <div
                className={`w-full h-[46px] flex gap-2 rounded border px-3 border-[#d8dae5] 
                    ${disabled ? "bg-[#edeff5] border-[#d8dae5]" : isErr ? "border-[#d14343]" : isConfirm ? "border-[#52bd94]" : value ? "border-[#696f8c]" : "has-[:focus]:border-[#696f8c]"}`}
            >
                <input
                    className="flex-1 h-full border-none text-sm text-[#474d66] focus:outline-none placeholder:text-[#8f95b2]"
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <div className="w-5 h-full flex flex-col justify-center">{icon}</div>
            </div>
            {isErr && <div className="text-[#d14343] text-xs mt-2">{errMsg}</div>}
            {isConfirm && <div className="text-[#52bd94] text-xs mt-2">{confirmMsg}</div>}
        </div>
    );
}
