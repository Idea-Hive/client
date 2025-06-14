/**
[필수 과제]
- 디자인 시스템
- 디자인 파일 or URL

[선택 과제]
- 테스트 계획서
- 시스템 설계도
- 사용자 설정
 */

"use client";

import React, { useState } from "react";
import TaskSection from "../TaskSection";
import { Task } from "../../../_types/Task";

export default function Design() {
    const [requiredTasks, setRequiredTasks] = useState<Task[]>([
        {
            key: "D_1",
            title: "[디자인] 시스템",
            assignee: "홍길동",
            dueDate: "2025-02-20",
            isSelectedAssignee: true,
            isSelectedDate: true,
            isSubmittedFile: true,
        },
        {
            key: "D_2",
            title: "디자인 파일 or URL",
        },
    ]);

    const [optionalTasks, setOptionalTasks] = useState<Task[]>([
        {
            key: "D_3",
            title: "테스트 계획서",
        },
        {
            key: "D_4",
            title: "시스템 설계도",
        },
        {
            key: "D_5",
            title: "사용자 설정",
        },
    ]);

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
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">디자인</div>
            <TaskSection 
                title="필수 과제"
                tasks={requiredTasks}
                onDownloadTemplate={onDownloadTemplate} 
                onSelectAssignee={(index, assignee) => handleSelectAssignee("required", index, assignee)} 
                isRequired={true} />
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
