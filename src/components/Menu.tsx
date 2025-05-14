'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SubItem {
    label: string;
    href: string;
}

interface MenuProps {
    label: string;
    href?: string;
    subItems?: SubItem[];
    defaultOpen?: boolean;
    icon: React.ReactNode;
}

export default function Menu({label, href, subItems, defaultOpen = false, icon}: MenuProps) {
    const [open, setOpen] = useState(defaultOpen); // 사실 없어도 되는 듯
    const isSelected = false; // TODO

    if(!subItems || subItems.length === 0) {
        return (
            <Link 
                href={href || '#'} 
                className={`w-64 py-2.5 rounded-md inline-flex justify-start items-center hover:bg-n200 
                            ${isSelected ? 'bg-n75' : 'bg-n0'}`}>
                {icon && <span>{icon}</span>}
                <span className="text-center justify-start text-indigo-950 text-sm font-medium">{label}</span>
            </Link>
        );
    }
    
    return (
        <div>
            <button
            onClick={() => setOpen(!open)}
            className={`w-64 py-2.5 rounded-md inline-flex justify-start items-center ${isSelected ? 'bg-n75' : 'bg-n0'}`}>
            {label}
            </button>

            {open && (
                <div>
                    {subItems.map((item) => {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`w-64 py-2.5 rounded-md inline-flex justify-start items-center hover:bg-n200 
                                ${isSelected ? 'bg-n75' : 'bg-n0'}`}>
                                <span className="text-center justify-start text-indigo-950 text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
