/**
 * [필수 과제]
- 프로젝트 제목(주제)
- 프로젝트 개요 문서(프로젝트 목표, 문제 정의 등)
- 요구사항 정의서
- WBS
- WireFrame
- Convention
- 화면정의서

[선택 과제]
- Flow Chart
- 사용자 페르소나
- 유스케이스 시나리오
- 유사 서비스 분석 자료
- 정보 구조도
- 사용자 설정
 */
"use client";

import React, { useState } from "react";
import TaskSection from "../TaskSection";
import { Task } from "../../../_types/Task";

export default function Plan() {
    const [requiredTasks, setRequiredTasks] = useState<Task[]>([
        { key: "P_1", title: "프로젝트 제목(주제)" },
        { key: "P_2", title: "프로젝트 개요 문서" },
        { key: "P_3", title: "요구사항 정의서" },
        { key: "P_4", title: "WBS" },
        { key: "P_5", title: "WireFrame" },
        { key: "P_6", title: "Convention" },
        { key: "P_7", title: "화면정의서" },
    ]);

    const [optionalTasks, setOptionalTasks] = useState<Task[]>([
        { key: "P_8", title: "Flow Chart" },
        { key: "P_9", title: "사용자 페르소나" },
        { key: "P_10", title: "유스케이스 시나리오" },
        { key: "P_11", title: "유사 서비스 분석 자료" },
        { key: "P_12", title: "정보 구조도" },
        { key: "P_13", title: "사용자 설정" },
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
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">기획</div>
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
