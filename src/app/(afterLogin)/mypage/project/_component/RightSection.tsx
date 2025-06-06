"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { DownloadSimpleIcon, DownloadSimpleIconWhite } from "@/components/icons/icons";
import Table from "./Table";
import FileModal from "./FileModal";

export default function RightSection() {
    //담당자 드롭박스
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const toggleDropdown = (index: number) => {
        setOpenDropdownIndex((prev) => (prev === index ? null : index));
    };

    //파일 모달
    const [openFileModalIndex, setOpenFileModalIndex] = useState<number | null>(null);
    const openFileModal = (index: number) => {
        setOpenFileModalIndex(index);
    };

    //탬플릿 다운로드
    const onDownloadTemplate = () => {
        //TODO
    };

    //일단 하드코딩
    const tasks = [
        {
            key: "D_1",
            title: "[디자인] 와이어프레임",
            assignee: "홍길동",
            dueDate: "2025-02-20",
            submitted: true,
            isEditable: false,
        },
        {
            key: "D_2",
            title: "[기획] 회의록 작성",
            isEditable: true,
        },
    ];

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
                    <Table tasks={tasks} onToggleAssignee={toggleDropdown} openDropdownIndex={openDropdownIndex} onOpenFileModal={openFileModal}></Table>
                </div>
                <div className="mt-[40px] flex flex-col">
                    <div className="text-h3 text-n900">선택 과제</div>
                    {/* 테이블 */}
                </div>
            </div>
            {/* 모달 렌더링 부분 */}
            {openFileModalIndex !== null && <FileModal isOpen={true} onClose={() => setOpenFileModalIndex(null)} />}
        </div>
    );
}
