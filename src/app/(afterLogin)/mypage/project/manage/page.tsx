"use client";

import { useState } from "react";
import SideMenu from "../_component/SideMenu";
import RightSection from "../_component/RightSection";

export default function ManageProjects() {
    const [selectedMenu, setSelectedMenu] = useState("캘린더");

    return (
        <div className="w-full h-screen flex">
            <div className="w-[100px] bg-white"></div>
            <div className="w-[300px] bg-white">
                <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            </div>
            <div className="flex-1 bg-n75">
                <RightSection selectedMenu={selectedMenu} />
            </div>
        </div>
    );
}
