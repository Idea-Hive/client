import { useState, useRef } from "react";
import { LooseValue } from "react-calendar/dist/shared/types.js";
import { CalendaBlankIcon } from "@/components/icons/icons";
import DatePicker from "@/components/DatePicker/DatePicker";
import { useClickOutside } from "@/hooks/hooks";
import { TableDateProps } from "../_types/Task";
import { format } from "date-fns";

const TableDatePicker = ({ task, index, onSelectDate }: TableDateProps) => {
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const [openDateIndex, setOpenDateIndex] = useState<number | null>(null);

    const datePickerRef = useRef<HTMLDivElement>(null);
    useClickOutside(datePickerRef, () => {
        setIsOpenDatePicker(false);
        setOpenDateIndex(null);
    });

    const handleDatePicker = (value: LooseValue) => {
        if (value === null) return;
        if (value instanceof Date) {
            console.log("value :: ", value);
            setOpenDateIndex(null);
            setIsOpenDatePicker(false);
            onSelectDate(index, value.toISOString());
        } else {
            return;
        }
    };

    return (
        <div ref={datePickerRef} className="cursor-pointer">
            {task.isSelectedDate ? (
                <div
                    onClick={() => {
                        setIsOpenDatePicker(!isOpenDatePicker);
                        setOpenDateIndex(index);
                    }}
                >
                    {task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd")}
                </div>
            ) : (
                <div
                    className="flex justify-center items-center gap-1 text-n600"
                    onClick={() => {
                        setIsOpenDatePicker(!isOpenDatePicker);
                        setOpenDateIndex(index);
                    }}
                >
                    <CalendaBlankIcon />
                    <span>기한 설정</span>
                </div>
            )}
            {openDateIndex === index && (
                <DatePicker
                    isRange={false}
                    onChange={handleDatePicker}
                    isOpen={isOpenDatePicker}
                    onClose={() => {
                        setIsOpenDatePicker(!isOpenDatePicker);
                        setOpenDateIndex(null);
                    }}
                    minDate={new Date()}
                />
            )}
        </div>
    );
};

export default TableDatePicker;