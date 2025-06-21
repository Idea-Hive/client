import { useState, useRef, useEffect } from "react";
import { DropboxProps } from "../_types/Task";
import { SmallUserImgIcon, CaretDownIcon } from "@/components/icons/icons";
import { useClickOutside } from "@/hooks/hooks";

const assigneeList: { label: string; value: string }[] = [
    { label: "선택없음", value: "" },
    { label: "이서연", value: "manager1" },
    { label: "홍길동", value: "manager2" },
    { label: "김철수", value: "manager3" },
];

const Dropbox = ({ task, index, onSelectAssignee }: DropboxProps) => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const toggleDropdown = (index: number) => {
        setOpenDropdownIndex((prev) => (prev === index ? null : index));
    };

    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => setOpenDropdownIndex(null));

    const handleSelect = (index: number, assignee: { label: string; value: string }) => {
        onSelectAssignee(index, assignee);
    }

    return (
        <div ref={dropBoxRef}>
            {task.isSelectedAssignee ? (
                <div className="flex justify-start items-center gap-[6px]" onClick={() => toggleDropdown(index)}>
                    <SmallUserImgIcon />
                    <span>{task.assignee?.label}</span>
                </div>
            ) : (
                <div className="flex justify-start items-center gap-[6px] text-n600 cursor-pointer" onClick={() => toggleDropdown(index)}>
                    <span>담당자 선택</span>
                    <CaretDownIcon />
                </div>
            )}
            {openDropdownIndex === index && (
                <div className="absolute right-0 z-10">
                    <ul className="w-[120px] bg-white border rounded shadow text-left">
                        {assigneeList.map((assignee) => (
                            <li
                                key={assignee.value}
                                className="h-[36px] px-3 py-2 hover:bg-n200 cursor-pointer"
                                onClick={() => {
                                    handleSelect(index, assignee);
                                    setOpenDropdownIndex(null);
                                }}
                            >
                                {assignee.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropbox;