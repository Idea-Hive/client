import { useQuery } from "@tanstack/react-query";
import { getTaskInfoByType } from "@/apis/project/manageApis";
import { useEffect, useState } from "react";
import type { Task } from "../_types/Task";
import { useParams } from "next/navigation";

type TaskType = "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";

interface UseTasksByTypeOptions {
    taskType: TaskType;
    defaultRequiredTasks?: Task[];
    defaultOptionalTasks?: Task[];
}

export const useTasksByType = ({ taskType, defaultRequiredTasks = [], defaultOptionalTasks = [] }: UseTasksByTypeOptions) => {
    const projectId = (useParams()?.projectId as string) || "";

    const [requiredTasks, setRequiredTasks] = useState<Task[]>(defaultRequiredTasks);
    const [optionalTasks, setOptionalTasks] = useState<Task[]>(defaultOptionalTasks);

    const { data, isPending, isError } = useQuery({
        queryKey: ["getTasks", { projectId: Number(projectId!), taskType }],
        queryFn: getTaskInfoByType,
        enabled: !!projectId,
    });

    useEffect(() => {
        if (data) {
            const allTasks = [...data.requiredTasks, ...data.optionalTasks];

            const mappedTasks = allTasks.map((task, idx) => ({
                key: `C_${idx}`,
                title: task.title,
                assignee: { label: task.pic, value: String(task.picId) },
                dueDate: task.dueDate ?? undefined,
                file: task.filePath ?? undefined,
                isSelectedAssignee: task.picId != null,
                isSelectedDate: task.dueDate != null,
                isSubmittedFile: task.filePath != null,
                isRequired: task.isRequired,
            }));

            setRequiredTasks([...defaultRequiredTasks, ...mappedTasks.filter((t) => t.isRequired)]);
            setOptionalTasks([...defaultOptionalTasks, ...mappedTasks.filter((t) => !t.isRequired)]);
        }
    }, [data]);

    return {
        requiredTasks,
        optionalTasks,
        setRequiredTasks,
        setOptionalTasks,
        isPending,
        isError,
    };
};
