"use client";

import { useClickOutside } from "@/hooks/hooks";
import { useRef, useState } from "react";
import { NotificationIcon } from "../../icons/icons";
import NotificationDropdown from "./NotificationDropdown";

export default function Notification() {
    const [showDropdown, setShowDropdown] = useState(false);

    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => {
        if (showDropdown) setShowDropdown(false);
    });

    return (
        <div>
            <div className="relative" ref={dropBoxRef}>
                <NotificationIcon onClick={() => setShowDropdown(!showDropdown)} />

                {showDropdown && <NotificationDropdown />}
            </div>
        </div>
    );
}
