import Checkbox from "@/components/Checkbox";
import { FolderIcon, UploadSimpleIcon } from "@/components/icons/icons";
import { useState } from "react";
import { useTeamStore } from "../_store/teamStore";
import { TaskTableProps } from "../_types/Task";
import FileModal from "./FileModal";
import TableDatePicker from "./TableDatePicker";
import Dropbox from "./TableDropbox";

const Table: React.FC<TaskTableProps> = ({ projectId, taskType, tasks, onSelectAssignee, onSelectDate, onSubmitLink, checkedIds = [], onCheck }) => {
    console.log("tasks :: ", tasks);
    //담당자
    const { members } = useTeamStore();

    //체크박스
    const handleCheckBox = (key: string) => {
        const next = checkedIds.includes(key) ? checkedIds.filter((i) => i !== key) : [...checkedIds, key];
        onCheck(next);
    };
    const handleCheckAll = () => {
        //필수, 선택 2개의 테이블이 한 화면에서 나타나기 때문에 taskKey들을 확인해야 함.
        const taskKeys = tasks.map((task) => task.key);
        const isAllChecked = taskKeys.every((key) => checkedIds.includes(key));

        if (isAllChecked) {
            onCheck([]);
        } else {
            onCheck(taskKeys);
        }
    };

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
                        <th className="border-b pt-3 pb-3 rounded-tl-xl w-[64px]">
                            <Checkbox checked={tasks.length > 0 && tasks.every((task) => checkedIds.includes(task.key))} value="all" onClick={handleCheckAll} inTable={true} />
                        </th>
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
                                <Checkbox checked={checkedIds.includes(task.key)} value="1" onClick={() => handleCheckBox(task.key)} inTable={true} />
                            </td>
                            <td className={`p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>{task.key}</td>
                            <td className={`p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>{task.title}</td>
                            <td className={`relative p-3 border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>
                                <Dropbox
                                    task={task}
                                    index={task.id}
                                    assigneeList={[...(members?.map((item) => ({ label: item.name, value: String(item.id), profileUrl: item.profileUrl })) ?? [])]}
                                    onSelectAssignee={onSelectAssignee}
                                />
                            </td>
                            <td className={`p-3 text-center border-l ${index === tasks.length - 1 ? "" : "border-b"}`}>
                                <TableDatePicker task={task} index={task.id} onSelectDate={onSelectDate}></TableDatePicker>
                            </td>
                            <td className={`p-3 text-center border-l ${index === tasks.length - 1 ? "rounded-br-xl" : "border-b"}`}>
                                {task.isSubmittedContent ? (
                                    <div className="flex justify-center items-center gap-1 cursor-pointer" onClick={() => openFileModal(index)}>
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
            {openFileModalIndex !== null && (
                <FileModal
                    isOpen={true}
                    onClose={() => setOpenFileModalIndex(null)}
                    taskId={tasks[openFileModalIndex].id}
                    onSuccess={onSubmitLink}
                    originLink={tasks[openFileModalIndex].attachedLink}
                    originFileName={tasks[openFileModalIndex].file}
                    originFileUploadLink={tasks[openFileModalIndex].fileUploadLink}
                    projectId={projectId}
                    taskType={taskType}
                />
            )}
        </div>
    );
};

export default Table;
