/**
 * label: 라벨
 * name: name attribute
 * value: 값
 * checked: 체크 여부
 * onChange: 변경 이벤트
 * disabled: 비활성화 여부
 */
interface RadioProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function Radio({ label, name, value, checked = false, onChange, disabled = false }: RadioProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input type="radio" name={name} value={value} defaultChecked={checked} onChange={onChange} disabled={disabled} className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
            <span className={`text-sm ${disabled ? "text-gray-400" : "text-gray-700"}`}>{label}</span>
        </label>
    );
}
