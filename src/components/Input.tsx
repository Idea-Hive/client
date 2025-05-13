/**
 * label: 라벨
 * value: 값
 * onChange: 값 변경 이벤트
 * placeholder: 플레이스홀더
 * type: 타입
 * isRequired: 필수 여부
 * isErr: 에러 여부
 * errMsg: 에러 메시지
 * isConfirm: Confirm 타입 Input 여부(초록색 Input)
 * confirmMsg: Confirm 타입 Input 메시지(초록색 Input 메시지)
 * children: Input 오른쪽 자식 요소
 * disabled: 비활성화 여부
 * maxLength: 최대 길이
 * onKeyDown: 키 다운 이벤트
 * onKeyUp: 키 업 이벤트
 * onFocus: 포커스 이벤트
 * onBlur: 블러 이벤트
 */
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
    children?: React.ReactNode;
    disabled?: boolean;
    maxLength?: number;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export default function Input({
    label = "",
    value,
    onChange,
    placeholder,
    type,
    isErr = false,
    errMsg,
    isRequired = false,
    isConfirm = false,
    confirmMsg,
    children,
    disabled = false,
    maxLength,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
}: PropsType) {
    return (
        <div className="flex-1">
            {label !== "" && (
                <div className="mb-2 text-sm font-medium text-n800">
                    {label}
                    {isRequired && <span className="text-taskmateRed">*</span>}
                </div>
            )}

            {/** disabled 상태의 우선순위 높게 주는 방법이 이거밖에 안보이는데.. */}
            <div
                className={`w-full h-[46px] flex gap-2 rounded border px-3 border-n400 
                    ${disabled ? "bg-n200 border-n400" : isErr ? "border-red" : isConfirm ? "border-green" : value ? "border-n700" : "has-[:focus]:border-n700"}`}
            >
                <input
                    className="flex-1 h-full border-none text-sm text-n800 focus:outline-none placeholder:text-n600"
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    maxLength={maxLength}
                />
                <div className="h-full flex flex-col justify-center">{children}</div>
            </div>
            {isErr && <div className="text-red text-xs mt-2">{errMsg}</div>}
            {isConfirm && <div className="text-green text-xs mt-2">{confirmMsg}</div>}
        </div>
    );
}
