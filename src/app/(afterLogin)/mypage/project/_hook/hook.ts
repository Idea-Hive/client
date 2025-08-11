import { getMyProjectInfo, getTaskInfoByType, getTeamMemberList, onUpdateManager } from "@/apis/project/manageApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTeamStore } from "../_store/teamStore";
import type { AssigneeOption, Task } from "../_types/Task";
type TaskType = "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";

export const useTasksByType = ({ taskType }: { taskType: TaskType }) => {
    const projectId = (useParams()?.projectId as string) || "";

    const [requiredTasks, setRequiredTasks] = useState<Task[]>([]);
    const [optionalTasks, setOptionalTasks] = useState<Task[]>([]);

    const { data, isPending, isError } = useQuery({
        queryKey: ["getTasks", { projectId: Number(projectId!), taskType }],
        queryFn: getTaskInfoByType,
        enabled: !!projectId,
        staleTime: 0, // 항상 최신 데이터를 가져오도록 설정
        refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 리페치
    });

    useEffect(() => {
        if (data) {
            const allTasks = [...data.requiredTasks, ...data.optionalTasks];

            let prefix = "";
            switch (taskType) {
                case "PLANNING":
                    prefix = "P";
                    break;
                case "DESIGN":
                    prefix = "D";
                    break;
                case "DEVELOP":
                    prefix = "DEV";
                    break;
                case "DEPLOY":
                    prefix = "R";
                    break;
                case "COMPLETE":
                    prefix = "C";
                    break;
            }

            const mappedTasks = allTasks.map((task, idx) => ({
                id: task.id, //taskId number
                key: `${prefix}_${idx}`,
                title: task.title,
                assignee: { label: task.pic, value: String(task.picId) },
                dueDate: task.dueDate ?? undefined,
                attachedLink: task.attachedLink ?? undefined,
                file: task.originalFileName ?? undefined,
                fileUploadLink: task.fileUploadLink ?? undefined,
                isSelectedAssignee: task.picId != null,
                isSelectedDate: task.dueDate != null,
                isSubmittedContent: !!task.originalFileName || !!task.attachedLink,
                isRequired: task.isRequired,
            }));

            setRequiredTasks(mappedTasks.filter((item) => item.isRequired));
            setOptionalTasks(mappedTasks.filter((item) => !item.isRequired));
        }
    }, [data, taskType]);

    return {
        requiredTasks,
        optionalTasks,
        setRequiredTasks,
        setOptionalTasks,
        isPending,
        isError,
    };
};

//내 프로젝트 조회 + 내 팀원 조회
export const useInitialProjectWithTeam = () => {
    const setMembers = useTeamStore((state) => state.setMembers);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const {
        data: myProjects,
        isPending: projectPending,
        isError: projectError,
    } = useQuery({
        queryKey: ["getMyProjects", { page: 1 }],
        queryFn: getMyProjectInfo,
    });

    // 첫 번째 프로젝트 자동 선택
    useEffect(() => {
        if (myProjects?.totalCnt && myProjects.projects.length > 0) {
            const first = myProjects.projects[0].id;
            setSelectedProjectId(first);
        }
    }, [myProjects]);

    const {
        data: teamMembers,
        isPending: memberPending,
        isError: memberError,
    } = useQuery({
        queryKey: ["getTeamMembers", { id: selectedProjectId! }],
        queryFn: getTeamMemberList,
        enabled: !!selectedProjectId,
    });

    useEffect(() => {
        if (selectedProjectId && teamMembers) {
            setMembers(teamMembers);
        }
    }, [selectedProjectId, teamMembers]);

    return {
        projectId: String(selectedProjectId),
        myProjects,
        teamMembers,
        loading: projectPending || memberPending,
        error: projectError || memberError,
    };
};

export const useProjectWithTeam = (projectId?: string) => {
    const setMembers = useTeamStore((state) => state.setMembers);

    const {
        data: myProjects,
        isPending: projectPending,
        isError: projectError,
    } = useQuery({
        queryKey: ["getMyProjects", { page: 1 }],
        queryFn: getMyProjectInfo,
    });

    const {
        data: teamMembers,
        isPending: memberPending,
        isError: memberError,
    } = useQuery({
        queryKey: ["getTeamMembers", { id: Number(projectId)! }],
        queryFn: getTeamMemberList,
        enabled: !!projectId,
    });

    useEffect(() => {
        if (projectId && teamMembers) {
            setMembers(teamMembers);
        }
    }, [projectId, teamMembers]);

    return {
        projectId,
        myProjects,
        teamMembers,
        loading: projectPending || memberPending,
        error: projectError || memberError,
    };
};

// 담당자 선택 + 상태 업데이트 + 서버 호출
export const useAssigneeUpdater = (projectId: string) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: onUpdateManager,
        onSuccess: () => {
            console.log("업데이트 성공");
            // 담당자 업데이트 성공 후 관련 쿼리들 무효화
            queryClient.invalidateQueries({
                queryKey: ["getTasks"],
            });
        },
        onError: () => {
            console.log("업데이트 실패");
        },
    });

    const updateAssignee = (
        type: "required" | "optional",
        index: number, // taskId
        assignee: AssigneeOption,
        requiredTasks: Task[],
        optionalTasks: Task[],
        setRequiredTasks: (tasks: Task[]) => void,
        setOptionalTasks: (tasks: Task[]) => void
    ) => {
        const update = (tasks: Task[]) =>
            tasks.map((item) =>
                item.id === index
                    ? {
                          ...item,
                          assignee,
                          isSelectedAssignee: assignee.value !== "",
                      }
                    : item
            );

        if (type === "required") {
            setRequiredTasks(update(requiredTasks));
        } else {
            setOptionalTasks(update(optionalTasks));
        }

        mutate({
            taskId: index,
            projectId: Number(projectId),
            memberId: Number(assignee.value),
        });
    };

    return { updateAssignee };
};
