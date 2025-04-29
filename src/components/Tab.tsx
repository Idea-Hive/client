"use client";
import { useState } from "react";

interface TabProps {
    items: {
        value: string;
        label: string;
        children: React.ReactNode;
    }[];
    defaultTab?: string;
}

export default function Tab({ items, defaultTab }: TabProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.value);

    return (
        <div className="w-full">
            <div className="flex border-b border-n300 gap-5">
                {items.map((item) => (
                    <div
                        key={item.value}
                        className={`w-fit cursor-pointer pb-[14px] text-baseEmphasize ${activeTab === item.value ? "border-b-2 border-n900 text-n900" : "border-none text-n700"}`}
                        onClick={() => setActiveTab(item.value)}
                    >
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <div>{items.find((item) => item.value === activeTab)?.children}</div>
        </div>
    );
}
