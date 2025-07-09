"use client";

import { getNotificationsApi } from "@/apis/notifications/notificationApis";
import { getUserInfoApi, User } from "@/apis/user/userApis";
import { useClickOutside } from "@/hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FolderIcon, HomeIcon, LogoIcon, NotificationIcon } from "../icons/icons";
import FindPwModal from "./FindPwModal/FindPwModal";
import LoginModal from "./LoginModal/LoginModal";

export default function Nav() {
    console.log("Nav 렌더링됨");
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowFindPwModal, setIsShowFindPwModal] = useState(false);

    const { data } = useQuery({
        queryKey: ["isLoggedIn"],
        queryFn: getUserInfoApi,
        refetchInterval: 5 * 60 * 1000, // 5분마다 리페치
        staleTime: 0, // 데이터를 항상 fresh하지 않게 설정
        gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: true, // 윈도우 포커스 시 리페치
    });

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
                        {data?.id ? (
                            <NavRightSectionForLoggedInUser user={data} />
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

const NavRightSectionForLoggedInUser = ({ user }: { user: User }) => {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFindPwModal, setShowFindPwModal] = useState(false);

    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => {
        if (showDropdown) setShowDropdown(false);
    });

    return (
        <>
            <HomeIcon onClick={() => router.push("/")} />
            <FolderIcon onClick={() => router.push("/mypage/profile")} />
            <Notivication userId={user!.id} />
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
                        <button
                            onClick={async () => {
                                try {
                                    await fetch("/api/auth/logout", {
                                        method: "POST",
                                        credentials: "include", // 쿠키를 포함하여 요청
                                    });
                                    window.location.reload(); // 페이지 리로드하여 쿼리 초기화
                                    setShowDropdown(false);
                                } catch (error) {
                                    console.error("로그아웃 실패:", error);
                                }
                            }}
                            className="w-full h-9 text-left px-3 text-sm text-n800 rounded-b hover:bg-n75"
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
            {showFindPwModal && <FindPwModal onClose={() => setShowFindPwModal(false)} />}
        </>
    );
};

const Notivication = ({ userId }: { userId: number }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const dropBoxRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropBoxRef, () => {
        if (showDropdown) setShowDropdown(false);
    });

    return (
        <div>
            <div className="relative" ref={dropBoxRef}>
                <NotificationIcon onClick={() => setShowDropdown(!showDropdown)} />

                {showDropdown && <NotificationDropdown userId={userId} />}
            </div>
        </div>
    );
};

