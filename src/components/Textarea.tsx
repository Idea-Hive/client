/**
 * label: 라벨
 * value: 값
 * onChange: onChange 이벤트
 * placeholder: placeholder
 * isRequired: 필수 여부
 * isErr: 에러 여부
 * errMsg: 에러 메시지
 * isConfirm: Confirm 타입 Textarea 여부(초록색 Textarea)
 * confirmMsg: Confirm 타입 Textarea 메시지(초록색 Textarea 메시지)
 * disabled: 비활성화 여부
 * className: 추가 className
 */
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
    className?: string;
}

export default function Textarea({ label = "", value, onChange, placeholder, isErr = false, errMsg, isRequired = false, isConfirm = false, confirmMsg, disabled = false, className }: PropsType) {
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
                    className={`flex-1 border-none text-sm text-n800 focus:outline-none placeholder:text-n600 resize-none h-[172px] ${className}`}
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
