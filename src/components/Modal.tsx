import Button from "./Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, confirmText = "확인", cancelText = "닫기", onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <div className="relative w-[400px] shadow-elavation1 bg-white rounded-lg p-8">
                <h2 className="text-lg leading-6 font-medium mb-2">{title}</h2>
                <div className="mb-6 text-n800 text-sm">{children}</div>

                <div className="flex justify-end gap-2">
                    <Button label={cancelText} btnType="line" size="large" className="px-6" onClick={onClose} />
                    {onConfirm && <Button label={confirmText} btnType="primary" size="large" className="px-6" onClick={onConfirm} />}
                </div>
            </div>
        </div>
    );
};

export default Modal;
