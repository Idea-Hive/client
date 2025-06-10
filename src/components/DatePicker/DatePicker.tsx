import moment from "moment";
import dynamic from "next/dynamic";
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
    isOpen: boolean;
}

export default function DatePicker({ isRange, defaultValue, onChange, isOpen }: DatePickerProps) {
    if (!isOpen) return null;

    return (
        <div className="calendar-wrapper">
            <Calendar formatDay={(locale, date) => moment(date).format("DD")} onChange={onChange} selectRange={isRange} defaultValue={defaultValue} />
        </div>
    );
}
