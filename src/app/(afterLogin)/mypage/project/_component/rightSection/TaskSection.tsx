
/** 일단 보류 => 필수,선택을 별도로 나눠서 쓸 필요가 있을까.. */
import React, {useState} from "react";
import Button from "@/components/Button";
import { DownloadSimpleIcon, DownloadSimpleIconWhite } from "@/components/icons/icons";
import Table from "../Table";
import { Task } from "../../_types/Task";

interface TaskSectionProps {
    title: string;
    tasks: Task[];
    onDownloadTemplate: () => void;
    onSelectAssignee: (index: number, assignee: { label: string; value: string }) => void;
    onCheck: (indexs: string[]) => void;
    isRequired?: boolean;
}

export default function TaskSection({ title, tasks, onDownloadTemplate, onSelectAssignee, onCheck, isRequired = false }: TaskSectionProps) {
    return (
        <div className="mt-[40px] flex flex-col">
            <div className="flex justify-between items-end">
                <div className="text-h3 text-n900">{title}</div>
                {isRequired && (
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
                    </div>
                )}
            </div>
            {/* <Table tasks={tasks} onSelectAssignee={onSelectAssignee} checkedIds={} onCheck={onCheck}/> */}
        </div>
    );
}