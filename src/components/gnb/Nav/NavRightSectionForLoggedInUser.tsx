"use client";

import { useClickOutside } from "@/hooks/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FolderIcon, HomeIcon } from "../../icons/icons";
import FindPwModal from "../FindPwModal/FindPwModal";
import Notification from "./Notification";
import { logoutApi } from "./_api/api";

export default function NavRightSectionForLoggedInUser() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showFindPwModal, setShowFindPwModal] = useState(false);

    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => {
        if (showDropdown) setShowDropdown(false);
    });

    const deleteAccessTokenAndInvalidateQueries = () => {
        // 클라이언트에서 직접 accessToken 쿠키 삭제
        const isProduction = process.env.NODE_ENV === "production";
        const cookieOptions = isProduction
            ? `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure; domain=${window.location.hostname}`
            : `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;

        document.cookie = cookieOptions;

        queryClient.removeQueries({ queryKey: ["isLoggedIn"] });
        queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });

        window.location.reload();
        setShowDropdown(false);
    };

    const { mutate: logout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: (data, variables) => {
            console.log("success logout:::", data, variables);
            deleteAccessTokenAndInvalidateQueries();
        },
        onError: (error, variables) => {
            console.log("error logout:::", error, variables);
        },
    });

    const onLogout = useCallback(() => {
        const prod = process.env.NODE_ENV === "production";

        logout();
        // if (prod) logout();
        // else deleteAccessTokenAndInvalidateQueries();
    }, [logout, deleteAccessTokenAndInvalidateQueries]);

    return (
        <>
            <HomeIcon onClick={() => router.push("/")} />
            <FolderIcon onClick={() => router.push("/mypage/profile")} />
            <Notification />
            <div className="relative" ref={dropBoxRef}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                    <path
                        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM6.945 18.5156C7.48757 17.6671 8.23501 16.9688 9.11843 16.4851C10.0019 16.0013 10.9928 15.7478 12 15.7478C13.0072 15.7478 13.9982 16.0013 14.8816 16.4851C15.765 16.9688 16.5124 17.6671 17.055 18.5156C15.6097 19.6397 13.831 20.2499 12 20.2499C10.169 20.2499 8.39032 19.6397 6.945 18.5156ZM9 11.25C9 10.6567 9.17595 10.0766 9.5056 9.58329C9.83524 9.08994 10.3038 8.70542 10.852 8.47836C11.4001 8.2513 12.0033 8.19189 12.5853 8.30764C13.1672 8.4234 13.7018 8.70912 14.1213 9.12868C14.5409 9.54824 14.8266 10.0828 14.9424 10.6647C15.0581 11.2467 14.9987 11.8499 14.7716 12.3981C14.5446 12.9462 14.1601 13.4148 13.6667 13.7444C13.1734 14.0741 12.5933 14.25 12 14.25C11.2044 14.25 10.4413 13.9339 9.87868 13.3713C9.31607 12.8087 9 12.0456 9 11.25ZM18.165 17.4759C17.3285 16.2638 16.1524 15.3261 14.7844 14.7806C15.5192 14.2019 16.0554 13.4085 16.3184 12.5108C16.5815 11.6132 16.5582 10.6559 16.252 9.77207C15.9457 8.88825 15.3716 8.12183 14.6096 7.5794C13.8475 7.03696 12.9354 6.74548 12 6.74548C11.0646 6.74548 10.1525 7.03696 9.39044 7.5794C8.62839 8.12183 8.05432 8.88825 7.74805 9.77207C7.44179 10.6559 7.41855 11.6132 7.68157 12.5108C7.94459 13.4085 8.4808 14.2019 9.21563 14.7806C7.84765 15.3261 6.67147 16.2638 5.835 17.4759C4.77804 16.2873 4.0872 14.8185 3.84567 13.2464C3.60415 11.6743 3.82224 10.0658 4.47368 8.61478C5.12512 7.16372 6.18213 5.93192 7.51745 5.06769C8.85276 4.20346 10.4094 3.74367 12 3.74367C13.5906 3.74367 15.1473 4.20346 16.4826 5.06769C17.8179 5.93192 18.8749 7.16372 19.5263 8.61478C20.1778 10.0658 20.3959 11.6743 20.1543 13.2464C19.9128 14.8185 19.222 16.2873 18.165 17.4759Z"
                        fill="#474D66"
                    />
                </svg>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-[120px] bg-white rounded shadow-elevation2 z-10 border border-n400">
                        <button
                            onClick={() => {
                                router.push("/mypage/profile");
                                setShowDropdown(false);
                            }}
                            className="w-full h-9 text-left px-3 text-sm text-n800 rounded-t hover:bg-n75"
                        >
                            마이페이지
                        </button>
                        <button
                            onClick={() => {
                                setShowFindPwModal(true);
                                setShowDropdown(false);
                            }}
                            className="w-full h-9 text-left px-3 text-sm text-n800 rounded-t hover:bg-n75"
                        >
                            비밀번호 변경
                        </button>
                        <button onClick={onLogout} className="w-full h-9 text-left px-3 text-sm text-n800 rounded-b hover:bg-n75">
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
            {showFindPwModal && <FindPwModal onClose={() => setShowFindPwModal(false)} />}
        </>
    );
}
