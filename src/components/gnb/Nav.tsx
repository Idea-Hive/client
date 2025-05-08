"use client";

import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FolderIcon, HomeIcon, NotificationIcon, ProfileIcon } from "../icons/icons";
import FindPwModal from "./FindPwModal";
import LoginModal from "./LoginModal/LoginModal";

export default function Nav() {
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowFindPwModal, setIsShowFindPwModal] = useState(false);

    return (
        <nav className="w-full h-[72px] flex justify-center border-b border-[#d8dae5]">
            <nav className="w-[1280px] h-full bg-white flex items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <Image src={Logo} alt="Taskmate" quality={100} width={140.75} height={30} />
                    </Link>
                    <Link href="/project" className="text-base font-semibold">
                        프로젝트탐색
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-5">
                        <HomeIcon />
                        <FolderIcon />
                        <NotificationIcon />
                        <ProfileIcon />
                    </div>
                    <button className="h-8 px-3 rounded-[4px] text-sm font-semibold bg-[#FF6363] text-white" onClick={() => setIsShowLoginModal(true)}>
                        로그인/회원가입
                    </button>
                </div>

                {isShowLoginModal && <LoginModal onClose={() => setIsShowLoginModal(false)} onOpenFindPwModal={() => setIsShowFindPwModal(true)} />}
                {isShowFindPwModal && <FindPwModal onClose={() => setIsShowFindPwModal(false)} />}
            </nav>
        </nav>
    );
}
