import React from "react";

interface DropBoxItem {
    label: string;
    onClick: () => void;
}

interface DropboxListProps {
    items: DropBoxItem[];
    dropBoxRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
}

const Dropbox = ({ items, dropBoxRef, className = "" }: DropboxListProps) => {
    return (
        <div ref={dropBoxRef} className={`absolute right-0 bottom-full mb-[9px] ${className}}`}>
            <ul className="w-[120px] bg-white border rounded shadow z-10 text-sm text-n800">
                {items.map((item, idx) => (
                    <li key={idx} className="h-[36px] px-3 py-2 hover:bg-n200 cursor-pointer">
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropbox;
