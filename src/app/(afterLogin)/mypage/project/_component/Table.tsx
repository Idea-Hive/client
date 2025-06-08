import { useState } from "react";
import { TaskTableProps } from "../_types/Task";
import { FolderIcon, CalendaBlankIcon, UploadSimpleIcon } from "@/components/icons/icons";
import Dropbox from "./Dropbox";
import FileModal from "./FileModal";

const Table: React.FC<TaskTableProps> = ({ tasks, onSelectAssignee }) => {
    //파일 모달
    const [openFileModalIndex, setOpenFileModalIndex] = useState<number | null>(null);
    const openFileModal = (index: number) => {
        setOpenFileModalIndex(index);
    };
    return (
        <div className="mt-4 rounded border border-n400">
            <table className="w-full text-xs border-separate border-spacing-0">
                <thead className="bg-n50 text-center text-xsEmphasis">
                    <tr className="h-[42px]">
                        <th className="border-b pt-3 pb-3 rounded-tl-xl w-[64px]">선택</th>
                        <th className="border-b pt-3 pb-3 w-[74px]">Key</th>
                        <th className="border-b pt-3 pb-3 w-[243px]">과제</th>
                        <th className="border-b pt-3 pb-3 w-[120px]">담당자</th>
                        <th className="border-b pt-3 pb-3 w-[140px]">마감기한</th>
                        <th className="border-b pt-3 pb-3 rounded-tr-xl w-[158px]">제출</th>
                    </tr>
                </thead>
                <tbody className="bg-n0 text-sm">
                    {tasks.map((task, index) => (
                        <tr key={task.key} className={`border-t h-[42px] ${index === tasks.length - 1 ? "last-row" : ""}`}>
                            <td className={`p-3 text-center ${index === tasks.length - 1 ? "rounded-bl-xl" : "border-b"}`}>
                                <input type="checkbox" className="w-4 h-4 border-n400 cursor-pointer" />
                            </td>
                            <td className={`p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>{task.key}</td>
                            <td className={`p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>{task.title}</td>
                            <td className={`relative p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>
                                <Dropbox task={task} index={index} onSelectAssignee={onSelectAssignee} />
                            </td>
                            <td className={`p-3 text-center border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>
                                {task.isSelectedDate ? (
                                    task.dueDate
                                ) : (
                                    <div className="flex justify-center items-center gap-1 text-n600 cursor-pointer">
                                        <CalendaBlankIcon />
                                        <span>기한 설정</span>
                                    </div>
                                )}
                            </td>
                            <td className={`p-3 text-center border-l ${index === tasks.length - 1 ? "rounded-br-xl" : "border-b"}`}>
                                {task.isSubmittedFile ? (
                                    <div className="flex justify-center items-center gap-1" onClick={() => openFileModal(index)}>
                                        <FolderIcon />
                                        <span>제출완료</span>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center gap-1 text-n600 cursor-pointer" onClick={() => openFileModal(index)}>
                                        <UploadSimpleIcon />
                                        <span>제출하기</span>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* 모달 렌더링 부분 */}
            {openFileModalIndex !== null && <FileModal isOpen={true} onClose={() => setOpenFileModalIndex(null)} />}
        </div>
    );
};

export default Table;
