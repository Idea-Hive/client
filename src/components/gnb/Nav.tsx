"use client";

import Link from "next/link";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Nav() {
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);

    return (
        <nav className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <Link href="/">Taskmate</Link>
                <Link href="/">프로젝트탐색</Link>
            </div>

            <div className="flex items-center gap-4">
                <div>마이프로젝트 아이콘</div>
                <div className="cursor-pointer" onClick={() => setIsShowLoginModal(true)}>
                    로그인/회원가입
                </div>
            </div>

            {isShowLoginModal && <LoginModal onClose={() => setIsShowLoginModal(false)} />}
        </nav>
    );
}
