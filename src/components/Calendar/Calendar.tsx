import { CalendarTaskType } from "@/app/(afterLogin)/mypage/project/_component/rightSection/manage/_api/apis";
import clsx from "clsx";
import { useState } from "react";
import Selectbox from "../Selectbox";

type CalendarEvent = {
    date: string; // 'YYYY-MM-DD'
    label: string;
    type?: CalendarTaskType;
};

type CalendarProps = {
    year?: number;
    month?: number; // 1~12
    events?: CalendarEvent[];
};

const dayNames = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];

type CalendarCell = {
    day: number;
    month: number;
    isCurrentMonth: boolean;
};

function getDaysArray(year: number, month: number): CalendarCell[] {
    // month: 1~12
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    // 이전 달 정보
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevLastDay = new Date(prevYear, prevMonth, 0).getDate();

    // 다음 달 정보
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    const days: CalendarCell[] = [];

    // 이전 달 마지막 주 빈칸 채우기
    let prevDays = (firstDay.getDay() + 6) % 7; // 월요일 시작
    for (let i = prevLastDay - prevDays + 1; i <= prevLastDay; i++) {
        days.push({ day: i, month: prevMonth, isCurrentMonth: false });
    }

    // 이번 달 날짜
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push({ day: d, month, isCurrentMonth: true });
    }

    // 다음 달 첫 주 빈칸 채우기
    let nextDay = 1;
    while (days.length % 7 !== 0) {
        days.push({ day: nextDay++, month: nextMonth, isCurrentMonth: false });
    }

    return days;
}

function getEventColor(type?: CalendarTaskType) {
    switch (type) {
        case "PLANNING":
            return "bg-[#FDEEF9] text-[#ED55C2]";
        case "DESIGN":
            return "bg-[#0085FF]/10 text-[#0085FF]";
        case "DEVELOP":
            return "bg-[#FFF4E8] text-[#FF9F2D]";
        case "DEPLOY":
            return "bg-[#F4EEFD] text-[#8F59EF]";
        case "COMPLETE":
            return "bg-[#E1F8EF] text-[#43B286]";
        default:
            return "bg-[#E1F8EF] text-[#43B286]";
    }
}

