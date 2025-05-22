'use client';

import { useState } from "react";
import Selectbox from "@/components/Selectbox";
import Menu from "../_component/Menu";
import { FolderIcon, SquaresFourIcon, GearSixIcon } from "@/components/icons/icons";
import Button from "@/components/Button";

export default function SideMenu() {
    const onProjectSubmit = () => {//TODO
        const requestBody = '';
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col px-6 pt-10 md-25">
            <div>
                <div className="flex flex-col gap-4">
                    <Selectbox
                        placeholder="Selectbox"
                        options={[
                            { value: "1", label: "테스크메이트" },
                            { value: "2", label: "음하하프로젝트" },
                            { value: "3", label: "냐하하프로젝트" },
                        ]}
                    />
                    <div className="relative">
                        <Menu
                            label="프로젝트"
                            href="#"
                            subItems={[
                                { label: "대시보드", href: "#" },
                                { label: "캘린더", href: "#" },
                            ]}
                            defaultOpen={true}
                            icon={
                                <div className="w-[20px] h-[20px] p-[3px]">
                                    <SquaresFourIcon />
                                </div>
                            }
                        />
                        <Menu
                            label="프로세스"
                            href="#"
                            subItems={[
                                { label: "기획", href: "#" },
                                { label: "디자인", href: "#" },
                                { label: "개발", href: "#" },
                                { label: "배포", href: "#" },
                                { label: "완료", href: "#" },
                            ]}
                            defaultOpen={true}
                            icon={<FolderIcon width={20} height={20} />}
                        />
                        <Menu label="팀" href="#" subItems={[]} defaultOpen={true} icon={<FolderIcon width={20} height={20} />} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">

                <div className="relative">
                    <span className="flex items-center justify-end text-sm mb-3" onClick={toggleDropDown}>
                        <GearSixIcon />
                        <span className="ml-1 text-n800">설정</span>
                    </span>
                    {isOpen && (
                        <div className="absolute right-0 bottom-full mb-[9px]">
                            <ul className="w-[120px] bg-white border rounded shadow z-10">
                                <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200">프로젝트 탈퇴</li>
                                <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200">프로젝트 삭제</li>
                            </ul>
                        </div>
                    )}
                </div>

                <Button
                    label="프로젝트 제출"
                    onClick={() => {onProjectSubmit}}
                    size="large"
                    btnType="primary"
                />
            </div>
        </div>
    );
}