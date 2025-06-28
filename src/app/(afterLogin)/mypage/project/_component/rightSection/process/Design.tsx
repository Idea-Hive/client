"use client";

import React, { useState, useEffect } from "react";
import { AssigneeOption, Task } from "../../../_types/Task";
import Button from "@/components/Button";
import { DownloadSimpleIcon, DownloadSimpleIconWhite } from "@/components/icons/icons";
import Table from "../../Table";
import { useAssigneeUpdater, useTasksByType } from "../../../_hook/hook";
import { useParams } from "next/navigation";

export default function Design() {
    const projectId = (useParams()?.projectId as string) || ""; //path 용
    const { requiredTasks, optionalTasks, setRequiredTasks, setOptionalTasks } = useTasksByType({
        taskType: "DESIGN"
    });

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

    const { updateAssignee } = useAssigneeUpdater(projectId);
    const handleSelectAssignee = (type: "required" | "optional", index: number, assignee: AssigneeOption) => {
        updateAssignee(type, index, assignee, requiredTasks, optionalTasks, setRequiredTasks, setOptionalTasks);
    };

    return (
        <div className="p-10">
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">디자인</div>

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
