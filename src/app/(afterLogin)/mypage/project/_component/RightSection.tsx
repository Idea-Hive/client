"use client";

import React from "react";
import { ComponentMap } from "../_types/ComponentMap";

interface RightSectionProps {
    selectedMenu: string;
}

const RightSection: React.FC<RightSectionProps> = ({ selectedMenu }) => {
    const SelectedComponent = ComponentMap[selectedMenu];
    return (
        <div className="bg-n75 min-h-screen w-full">
            <SelectedComponent />
        </div>
    );
};

export default RightSection;