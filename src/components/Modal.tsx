import Button from "./Button";

/**
 * isOpen: 모달 열림 여부
 * onClose: 모달 닫기 이벤트
 * title: 모달 제목
 * children: 모달 내용
 * content: 모달 추가 내용
 * confirmText: 확인 버튼 라벨
 * cancelText: 취소 버튼 라벨
 * onConfirm: 확인 버튼 클릭 이벤트
 */
interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    title: string;
    children: React.ReactNode;
    content?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, content, confirmText = "확인", cancelText = "닫기", onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="relative w-[400px] shadow-elavation1 bg-white rounded-lg p-8">
                <h2 className="text-lg leading-6 font-medium mb-2">{title}</h2>
                <div className="text-n800 text-sm">{children}</div>

                {content}

                <div className="flex justify-end gap-2 mt-6">
                    {onClose && <Button label={cancelText} btnType="line" size="large" className="px-6" onClick={onClose} />}
                    {onConfirm && <Button label={confirmText} btnType="primary" size="large" className="px-6" onClick={onConfirm} />}
                </div>
            </div>
        </div>
    );
};

export default Modal;
