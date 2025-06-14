"use client";

import React, { useState, useRef } from "react";
import Selectbox from "@/components/Selectbox";
import Menu from "./Menu";
import { FolderIcon, SquaresFourIcon, GearSixIcon } from "@/components/icons/icons";
import Button from "@/components/Button";
import { useClickOutside } from "@/hooks/hooks";

interface SideMenuProps {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ selectedMenu, setSelectedMenu }) => {
    const onProjectSubmit = () => {
        //TODO
        const requestBody = "";
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => {
        if (isOpen) setIsOpen(false);
    });

    return (
        <div className="flex flex-col px-6 pt-10 md-25">
            <div>
                <div className="flex flex-col gap-4">
                    <Selectbox
                        placeholder="프로젝트 선택"
                        options={[
                            { value: "1", label: "테스크메이트" },
                            { value: "2", label: "음하하프로젝트" },
                            { value: "3", label: "냐하하프로젝트" },
                        ]}
                    />
                    <div className="relative">
                        <Menu
                            label="프로젝트"
                            subItems={[{ label: "대시보드" }, { label: "캘린더" }]}
                            icon={
                                <div className="w-[20px] h-[20px] p-[3px]">
                                    <SquaresFourIcon />
                                </div>
                            }
                            selectedItem={selectedMenu}
                            onSelect={setSelectedMenu}
                        />
                        <Menu
                            label="프로세스"
                            subItems={[{ label: "기획" }, { label: "디자인" }, { label: "개발" }, { label: "배포" }, { label: "완료" }]}
                            icon={<FolderIcon width={20} height={20} />}
                            selectedItem={selectedMenu}
                            onSelect={setSelectedMenu}
                        />
                        <Menu label="팀" icon={<FolderIcon width={20} height={20} />} selectedItem={selectedMenu} onSelect={setSelectedMenu} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="relative">
                    <div className="flex items-center justify-end text-sm mb-3">
                        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            <GearSixIcon />
                        </button>
                        <span className="ml-1 text-n800 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            설정
                        </span>
                    </div>
                    {isOpen && (
                        <div ref={dropBoxRef} className="absolute right-0 bottom-full mb-[9px]">
                            <ul className="w-[120px] bg-white border rounded shadow z-10 text-sm text-n800">
                                <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200 cursor-pointer">프로젝트 탈퇴</li>
                                <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200 cursor-pointer">프로젝트 삭제</li>
                            </ul>
                        </div>
                    )}
                </div>

                <Button
                    label="프로젝트 제출"
                    onClick={() => {
                        onProjectSubmit;
                    }}
                    size="large"
                    btnType="primary"
                />
            </div>
        </div>
    );
};

export default SideMenu;
