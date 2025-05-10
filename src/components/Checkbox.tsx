import { useState } from "react";

interface CheckboxProps {
    checked: boolean;
    value: string;
    label?: string;
    onClick: (value: string, checked: boolean) => void;
}
export default function Checkbox({ checked = false, value, label, onClick }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <div
            className="w-fit bg-white cursor-pointer"
            onClick={() => {
                onClick(value, !isChecked);
                setIsChecked(!isChecked);
            }}
        >
            <div className="w-fit pl-3 flex gap-2 items-center">
                <div className="w-4 flex justify-center flex-col">
                    <div className={`w-full h-4 ${isChecked ? "bg-black border-none" : "bg-white border border-n400"} rounded`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
                {label && <div className="text-sm font-normal text-n900">{label}</div>}
            </div>
        </div>
    );
}