export default function Calendar({ year: initialYear, month: initialMonth, events = [] }: CalendarProps) {
    const [currentYear, setCurrentYear] = useState(initialYear || new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date().getMonth() + 1);

    const days = getDaysArray(currentYear, currentMonth);

    // 날짜별 이벤트 맵
    const eventMap: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
        eventMap[e.date] = eventMap[e.date] || [];
        eventMap[e.date].push(e);
    });

    const handlePreviousMonth = () => {
        if (currentMonth === 1) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(12);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentYear(today.getFullYear());
        setCurrentMonth(today.getMonth() + 1);
    };

    const [filter, setFilter] = useState<CalendarTaskType | "all">("all");
    const filterOptions = [
        { label: "전체", value: "all" },
        { label: "기획", value: "PLANNING" },
        { label: "디자인", value: "DESIGN" },
        { label: "개발", value: "DEVELOP" },
        { label: "배포", value: "DEPLOY" },
        { label: "완료", value: "COMPLETE" },
    ];
    const handleFilterChange = (value: CalendarTaskType | "all") => {
        setFilter(value);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-1.5">
                        <div className="w-9 h-8 rounded border border-n500 flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={handlePreviousMonth}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.3537 12.646C10.4001 12.6925 10.437 12.7476 10.4621 12.8083C10.4872 12.869 10.5002 12.9341 10.5002 12.9998C10.5002 13.0655 10.4872 13.1305 10.4621 13.1912C10.437 13.2519 10.4001 13.3071 10.3537 13.3535C10.3072 13.4 10.252 13.4368 10.1914 13.462C10.1307 13.4871 10.0656 13.5001 9.99991 13.5001C9.93421 13.5001 9.86915 13.4871 9.80846 13.462C9.74776 13.4368 9.69261 13.4 9.64615 13.3535L4.64615 8.35354C4.59967 8.3071 4.56279 8.25196 4.53763 8.19126C4.51246 8.13056 4.49951 8.0655 4.49951 7.99979C4.49951 7.93408 4.51246 7.86902 4.53763 7.80832C4.56279 7.74762 4.59967 7.69248 4.64615 7.64604L9.64615 2.64604C9.73998 2.55222 9.86722 2.49951 9.99991 2.49951C10.1326 2.49951 10.2598 2.55222 10.3537 2.64604C10.4475 2.73986 10.5002 2.86711 10.5002 2.99979C10.5002 3.13247 10.4475 3.25972 10.3537 3.35354L5.70678 7.99979L10.3537 12.646Z"
                                    fill="#474D66"
                                />
                            </svg>
                        </div>
                        <div className="text-n900 text-lg leading-6 font-medium">
                            {currentYear}년 {String(currentMonth).padStart(2, "0")}월
                        </div>
                        <div className="w-9 h-8 rounded border border-n500 flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={handleNextMonth}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.3538 8.35354L6.35378 13.3535C6.30733 13.4 6.25218 13.4368 6.19148 13.462C6.13079 13.4871 6.06573 13.5001 6.00003 13.5001C5.93434 13.5001 5.86928 13.4871 5.80859 13.462C5.74789 13.4368 5.69274 13.4 5.64628 13.3535C5.59983 13.3071 5.56298 13.2519 5.53784 13.1912C5.5127 13.1305 5.49976 13.0655 5.49976 12.9998C5.49976 12.9341 5.5127 12.869 5.53784 12.8083C5.56298 12.7476 5.59983 12.6925 5.64628 12.646L10.2932 7.99979L5.64628 3.35354C5.55246 3.25972 5.49976 3.13247 5.49976 2.99979C5.49976 2.86711 5.55246 2.73986 5.64628 2.64604C5.7401 2.55222 5.86735 2.49951 6.00003 2.49951C6.13272 2.49951 6.25996 2.55222 6.35378 2.64604L11.3538 7.64604C11.4003 7.69248 11.4372 7.74762 11.4623 7.80832C11.4875 7.86902 11.5004 7.93408 11.5004 7.99979C11.5004 8.0655 11.4875 8.13056 11.4623 8.19126C11.4372 8.25196 11.4003 8.3071 11.3538 8.35354Z"
                                    fill="#474D66"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="px-3 h-8 text-n800 text-smEmphasize rounded border border-n500 flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={handleToday}>
                        오늘
                    </div>
                </div>

                <div className="w-[100px]">
                    <Selectbox options={filterOptions} initialValue="all" className="!h-10" onChange={(value) => handleFilterChange(value as CalendarTaskType | "all")} />
                </div>
            </div>

            <table className="w-full border-collapse border-spacing-0 rounded-md">
                <thead>
                    <tr>
                        {dayNames.map((d, i) => (
                            <th key={d} className={`p-2 text-xsEmphasize text-n800 border border-n400 bg-n50 text-start ${i === 0 ? "rounded-ss-md" : ""} ${i === 6 ? "rounded-se-md" : ""}`}>
                                {d}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: days.length / 7 }).map((_, weekIdx) => (
                        <tr key={weekIdx}>
                            {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((cell, i) => {
                                const dateStr = `${
                                    cell.month === 12 && currentMonth === 1
                                        ? currentYear - 1
                                        : cell.month === 1 && currentMonth === 12
                                        ? currentYear + 1
                                        : cell.month === currentMonth
                                        ? currentYear
                                        : cell.month < currentMonth
                                        ? currentMonth === 1
                                            ? currentYear - 1
                                            : currentYear
                                        : currentMonth === 12
                                        ? currentYear + 1
                                        : currentYear
                                }-${String(cell.month).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
                                return (
                                    <td key={i} className={clsx("align-top h-[128px] w-32 border border-n400 bg-white relative p-2", !cell.isCurrentMonth && "bg-[#f7f9fb]")}>
                                        <div className={clsx("text-sm", cell.isCurrentMonth ? "text-n800" : "text-n600")}>{cell.day}</div>
                                        <div className="flex flex-col justify-end gap-1 mt-1 h-[86px]">
                                            {eventMap[dateStr]
                                                ?.filter((ev) => (filter === "all" ? true : ev.type === filter))
                                                ?.slice(0, 3)
                                                ?.map((ev, idx) => (
                                                    <div key={idx} className={clsx("rounded px-1 py-0.5 text-xs cursor-pointer", getEventColor(ev.type))} title={ev.label}>
                                                        [{filterOptions.find((f) => f.value === ev.type)?.label}] {ev.label.length > 5 ? ev.label.slice(0, 5) + "..." : ev.label}
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
