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
            <div className="flex border-b border-gray-200">
                {items.map((item) => (
                    <div
                        key={item.value}
                        className={`w-fit px-5 py-2.5 cursor-pointer ${activeTab === item.value ? "font-bold border-b-2 border-black text-black" : "border-none text-gray-400"}`}
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
