import React from "react";
import Button from "@/components/Button";
import { DownloadSimpleIcon, DownloadSimpleIconWhite } from "@/components/icons/icons";
import Table from "../Table";
import { Task } from "../../_types/Task";

interface TaskSectionProps {
    title: string;
    tasks: Task[];
    onDownloadTemplate: () => void;
    onSelectAssignee: (index: number, assignee: { label: string; value: string }) => void;
    isRequired?: boolean;
}

export default function TaskSection({ title, tasks, onDownloadTemplate, onSelectAssignee, isRequired = false }: TaskSectionProps) {
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
                        <Button label="전체 탬플릿" onClick={onDownloadTemplate} icLeft={<DownloadSimpleIconWhite />} size="small" btnType="primary" />
                    </div>
                )}
            </div>
            <Table tasks={tasks} onSelectAssignee={onSelectAssignee} />
        </div>
    );
}
