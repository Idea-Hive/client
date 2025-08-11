import { useClickOutside } from "@/hooks/hooks";
import moment from "moment";
import dynamic from "next/dynamic";
import { useRef } from "react";
import "react-calendar/dist/Calendar.css";
import { LooseValue } from "react-calendar/dist/shared/types.js";
import "./DatePicker.css";

const Calendar = dynamic(() => import("react-calendar"), {
    ssr: false,
});

interface DatePickerProps {
    isRange: boolean;
    defaultValue?: LooseValue;
    onChange: (value: LooseValue) => void;
    onClose?: () => void;
    isOpen: boolean;
    minDate?: Date;
}

export default function DatePicker({ isRange, defaultValue, onChange, isOpen, onClose, minDate }: DatePickerProps) {
    const calendarRef = useRef<HTMLDivElement>(null);
    useClickOutside(calendarRef, () => {
        if (isOpen) onClose?.();
    });

    if (!isOpen) return null;

    return (
        <div className="calendar-wrapper" ref={calendarRef}>
            <Calendar formatDay={(locale, date) => moment(date).format("DD")} onChange={onChange} selectRange={isRange} defaultValue={defaultValue} minDate={minDate} />
        </div>
    );
}
