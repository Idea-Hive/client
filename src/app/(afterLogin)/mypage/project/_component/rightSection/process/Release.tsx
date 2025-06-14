"use client";

import React, { useState } from "react";
import TaskSection from "../TaskSection";
import { Task } from "../../../_types/Task";

export default function Release() {
    const [requiredTasks, setRequiredTasks] = useState<Task[]>([{ key: "R_1", title: "배포 환경 구성 문서" }]);
    const [optionalTasks, setOptionalTasks] = useState<Task[]>([{ key: "R_2", title: "사용자 설정" }]);
    const onDownloadTemplate = () => {
        // TODO: 템플릿 다운로드 로직
    };

    const handleSelectAssignee = (type: "required" | "optional", index: number, assignee: { label: string; value: string }) => {
        const update = (tasks: Task[]) => {
            const updated = [...tasks];
            updated[index] = {
                ...updated[index],
                assignee: assignee.label,
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
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">배포</div>
            <TaskSection
                title="필수 과제"
                tasks={requiredTasks}
                onDownloadTemplate={onDownloadTemplate}
                onSelectAssignee={(index, assignee) => handleSelectAssignee("required", index, assignee)}
                isRequired={true}
            />
            <TaskSection
                title="선택 과제"
                tasks={optionalTasks}
                onDownloadTemplate={() => {}}
                onSelectAssignee={(index, assignee) => handleSelectAssignee("optional", index, assignee)}
                isRequired={false}
            />
        </div>
    );
}
