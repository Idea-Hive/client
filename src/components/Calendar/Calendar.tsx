import clsx from "clsx";

type CalendarEvent = {
    date: string; // 'YYYY-MM-DD'
    label: string;
    type?: "default" | "design" | "fe";
};

type CalendarProps = {
    year: number;
    month: number; // 1~12
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

function getEventColor(type?: string) {
    switch (type) {
        case "design":
            return "bg-blue-100 text-blue-500";
        case "fe":
            return "bg-orange-100 text-orange-400";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

export default function Calendar({ year, month, events = [] }: CalendarProps) {
    const days = getDaysArray(year, month);

    // 날짜별 이벤트 맵
    const eventMap: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
        eventMap[e.date] = eventMap[e.date] || [];
        eventMap[e.date].push(e);
    });

    return (
        <div className="bg-[#f7f9fb] p-4 rounded-lg">
            <table className="w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        {dayNames.map((d) => (
                            <th key={d} className="py-2 px-1 text-xs font-semibold text-gray-400 border border-[#e5e8ef] bg-[#f7f9fb]">
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
                                    cell.month === 12 && month === 1
                                        ? year - 1
                                        : cell.month === 1 && month === 12
                                        ? year + 1
                                        : cell.month === month
                                        ? year
                                        : cell.month < month
                                        ? month === 1
                                            ? year - 1
                                            : year
                                        : month === 12
                                        ? year + 1
                                        : year
                                }-${String(cell.month).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
                                return (
                                    <td key={i} className={clsx("align-top h-24 w-32 border border-[#e5e8ef] bg-white relative", !cell.isCurrentMonth && "bg-[#f7f9fb]")}>
                                        <div className={clsx("text-xs px-2 pt-2", cell.isCurrentMonth ? "text-gray-400" : "text-gray-300")}>{cell.day}</div>
                                        <div className="flex flex-col gap-1 px-2 mt-1">
                                            {eventMap[dateStr]?.map((ev, idx) => (
                                                <div key={idx} className={clsx("rounded px-1 py-0.5 text-xs whitespace-nowrap", getEventColor(ev.type))}>
                                                    {ev.label}
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
