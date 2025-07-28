"use client";

import { useUserInfo } from "@/hooks/queries";
import Link from "next/link";
import { useState } from "react";
import { LogoIcon } from "../../icons/icons";
import FindPwModal from "../FindPwModal/FindPwModal";
import LoginModal from "../LoginModal/LoginModal";
import NavRightSectionForLoggedInUser from "./NavRightSectionForLoggedInUser";

export default function Nav() {
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowFindPwModal, setIsShowFindPwModal] = useState(false);

    const { user } = useUserInfo();

    return (
        <nav className="w-full h-[72px] flex justify-center border-b border-[#d8dae5]">
            <nav className="max-w-[1232px] w-full h-full bg-white flex items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-[3.75px]">
                        <LogoIcon />
                        <span className="text-montserrat font-bold text-n900 text-xl ">Taskmate</span>
                    </Link>

                    <Link href="/project" className="text-base font-semibold">
                        프로젝트탐색
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-5">
                        {user?.id ? (
                            <NavRightSectionForLoggedInUser />
                        ) : (
                            <button className="h-8 px-3 rounded-[4px] text-sm font-semibold bg-[#FF6363] text-white" onClick={() => setIsShowLoginModal(true)}>
                                로그인/회원가입
                            </button>
                        )}
                    </div>
                </div>

                {/* 로그인 모달 */}
                {isShowLoginModal && <LoginModal onClose={() => setIsShowLoginModal(false)} onOpenFindPwModal={() => setIsShowFindPwModal(true)} />}
                {/* 비밀번호 찾기 모달 */}
                {isShowFindPwModal && <FindPwModal onClose={() => setIsShowFindPwModal(false)} />}
            </nav>
        </nav>
    );
}
