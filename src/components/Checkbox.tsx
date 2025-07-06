import { useState } from "react";

/**
 * checked: 체크박스 체크 여부
 * value: 체크박스 값
 * label: 체크박스 라벨
 * onClick: 체크박스 클릭 이벤트
 */
interface CheckboxProps {
    checked: boolean;
    value: string;
    label?: string;
    onClick: (value: string, checked: boolean) => void;
    inTable?: boolean;
}
export default function Checkbox({ checked = false, value, label, onClick, inTable = false }: CheckboxProps) {
    return (
        <div
            className={`${inTable ? "flex w-full h-full items-center justify-center" : "w-fit bg-white cursor-pointer"} cursor-pointer`}
            onClick={() => {
                onClick(value, !checked);
            }}
        >
            <div className={`${!inTable ? "pl-3" : ""} w-fit flex gap-2 items-center`}>
                <div className="w-4 flex justify-center flex-col">
                    <div className={`w-full h-4 flex items-center justify-center bg-white border border-n400 rounded`}>{checked && <div className="w-2 h-2 bg-taskmateRed"></div>}</div>
                </div>
                {label && <div className="text-sm font-normal text-n900">{label}</div>}
            </div>
        </div>
    );
}
