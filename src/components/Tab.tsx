"use client";
import { useState } from "react";

interface TabProps {
    items: {
        value: string;
        label: React.ReactNode;
        children?: React.ReactNode;
    }[];
    defaultTab?: string;
    onChange?: (value: string) => void;
}

export default function Tab({ items, defaultTab, onChange }: TabProps) {
    const [tab, setTab] = useState(defaultTab || items[0]?.value);

    const handleTabChange = (value: string) => {
        setTab(value);
        onChange?.(value);
    };

    return (
        <div className="w-full">
            <div className="flex border-b border-n300 gap-5">
                {items.map((item) => (
                    <div
                        key={item.value}
                        className={`w-fit cursor-pointer pb-[14px] text-baseEmphasize ${tab === item.value ? "border-b-2 border-n900 text-n900" : "border-none text-n700"}`}
                        onClick={() => handleTabChange(item.value)}
                    >
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            {items.find((item) => item.value === tab)?.children && <div>{items.find((item) => item.value === tab)?.children}</div>}
        </div>
    );
}
