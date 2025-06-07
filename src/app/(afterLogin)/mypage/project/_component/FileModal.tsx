/**
 * isOpen: 모달 열림 여부
 * onClose: 모달 닫기 이벤트
 * isLinkType: 링크 방식 여부
 * isFileType: 파일 방식 여부
 **/
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { CloseIcon, LinkSimpleIcon, PlusCircleIcon, DownloadSimpleIcon } from "@/components/icons/icons";

interface FileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FileModal: React.FC<FileModalProps> = ({ isOpen, onClose }) => {
    /** 링크/파일 제출 버튼 토글 */
    const [isLinkType, setIsLinkType] = useState(false);
    const [isFileType, setIsFileType] = useState(false);
    const toggleLinkButton = () => setIsLinkType((prev) => !prev);
    const toggleFileButton = () => setIsFileType((prev) => !prev);

    /** 링크 */
    const linkInputRef = useRef<HTMLInputElement | null>(null);
    const [linkName, setLinkName] = useState("");
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
    }
    /** 파일 */
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileIconClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile?.name);
        }
    };
    const handleFileDelete = () => {
        setFile(null);
        setFileName("");
        if (fileInputRef.current) {
            //이거 안 하면 삭제했다가 같은 파일을 다시 올릴 수 없음 (같은 파일이 다시 선택돼도 값이 변경되지 않았다고 간주)
            fileInputRef.current.value = "";
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
                <div className={`${isLinkType || isFileType ? "mt-6" : ""} flex flex-col gap-6`}>
                    <div className="flex flex-col gap-4">
                        {isLinkType && (
                            <div className="w-full border border-n300 bg-n75 rounded pt-3 pb-3 pl-4 pr-4 flex items-center justify-between">
                                <input ref={linkInputRef} className="w-[273px] bg-transparent outline-none" type="text" placeholder="링크 입력"/>
                                <div className="flex items-center gap-2">
                                    <button onClick={handleCopy}>
                                        <LinkSimpleIcon />
                                    </button>
                                    <button onClick={handleLinkDelete}>
                                        <p className="text-sm text-n600">삭제</p>
                                    </button>
                                </div>
                            </div>
                        )}
                        {isFileType && (
                            <div className="w-full border border-n300 bg-n75 rounded pt-3 pb-3 pl-4 pr-4 flex items-center justify-between">
                                <input className="w-[273px] bg-transparent outline-none" type="text" value={fileName} placeholder="파일을 선택하세요" readOnly />
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
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button className="flex-1" label="링크 업로드" icLeft={<LinkSimpleIcon />} size="medium" btnType="line" onClick={() => toggleLinkButton()} />
                        <Button className="flex-1" label="파일 업로드" icLeft={<PlusCircleIcon />} size="medium" btnType="line" onClick={() => toggleFileButton()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileModal;
