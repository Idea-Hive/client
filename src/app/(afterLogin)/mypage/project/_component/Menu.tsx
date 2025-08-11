"use client";

interface SubItem {
    label: string;
    isSubmitted?: boolean;
}

interface MenuProps {
    label: string;
    subItems?: SubItem[];
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    onSelect: (label: string) => void;
    selectedItem: string;
}

const Menu: React.FC<MenuProps> = ({ label, subItems, defaultOpen = false, icon, onSelect, selectedItem }) => {
    return (
        <div>
            {/* 상위 메뉴 (클릭x) */}
            <div className={`flex items-center h-11 ml-2 px-2 py-3 rounded-md cursor: default ${selectedItem === label ? "bg-n75" : "bg-n0"}`}>
                <span className="mr-3 cursor-default">{icon}</span>
                <span className="text-n900 text-smEmphasis">{label}</span>
            </div>
            {/* 서브 메뉴 */}
            <div className="flex flex-col">
                {subItems?.map((item) => {
                    const isSelected = selectedItem === item.label;
                    return (
                        <div key={item.label} onClick={() => onSelect(item.label)} className={`h-10 leading-10 ml-2 px-10 rounded-md cursor-pointer ${isSelected ? "bg-n75" : "bg-n0"} hover:bg-n200`}>
                            <span className={`text-n900 text-sm ${!item.isSubmitted && "text-red"}`}>{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;
