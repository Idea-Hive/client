"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { DownloadSimpleIcon, DownloadSimpleIconWhite } from "@/components/icons/icons";
import Table from "./Table";
import { Task } from "../_types/Task";

export default function RightSection() {
    const [tasks, setTasks] = useState<Task[]>([ //일단 하드코딩
        {
            key: "D_1",
            title: "[디자인] 와이어프레임",
            assignee: "홍길동",
            dueDate: "2025-02-20",
            isSelectedAssignee: true,
            isSelectedDate: true, 
            isSubmittedFile: true
        },
        {
            key: "D_2",
            title: "[기획] 회의록 작성"
        },
    ]);
    //탬플릿 다운로드
    const onDownloadTemplate = () => {
        //TODO
    };

    const handleSelectAssignee = (index: number, assignee: { label: string; value: string }) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index],
            assignee: assignee.label, 
            isSelectedAssignee: !(assignee.value === "")
        };
        setTasks(updatedTasks);
    }

    return (
        <div className="width-[900px] m-10">
            <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">기획</div>
            <div className="mt-[32px] flex flex-col">
                <div>
                    <div className="flex justify-between items-end">
                        <div className="text-h3 text-n900">필수 과제</div>
                        <div className="flex gap-2">
                            <Button
                                label="선택 탬플릿"
                                onClick={() => onDownloadTemplate}
                                icLeft={
                                    <div className="w-3 h-3">
                                        <DownloadSimpleIcon />
                                    </div>
                                }
                                size="small"
                                btnType="line"
                            />
                            <Button label="전체 탬플릿" onClick={() => onDownloadTemplate} icLeft={<DownloadSimpleIconWhite />} size="small" btnType="primary" />
                        </div>
                    </div>
                    <Table tasks={tasks} onSelectAssignee={handleSelectAssignee}></Table>
                </div>
                <div className="mt-[40px] flex flex-col">
                    <div className="text-h3 text-n900">선택 과제</div>
                    {/* 테이블 */}
                </div>
            </div>            
        </div>
    );
}
