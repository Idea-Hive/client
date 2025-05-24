"use client";

import { useState } from "react";
import Button from "@/components/Button";
import SideMenu from "../_component/SideMenu";
import { DownloadSimpleIcon, DownloadSimpleIconWhite, FolderIcon, SmallUserImgIcon, CaretDownIcon, CalendaBlankIcon, UploadSimpleIcon
} from "@/components/icons/icons";

export default function ManageProjects() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropDown = () => setIsOpen(!isOpen);

    const onDownloadTemplate = () => {
        //TODO
    };

    return (
        <div className="flex w-full h-screen">
            <div className="w-96">
                <SideMenu></SideMenu>
            </div>

            <div className="flex-1 bg-n75">
                <div className="ml-[40px] mt-[40px] mr-[120px]">
                    <div className="text-h2 text-n900 left-0 pb-[16px] border-b-[1px] border-n400">기획</div>
                    <div className="mt-[32px] flex flex-col">
                        <div>
                            <div className="flex justify-between items-end">
                                <div className="text-h3 text-n900">필수 과제</div>
                                <div className="flex gap-2">
                                    <Button
                                        label="선택 탬플릿"
                                        onClick={() => {
                                            onDownloadTemplate;
                                        }}
                                        icLeft={<DownloadSimpleIcon />}
                                        size="large"
                                        btnType="line"
                                    />
                                    <Button
                                        label="전체 탬플릿"
                                        onClick={() => {
                                            onDownloadTemplate;
                                        }}
                                        icLeft={<DownloadSimpleIconWhite />}
                                        size="large"
                                        btnType="primary"
                                    />
                                </div>
                            </div>
                            {/* 테이블 */}
                            <div className="mt-4 rounded border border-n400">
                                <table className="border-collapse w-full text-xs">
                                    <thead className="bg-n50 text-center text-n800">
                                        <tr>
                                            <td className="pt-3 pb-3">선택</td>
                                            <td className="pt-3 pb-3">Key</td>
                                            <td className="pt-3 pb-3">과제</td>
                                            <td className="pt-3 pb-3">담당자</td>
                                            <td className="pt-3 pb-3">마감기한</td>
                                            <td className="pt-3 pb-3">제출</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-n0 text-n900">
                                        <tr className="border-t">
                                            <td className="p-3 text-center border-r">
                                                <input type="checkbox" className="w-4 h-4 border-n400"/>
                                            </td>
                                            <td className="p-3 border-x">D_1</td>
                                            <td className="p-3 border-x">[디자인] 와이어프레임</td>
                                            <td className="p-3 border-x text-center">
                                                <div className="flex justify-center items-center gap-1">
                                                    <SmallUserImgIcon/>
                                                    <span>홍길동</span>
                                                </div>
                                            </td>
                                            <td className="p-3 border-x text-center">2025-02-20</td>
                                            <td className="p-3 border-l">
                                                <div className="flex justify-center items-center gap-1">
                                                    <FolderIcon/>
                                                    <span>제출완료</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="p-3 text-center border-r">
                                                <input type="checkbox" className="w-4 h-4 border-n400"/>
                                            </td>
                                            <td className="p-3 border-x">D_1</td>
                                            <td className="p-3 border-x">[디자인] 와이어프레임</td>
                                           
                                            <td className="relative p-3 border-x">
                                                <div className="flex justify-center items-center gap-1 text-n600" onClick={toggleDropDown}>
                                                    <span>담당자 선택</span>
                                                    <CaretDownIcon></CaretDownIcon>
                                                </div>
                                                {isOpen && (
                                                    <div className="absolute right-0">
                                                        <ul className="w-[120px] bg-white border rounded shadow z-10">
                                                            <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200">이서연</li>
                                                            <li className="h-[36px] pl-3 pr-3 pt-2 pd-2 hover:bg-n200">홍길동</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-3 border-x text-center">
                                                <div className="flex justify-center items-center gap-1 text-n600">
                                                    <CalendaBlankIcon></CalendaBlankIcon>
                                                    <span>기한 설정</span>
                                                </div>
                                            </td>
                                            <td className="p-3 border-l text-center">
                                                <div className="flex justify-center items-center gap-1 text-n600">
                                                    <UploadSimpleIcon/>
                                                    <span>제출하기</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-[40px] flex">
                            <div className="text-h3 text-n900">선택 과제</div>
                            {/* 테이블 */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