const NotificationDropdown = ({ userId }: { userId: number }) => {
    const { data: notifications, isPending } = useQuery({
        queryKey: ["notifications", userId],
        queryFn: getNotificationsApi,
    });

    console.log("notifications", notifications);

    const loadMoreAlarms = () => {
        console.log("loadMoreAlarms");
    };

    return (
        <div className="absolute right-0 mt-2 w-[300px] bg-n200 rounded-lg z-10 py-4 px-2.5">
            <div className="px-2.5 text-h3 text-n900 mb-6">알림</div>

            {notifications && notifications.length === 0 && (
                <div className="text-xs text-n800">
                    <div className="w-full flex justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.7936 16.4944C20.2733 15.5981 19.4999 13.0622 19.4999 9.75C19.4999 7.76088 18.7097 5.85322 17.3032 4.4467C15.8967 3.04018 13.989 2.25 11.9999 2.25C10.0108 2.25 8.10311 3.04018 6.69659 4.4467C5.29007 5.85322 4.49989 7.76088 4.49989 9.75C4.49989 13.0631 3.72551 15.5981 3.2052 16.4944C3.07233 16.7222 3.00189 16.9811 3.00099 17.2449C3.00008 17.5086 3.06874 17.768 3.20005 17.9967C3.33135 18.2255 3.52065 18.4156 3.74886 18.5478C3.97708 18.6801 4.23613 18.7498 4.49989 18.75H8.32583C8.49886 19.5967 8.95904 20.3577 9.62851 20.9042C10.298 21.4507 11.1357 21.7492 11.9999 21.7492C12.8641 21.7492 13.7018 21.4507 14.3713 20.9042C15.0407 20.3577 15.5009 19.5967 15.674 18.75H19.4999C19.7636 18.7496 20.0225 18.6798 20.2506 18.5475C20.4787 18.4151 20.6678 18.225 20.799 17.9963C20.9302 17.7676 20.9988 17.5083 20.9979 17.2446C20.9969 16.9809 20.9265 16.7222 20.7936 16.4944ZM11.9999 20.25C11.5347 20.2499 11.081 20.1055 10.7013 19.8369C10.3215 19.5683 10.0343 19.1886 9.87926 18.75H14.1205C13.9655 19.1886 13.6783 19.5683 13.2985 19.8369C12.9187 20.1055 12.4651 20.2499 11.9999 20.25ZM4.49989 17.25C5.22176 16.0087 5.99989 13.1325 5.99989 9.75C5.99989 8.1587 6.63203 6.63258 7.75725 5.50736C8.88247 4.38214 10.4086 3.75 11.9999 3.75C13.5912 3.75 15.1173 4.38214 16.2425 5.50736C17.3677 6.63258 17.9999 8.1587 17.9999 9.75C17.9999 13.1297 18.7761 16.0059 19.4999 17.25H4.49989Z"
                                fill="#474D66"
                            />
                        </svg>
                    </div>

                    <div className="mb-0.5 text-center">받은 알림이 없습니다</div>
                    <div className="text-center">새로운 알림이 생기면 알려드릴게요</div>
                </div>
            )}
            {notifications && notifications.length > 0 && (
                <div className="flex flex-col gap-2 w-full">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="w-full px-5 py-[15px] bg-white rounded-lg flex items-center gap-2">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.25 11.2501C23.2488 10.057 22.7743 8.91312 21.9306 8.06947C21.087 7.22583 19.9431 6.75132 18.75 6.75008H15.0187C14.7459 6.73414 9.99188 6.39946 5.46469 2.60258C5.24607 2.41897 4.97959 2.30157 4.69656 2.26416C4.41353 2.22674 4.12571 2.27088 3.86689 2.39138C3.60807 2.51188 3.38902 2.70373 3.23546 2.94441C3.0819 3.18509 3.00022 3.46459 3 3.75008V18.7501C3.00004 19.0357 3.0816 19.3153 3.23508 19.5561C3.38857 19.7969 3.60761 19.9889 3.86646 20.1095C4.12532 20.2301 4.41322 20.2744 4.69633 20.237C4.97945 20.1996 5.24601 20.0822 5.46469 19.8985C9.00563 16.9285 12.6834 16.0773 14.25 15.8391V18.8129C14.2497 19.0601 14.3105 19.3035 14.4269 19.5215C14.5434 19.7395 14.7119 19.9254 14.9175 20.0626L15.9487 20.7498C16.1481 20.8828 16.3764 20.9662 16.6145 20.9928C16.8527 21.0195 17.0938 20.9887 17.3176 20.9031C17.5414 20.8174 17.7414 20.6794 17.901 20.5005C18.0605 20.3217 18.1748 20.1072 18.2344 19.8751L19.3378 15.7163C20.4204 15.5723 21.4138 15.04 22.1334 14.2185C22.853 13.397 23.2498 12.3422 23.25 11.2501ZM4.5 18.7435V3.75008C8.51344 7.11664 12.6216 7.96883 14.25 8.17883V14.3176C12.6234 14.5313 8.51625 15.3816 4.5 18.7435ZM16.7812 19.4935V19.5038L15.75 18.8166V15.7501H17.775L16.7812 19.4935ZM18.75 14.2501H15.75V8.25008H18.75C19.5456 8.25008 20.3087 8.56615 20.8713 9.12876C21.4339 9.69137 21.75 10.4544 21.75 11.2501C21.75 12.0457 21.4339 12.8088 20.8713 13.3714C20.3087 13.934 19.5456 14.2501 18.75 14.2501Z"
                                        fill={notification.read ? "#8F95B2" : "#474d66"}
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="w-full flex gap-4 mb-2">
                                    <div className={`text-smEmphasize ${notification.read ? "text-n700" : "text-n900"}`}>프로젝트 지원</div>
                                    <div className="text-xs text-n500">{notification.createdDate}</div>
                                </div>
                                <div className={`text-xs ${notification.read ? "text-n700" : "text-n800"}`}>{notification.message}</div>
                            </div>
                        </div>
                    ))}

                    <span className="mt-4 mx-auto text-xs text-n800 cursor-pointer" onClick={loadMoreAlarms}>
                        알림 더보기
                    </span>
                </div>
            )}
        </div>
    );
};
