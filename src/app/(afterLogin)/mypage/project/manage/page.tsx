"use client";

import SideMenu from "../_component/SideMenu";
import RightSection from "../_component/RightSection";

export default function ManageProjects() {
    return (
        <div className="w-[1200px] mx-auto flex h-screen">
            <div className="w-[300px]">
                <SideMenu></SideMenu>
            </div>
            <div className="flex-1 bg-n75">
                <RightSection></RightSection>
            </div>
        </div>
    );
}
