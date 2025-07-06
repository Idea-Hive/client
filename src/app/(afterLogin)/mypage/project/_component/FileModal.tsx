/**
 * isOpen: 모달 열림 여부
 * onClose: 모달 닫기 이벤트
 * isLinkType: 링크 방식 여부
 * isFileType: 파일 방식 여부
 **/
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, LinkSimpleIcon, PlusCircleIcon, DownloadSimpleIcon } from "@/components/icons/icons";
import { onUploadLink, onUploadFile, UpdateLinkRequest, FileUploadRequest } from "@/apis/project/manageApis";
import { useMutation } from "@tanstack/react-query";
import { Task } from "../_types/Task";

interface FileModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskId: number;
    onSuccess: (taskId: number, updates?: Partial<Task>) => void;
    originLink?: string | null;
    originFileName?: string | null;
}

const FileModal: React.FC<FileModalProps> = ({ isOpen, onClose, taskId, onSuccess, originLink, originFileName}) => {
    /** 링크/파일 제출 버튼 토글 */
    const [isLinkType, setIsLinkType] = useState(!!originLink);
    const [isFileType, setIsFileType] = useState(!!originFileName);
    const toggleLinkButton = () => setIsLinkType((prev) => !prev);
    const toggleFileButton = () => setIsFileType((prev) => !prev);
    const [linkName, setLinkName] = useState(originLink ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState(originFileName ?? null);

    //링크 업로드
    const { mutate } = useMutation({
        mutationFn: (data: UpdateLinkRequest) => onUploadLink(data),
        onSuccess: (data) => {
            console.log("data :: ", data);
            //성공 시, 부모에게 업로드한 내역 보내기
            onSuccess(taskId, {
                isSubmittedContent: true,
                attachedLink: linkName
            });
            onClose();
            console.log("제출함");
        },
        onError: () => {
            alert("제출에 실패했습니다.");
        },
    });

    //파일 업로드
    const { mutate: uploadFileMutate } = useMutation({
        mutationFn: (req: FileUploadRequest) => onUploadFile(req), 
        onSuccess: (data) => {
            console.log("data :: ", data);
            //성공 시, 부모에게 업로드한 내역 보내기
            onSuccess(taskId, {
                isSubmittedContent: true,
                file: file?.name
            }); // 부모에게 성공 알림
            onClose(); // 모달 닫기
            console.log("업로드 성공");
        },
        onError: (error) => {
            console.error("업로드 실패:", error);
            alert("업로드에 실패했습니다.");
        },
    });

    const handleSubmit = () => {
        mutate({ taskId, attachedLink: linkName });
        //기존 파일만 있고 변경 사항이 없을 때는 api 안 탐.
        if (!file && fileName) { 
            onSuccess(taskId, {
                isSubmittedContent: true
            });
            onClose();
        } else {
            uploadFileMutate({ file, taskId });
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
                        {isFileType && <FileInput file={file} setFile={setFile} originFileName={fileName ?? null}/>}
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
                <input ref={linkInputRef} className="w-[273px] bg-transparent outline-none" type="text" placeholder="링크를 입력하세요" value={linkName} onChange={(e) => handeLinkChange(e.target.value)} />
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
}

const FileInput: React.FC<FileInputProps> = ({ file, setFile, originFileName }) => {
    /** 파일 */
    const fileInputRef = useRef<HTMLInputElement | null>(null); 
    const [inputValue, setInputValue] = useState<string>(originFileName || "");

    const handleInputClick = () => {
        fileInputRef.current?.click();
    };

    //아이콘 클릭 시, 파일 다운로드
    const handleFileIconClick = () => {
        if (!inputValue) return;
        // TODO : 서버 측에서 클라우드 s3 환경 구축 후 (250706 현재는 로컬로만 파일을 올릴 수 있음.), return 받은 url로 다운 가능 가능하게 할 예정
        // const fileUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${inputValue}`;
        // const link = document.createElement("a");
        // link.href = fileUrl;
        // link.download = inputValue; // 다운로드 시 저장될 이름
        // link.click();
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
                    <DownloadSimpleIcon/>
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
