"use client";

import { useState } from "react";
import RightSection from "../../_component/RightSection";
import SideMenu from "../../_component/SideMenu/SideMenu";

export default function ManageProjects() {
    const [selectedMenu, setSelectedMenu] = useState("캘린더");

    return (
        <div className="w-full h-screen flex">
            <div className="w-[calc((100%-1232px)/2+300px)] bg-white flex justify-end">
                <div className="w-[300px] bg-white">
                    <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
                </div>
            </div>
            <div className="flex-1 bg-n75">
                <div className="w-[940px]">
                    <RightSection selectedMenu={selectedMenu} />
                </div>
            </div>
        </div>
    );
}
