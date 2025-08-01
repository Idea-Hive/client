"use client";

import { onUpdateDueDate } from "@/apis/project/manageApis";
import Button from "@/components/Button";
import { DownloadSimpleIcon } from "@/components/icons/icons";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAssigneeUpdater, useTasksByType } from "../../../_hook/hook";
import { AssigneeOption, Task } from "../../../_types/Task";
import Table from "../../Table";

export default function Complete() {
    const projectId = (useParams()?.projectId as string) || ""; //path 용
    const { requiredTasks, optionalTasks, setRequiredTasks, setOptionalTasks } = useTasksByType({
        taskType: "COMPLETE",
    });

    //체크박스
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

    //담당자
    const { updateAssignee } = useAssigneeUpdater(projectId);
    const handleSelectAssignee = (type: "required" | "optional", index: number, assignee: AssigneeOption) => {
        updateAssignee(type, index, assignee, requiredTasks, optionalTasks, setRequiredTasks, setOptionalTasks);
    };

    //마감기한
    const { mutate } = useMutation({
        mutationFn: onUpdateDueDate,
    });
    const handleSelectDate = (index: number, value: string) => {
        mutate(
            { taskId: index, dueDate: value },
            {
                onSuccess: () => {
                    const update = (tasks: Task[]) =>
                        tasks.map((item) =>
                            item.id === index
                                ? {
                                      ...item,
                                      dueDate: value,
                                      isSelectedDate: true,
                                  }
                                : item
                        );
                    setRequiredTasks((prev) => update(prev));
                    setOptionalTasks((prev) => update(prev));
                    console.log("완료");
                },
                onError: () => {
                    console.error("실패");
                },
            }
        );
    };

    //파일/링크 제출
    const handleContentsSuccess = (index: number, updates?: object) => {
        //파일/링크 제출에 성공한 taskId
        const update = (tasks: Task[]) => tasks.map((item) => (item.id === index ? { ...item, ...updates } : item));
        setRequiredTasks((prev) => update(prev));
        setOptionalTasks((prev) => update(prev));
    };

    return (
        <div className="p-10">
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">완료</div>

            <div className="mt-[40px] flex flex-col">
                <div className="flex justify-between items-end">
                    <div className="text-h3 text-n900">필수 과제</div>
                    <Button
                        label="탬플릿 다운로드"
                        onClick={onDownloadTemplate}
                        icLeft={
                            <div className="w-3 h-3">
                                <DownloadSimpleIcon />
                            </div>
                        }
                        size="small"
                        btnType="line"
                    />
                </div>
                <Table
                    tasks={requiredTasks}
                    onSelectAssignee={(index, assignee) => handleSelectAssignee("required", index, assignee)}
                    onSelectDate={(index, value) => handleSelectDate(index, value)}
                    onSubmitLink={(index, updateFields) => handleContentsSuccess(index, updateFields)}
                    checkedIds={checkedIds}
                    onCheck={(ids) => handleCheckedIdsFromTable(ids, requiredTasks)}
                    projectId={projectId}
                    taskType="COMPLETE"
                />
            </div>

            <div className="mt-[40px] flex flex-col">
                <div className="flex justify-between items-end">
                    <div className="text-h3 text-n900">선택 과제</div>
                </div>
                <Table
                    tasks={optionalTasks}
                    onSelectAssignee={(index, assignee) => handleSelectAssignee("optional", index, assignee)}
                    onSelectDate={(index, value) => handleSelectDate(index, value)}
                    onSubmitLink={(index, updateFields) => handleContentsSuccess(index, updateFields)}
                    checkedIds={checkedIds}
                    onCheck={(ids) => handleCheckedIdsFromTable(ids, optionalTasks)}
                    projectId={projectId}
                    taskType="COMPLETE"
                />
            </div>
        </div>
    );
}
