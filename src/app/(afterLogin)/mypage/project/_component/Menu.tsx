"use client";

import Link from "next/link";

interface SubItem {
    label: string;
    href: string;
}

interface MenuProps {
    label: string;
    href?: string;
    subItems?: SubItem[];
    defaultOpen?: boolean;
    icon?: React.ReactNode;
}

export default function Menu({ label, href, subItems, defaultOpen = false, icon }: MenuProps) {
    const isSelected = false; // TODO

    if (!subItems || subItems.length === 0) {
        return (
            <Link
                href={href || "#"}
                className={`flex items-center w-64 h-11 ml-2 px-2 py-3 rounded-md hover:bg-n200 
                            ${isSelected ? "bg-n75" : "bg-n0"}`}
            >
                <span className="mr-3">{icon}</span>
                <span className="text-n900 text-sm">{label}</span>
            </Link>
        );
    }

    return (
        <div>
            <Link
                href={href || "#"}
                className={`flex items-center w-64 h-11 ml-2 px-2 py-3 rounded-md hover:bg-n200 
                            ${isSelected ? "bg-n75" : "bg-n0"}`}
            >
                <span className="mr-3">{icon}</span>
                <span className="text-n900 text-sm">{label}</span>
            </Link>
            <div className="flex flex-col">
                {subItems.map((item) => {
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`w-64 h-11 ml-2 px-10 py-3 rounded-md hover:bg-n200 
                                ${isSelected ? "bg-n75" : "bg-n0"}`}
                        >
                            <span className="text-n900 text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
