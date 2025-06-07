interface Task {
    key: string;
    title: string;
    assignee?: string;
    dueDate?: string;
    submitted?: boolean;  //제출 완료 여부
    isEditable?: boolean; //담당자, 마감기한, 제출 수정 시
}

interface TaskTableProps {
    tasks: Task[];
    onToggleAssignee?: (index: number) => void; //드롭박스 event handler
    openDropdownIndex?: number | null;          //드롭박스 행 idx
    onOpenFileModal?: (index: number) => void;  //파일모달 event handler
}

import { FolderIcon, SmallUserImgIcon, CaretDownIcon, CalendaBlankIcon, UploadSimpleIcon
} from "@/components/icons/icons";

const Table: React.FC<TaskTableProps> = ({ tasks, onToggleAssignee, openDropdownIndex, onOpenFileModal}) => {
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
                                <input type="checkbox" className="w-4 h-4 border-n400"/>
                            </td>
                            <td className={`p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>{task.key}</td>
                            <td className={`p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>{task.title}</td>
                            <td className={`relative p-3 border-l text-center ${index === tasks.length - 1 ? "" : "border-b"}`}>
                                {task.isEditable ? (
                                    <div className="flex justify-center items-center gap-1 text-n600 cursor-pointer" onClick={() => onToggleAssignee?.(index)}>
                                        <span>담당자 선택</span>
                                        <CaretDownIcon />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center gap-1">
                                        <SmallUserImgIcon />
                                        <span>{task.assignee}</span>
                                    </div>
                                )}
                                {openDropdownIndex === index && (
                                    <div className="absolute right-0 z-10">
                                        <ul className="w-[120px] bg-white border rounded shadow text-left">
                                            <li className="h-[36px] px-3 py-2 hover:bg-n200">이서연</li>
                                            <li className="h-[36px] px-3 py-2 hover:bg-n200">홍길동</li>
                                        </ul>
                                    </div>
                                )}
                            </td>
                            <td className={`p-3 text-center border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>
                                {task.isEditable ? (
                                    <div className="flex justify-center items-center gap-1 text-n600 cursor-pointer">
                                        <CalendaBlankIcon />
                                        <span>기한 설정</span>
                                    </div>
                                ) : (
                                    task.dueDate
                                )}
                            </td>
                            <td className={`p-3 text-center border-l ${index === tasks.length - 1 ? "rounded-br-xl" : "border-b"}`}>
                                {task.isEditable ? (
                                    <div className="flex justify-center items-center gap-1 text-n600 cursor-pointer" onClick={() => onOpenFileModal?.(index)}>
                                        <UploadSimpleIcon />
                                        <span>제출하기</span>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center gap-1">
                                        <FolderIcon />
                                        <span>{task.submitted ? "제출완료" : "미제출???"}</span>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;