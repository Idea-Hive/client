/**
 * isOpen: 모달 열림 여부
 * onClose: 모달 닫기 이벤트
 * isLinkType: 링크 방식 여부
 * isFileType: 파일 방식 여부
 **/
import { FileUploadRequest, onUploadFile, onUploadLink, UpdateLinkRequest } from "@/apis/project/manageApis";
import Button from "@/components/Button";
import { CloseIcon, DownloadSimpleIcon, LinkSimpleIcon, PlusCircleIcon } from "@/components/icons/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Task } from "../_types/Task";

interface FileModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskId: number;
    onSuccess: (taskId: number, updates?: Partial<Task>) => void;
    originLink?: string | null;
    originFileName?: string | null;
    originFileUploadLink?: string | null;
    projectId: string;
    taskType: "PLANNING" | "DESIGN" | "DEVELOP" | "DEPLOY" | "COMPLETE";
}

const FileModal: React.FC<FileModalProps> = ({ isOpen, onClose, taskId, onSuccess, originLink, originFileName, originFileUploadLink, projectId, taskType }) => {
    const queryClient = useQueryClient();

    /** 링크/파일 제출 버튼 토글 */
    const [isLinkType, setIsLinkType] = useState(!!originLink);
    const [isFileType, setIsFileType] = useState(!!originFileName);
    const toggleLinkButton = () => setIsLinkType((prev) => !prev);
    const toggleFileButton = () => setIsFileType((prev) => !prev);
    const [linkName, setLinkName] = useState(originLink ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState(originFileName ?? null);
    const [fileLink, setFileLink] = useState(originFileUploadLink ?? null);

    //링크 업로드
    const { mutate } = useMutation({
        mutationFn: (data: UpdateLinkRequest) => onUploadLink(data),
        onSuccess: (data) => {
            console.log("link upload data :: ", data);
            //성공 시, 부모에게 업로드한 내역 보내기
            onSuccess(taskId, {
                isSubmittedContent: true,
                attachedLink: linkName,
            });
            queryClient.invalidateQueries({ queryKey: ["getTaskInfoByType", { projectId: Number(projectId), taskType }] });
            onClose();
            console.log("제출함");
        },
        onError: (error) => {
            console.error("link upload error :: ", error);
            alert("제출에 실패했습니다.");
        },
    });

    //파일 업로드
    const { mutate: uploadFileMutate } = useMutation({
        mutationFn: (req: FileUploadRequest) => onUploadFile(req),
        onSuccess: (data) => {
            console.log("file upload data :: ", data);
            //성공 시, 부모에게 업로드한 내역 보내기
            onSuccess(taskId, {
                isSubmittedContent: true,
                file: file?.name,
            }); // 부모에게 성공 알림
            queryClient.invalidateQueries({ queryKey: ["getTaskInfoByType", { projectId: Number(projectId), taskType }] });
            onClose(); // 모달 닫기
            console.log("업로드 성공");
        },
        onError: (error) => {
            console.error("file upload error :: ", error);
            alert("업로드에 실패했습니다.");
        },
    });

    const handleSubmit = () => {
        console.log("handleSubmit Request:::", taskId, linkName, file, fileName);
        if (linkName) {
            mutate({ taskId, attachedLink: linkName });
        }

        if (file) {
            uploadFileMutate({ file, taskId });
        } else if (fileName) {
            onSuccess(taskId, {
                isSubmittedContent: true,
            });
            onClose();
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="relative w-[420px] shadow-elavation1 bg-white rounded-xl p-6">
                <div className="flex gap-6">
                    <h2 className="text-lg leading-6 font-medium mb-2 min-w-80">파일/링크 제출</h2>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="mt-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        {isLinkType && <LinkInput linkName={linkName} setLinkName={setLinkName} />}
                        {isFileType && <FileInput file={file} setFile={setFile} originFileName={fileName ?? null} fileLink={fileLink} />}
                    </div>
                    <div className="flex gap-2">
                        <Button className="flex-1" label="링크 업로드" icLeft={<LinkSimpleIcon />} size="medium" btnType="line" onClick={() => toggleLinkButton()} />
                        <Button className="flex-1" label="파일 업로드" icLeft={<PlusCircleIcon />} size="medium" btnType="line" onClick={() => toggleFileButton()} />
                    </div>
                </div>
                <Button className="mt-6 w-full" label="제출" onClick={handleSubmit} size="large" btnType="primary" />
            </div>
        </div>
    );
};

interface LinkInputProps {
    linkName: string;
    setLinkName: (value: string) => void;
}
const LinkInput: React.FC<LinkInputProps> = ({ linkName, setLinkName }) => {
    /** 링크 */
    const linkInputRef = useRef<HTMLInputElement | null>(null);
    const [linkError, setLinkError] = useState("");

    const handleCopy = () => {
        const value = linkInputRef.current?.value;
        if (value) {
            navigator.clipboard
                .writeText(value)
                .then(() => console.log("복사 됨."))
                .catch(() => console.log("복사 안됨."));
        }
    };

    const handleLinkDelete = () => {
        setLinkName("");
        if (linkInputRef.current) {
            linkInputRef.current.value = "";
        }
    };

    const handeLinkChange = (value: string) => {
        setLinkName(value);
        if (value === "" || validateLink(value)) {
            setLinkError("");
        } else {
            setLinkError("유효한 URL을 입력하세요.");
        }
    };

    const validateLink = (link: string) => {
        const pattern = /^https?:\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;
        return pattern.test(link);
    };

    return (
        <>
            <div className="w-full border border-n300 bg-n75 rounded pt-3 pb-3 pl-4 pr-4 flex items-center justify-between">
                <input
                    ref={linkInputRef}
                    className="w-[273px] bg-transparent outline-none"
                    type="text"
                    placeholder="링크를 입력하세요"
                    value={linkName}
                    onChange={(e) => handeLinkChange(e.target.value)}
                />
                <div className="flex items-center gap-2">
                    <button onClick={handleCopy}>
                        <LinkSimpleIcon />
                    </button>
                    <button onClick={handleLinkDelete}>
                        <p className="text-sm text-n600">삭제</p>
                    </button>
                </div>
            </div>
            {linkError && <p className="text-red text-xs">{linkError}</p>}
        </>
    );
};

interface FileInputProps {
    file: File | null;
    setFile: (f: File | null) => void;
    originFileName: string | null; //이미 등록된 파일이름
    fileLink: string | null;
}

const FileInput: React.FC<FileInputProps> = ({ file, setFile, originFileName, fileLink }) => {
    /** 파일 */
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string>(originFileName || "");

    const handleInputClick = () => {
        fileInputRef.current?.click();
    };

    //아이콘 클릭 시, 파일 다운로드
    const handleFileIconClick = async () => {
        if (!inputValue || !fileLink) return;
        try {
            const response = await fetch(fileLink);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = inputValue || "downloaded_file";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("다운로드 실패:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setInputValue(selectedFile.name);
        }
    };

    const handleFileDelete = () => {
        setFile(null);
        setInputValue("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full border border-n300 bg-n75 rounded pt-3 pb-3 pl-4 pr-4 flex items-center justify-between">
            <input className="w-[273px] bg-transparent outline-none" type="text" value={inputValue} placeholder="파일을 선택하세요" onClick={handleInputClick} readOnly />
            <div className="flex items-center gap-2">
                <button className="w-5 h-5 p-[1px]" onClick={handleFileIconClick}>
                    <DownloadSimpleIcon />
                </button>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                <button onClick={handleFileDelete}>
                    <p className="text-sm text-n600">삭제</p>
                </button>
            </div>
        </div>
    );
};

export default FileModal;
