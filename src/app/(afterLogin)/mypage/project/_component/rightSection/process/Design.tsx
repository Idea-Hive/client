"use client";

import React, { useState, useEffect } from "react";
import { Task } from "../../../_types/Task";
import Button from "@/components/Button";
import { DownloadSimpleIcon, DownloadSimpleIconWhite } from "@/components/icons/icons";
import Table from "../../Table";

import { getTaskInfoByType } from "@/apis/project/manageApis";
import { useQuery } from "@tanstack/react-query";
import { useProjectStore } from "../../../store/manageStore";

export default function Design() {
    const projectId = useProjectStore((state) => state.projectId);
    const [requiredTasks, setRequiredTasks] = useState<Task[]>([
        { key: "D_1", title: "[디자인] 시스템" },
        { key: "D_2", title: "디자인 파일 or URL" },
    ]);

    const [optionalTasks, setOptionalTasks] = useState<Task[]>([
        { key: "D_3", title: "테스트 계획서" },
        { key: "D_4", title: "시스템 설계도" },
        { key: "D_5", title: "사용자 설정" },
    ]);

    /** 과제 불러오기 */
    const { data, isPending, isError } = useQuery({
        queryKey: [
            "getTasks",
            {
                projectId: projectId!,
                taskType: "DESIGN",
            },
        ],
        queryFn: getTaskInfoByType,
        enabled: !!projectId,
    });

    useEffect(() => {
        if (data) {
            const allTasks = [...data.requiredTasks, ...data.optionalTasks];
            const mappedTasks = allTasks.map((task, idx) => ({
                //isSubmitted, uploadDate
                key: `C_${idx}`,
                title: task.title,
                assignee: { label: task.pic, value: String(task.picId) },
                dueDate: task.dueDate,
                file: task.filePath,
                isSelectedAssignee: task.picId != null,
                isSelectedDate: task.dueDate != null,
                isSubmittedFile: task.filePath != null,
                isRequired: task.isRequired,
            }));
            console.log("mappedTasks:: ", mappedTasks);
            setRequiredTasks(mappedTasks.filter((t) => t.isRequired));
            setOptionalTasks(mappedTasks.filter((t) => !t.isRequired));
        }
    }, [data]);

    const [checkedIds, setCheckedIds] = useState<string[]>([]);
    const handleCheckedIdsFromTable = (checkedFromTable: string[], tableTasks: Task[]) => {
        const tableKeys = tableTasks.map((task) => task.key);
        setCheckedIds((prev) => [...prev.filter((id) => !tableKeys.includes(id)), ...checkedFromTable]);
    };
    const onDownloadTemplate = () => {
        const selectedTasks = [...requiredTasks, ...optionalTasks].filter((task) => checkedIds.includes(task.key));
        if (selectedTasks.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }
    };

    const handleSelectAssignee = (type: "required" | "optional", index: number, assignee: { label: string; value: string }) => {
        const update = (tasks: Task[]) => {
            const updated = [...tasks];
            updated[index] = {
                ...updated[index],
                assignee: { label: assignee.label, value: assignee.value},
                isSelectedAssignee: assignee.value !== "",
            };
            return updated;
        };

        if (type === "required") {
            setRequiredTasks(update(requiredTasks));
        } else {
            setOptionalTasks(update(optionalTasks));
        }
    };

    return (
        <div className="p-10">
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">디자인</div>

            <div className="mt-[40px] flex flex-col">
                <div className="flex justify-between items-end">
                    <div className="text-h3 text-n900">필수 과제</div>
                    <div className="flex gap-2">
                        <Button
                            label="선택 탬플릿"
                            onClick={onDownloadTemplate}
                            icLeft={
                                <div className="w-3 h-3">
                                    <DownloadSimpleIcon />
                                </div>
                            }
                            size="small"
                            btnType="line"
                        />
                        <Button label="전체 탬플릿" onClick={onDownloadTemplate} icLeft={<DownloadSimpleIconWhite />} size="small" btnType="primary" />
                    </div>
                </div>
                <Table
                    tasks={requiredTasks}
                    onSelectAssignee={(index, assignee) => handleSelectAssignee("required", index, assignee)}
                    checkedIds={checkedIds}
                    onCheck={(ids) => handleCheckedIdsFromTable(ids, requiredTasks)}
                />
            </div>

            <div className="mt-[40px] flex flex-col">
                <div className="flex justify-between items-end">
                    <div className="text-h3 text-n900">선택 과제</div>
                </div>
                <Table
                    tasks={optionalTasks}
                    onSelectAssignee={(index, assignee) => handleSelectAssignee("optional", index, assignee)}
                    checkedIds={checkedIds}
                    onCheck={(ids) => handleCheckedIdsFromTable(ids, optionalTasks)}
                />
            </div>
        </div>
    );
}
