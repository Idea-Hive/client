import { getCalendarTasksApi, ProjectTasks } from "@/apis/project/projectApis";
import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import Calendar from "@/components/Calendar/Calendar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function CalendarContent() {
    const { user } = useUserInfo();
    const { projectId } = useParams();

    const { data: calendarTasksResponse } = useQuery({
        queryKey: ["calendarTasks", user?.id, Number(projectId)],
        queryFn: getCalendarTasksApi,
        enabled: !!user?.id && !!projectId,
    });

    // 현재 날짜 정보
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // calendarTasks에서 dueDate가 있고 이번 달인 데이터만 필터링
    const calendarEvents = useMemo(() => {
        if (!calendarTasksResponse) return [];

        // 모든 프로젝트 키(PLANNING, DESIGN, DEVELOPMENT, DEPLOY, COMPLETE)의 데이터를 수집
        const allTasks: any[] = [];

        Object.keys(calendarTasksResponse).forEach((projectIdKey) => {
            const calendarTasks: ProjectTasks = calendarTasksResponse[projectIdKey];

            // requiredTasks와 optionalTasks를 합쳐서 처리
            const projectTasks = [...calendarTasks.requiredTasks, ...calendarTasks.optionalTasks];
            allTasks.push(...projectTasks);
        });

        return allTasks
            .filter((task: any) => {
                if (!task.dueDate) return false;

                const dueDate = new Date(task.dueDate);
                const taskYear = dueDate.getFullYear();
                const taskMonth = dueDate.getMonth() + 1;

                return taskYear === currentYear && taskMonth === currentMonth;
            })
            .map((task: any) => ({
                date: task.dueDate.split("T")[0], // 'YYYY-MM-DD' 형식으로 변환
                label: task.title,
                type: task.taskType,
            }));
    }, [calendarTasksResponse, currentYear, currentMonth]);

    return (
        <div className="p-10">
            <div className="border-b border-n400 pb-4 text-h2 text-n900 mb-6">캘린더</div>
            <Calendar events={calendarEvents} />
        </div>
    );
}
