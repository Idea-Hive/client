"use client";

import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import FindPwModal from "@/components/gnb/FindPwModal/FindPwModal";
import LoginModal from "@/components/gnb/LoginModal/LoginModal";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function FinishSignup() {
    const [isShowLoginModal, setIsShowLoginModal] = useState(false);
    const [isShowFindPwModal, setIsShowFindPwModal] = useState(false);

    // 로그인 모달을 통해 로그인이 됐을 경우, 메인페이지로 redirect
    const { user } = useUserInfo();
    useEffect(() => {
        if (user) {
            redirect("/");
        }
    }, [user]);

    return (
        <div className="w-full p-10 my-[66px]">
            <div className="mb-6 flex justify-center">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M33.918 19.207C34.0633 19.3521 34.1785 19.5245 34.2571 19.7142C34.3358 19.9038 34.3762 20.1072 34.3762 20.3125C34.3762 20.5178 34.3358 20.7212 34.2571 20.9108C34.1785 21.1005 34.0633 21.2729 33.918 21.418L22.9805 32.3555C22.8354 32.5007 22.663 32.616 22.4734 32.6946C22.2837 32.7733 22.0803 32.8137 21.875 32.8137C21.6697 32.8137 21.4663 32.7733 21.2767 32.6946C21.087 32.616 20.9147 32.5007 20.7695 32.3555L16.082 27.668C15.7889 27.3748 15.6241 26.9771 15.6241 26.5625C15.6241 26.1479 15.7889 25.7502 16.082 25.457C16.3752 25.1638 16.7729 24.9991 17.1875 24.9991C17.6021 24.9991 17.9998 25.1638 18.293 25.457L21.875 29.041L31.707 19.207C31.8522 19.0618 32.0245 18.9465 32.2142 18.8679C32.4038 18.7892 32.6072 18.7488 32.8125 18.7488C33.0178 18.7488 33.2212 18.7892 33.4109 18.8679C33.6005 18.9465 33.7729 19.0618 33.918 19.207ZM45.3125 25C45.3125 29.0174 44.1212 32.9446 41.8892 36.285C39.6573 39.6254 36.4849 42.2289 32.7733 43.7663C29.0616 45.3037 24.9775 45.706 21.0372 44.9222C17.097 44.1384 13.4777 42.2039 10.6369 39.3631C7.79615 36.5224 5.86157 32.903 5.07781 28.9628C4.29405 25.0225 4.6963 20.9384 6.23371 17.2267C7.77111 13.5151 10.3746 10.3427 13.715 8.11077C17.0554 5.87881 20.9826 4.6875 25 4.6875C30.3855 4.69319 35.5487 6.83507 39.3568 10.6432C43.1649 14.4513 45.3068 19.6145 45.3125 25ZM42.1875 25C42.1875 21.6006 41.1795 18.2776 39.2909 15.4511C37.4023 12.6247 34.718 10.4217 31.5774 9.12082C28.4368 7.81994 24.9809 7.47957 21.6469 8.14275C18.3128 8.80594 15.2503 10.4429 12.8466 12.8466C10.4429 15.2503 8.80595 18.3128 8.14276 21.6469C7.47958 24.9809 7.81995 28.4368 9.12083 31.5774C10.4217 34.718 12.6247 37.4023 15.4511 39.2909C18.2776 41.1795 21.6006 42.1875 25 42.1875C29.5568 42.1823 33.9255 40.3699 37.1477 37.1477C40.3699 33.9255 42.1823 29.5568 42.1875 25Z"
                        fill="#FF6363"
                    />
                </svg>
            </div>

            <div className="mb-10 flex flex-col">
                <h1 className="text-center text-2xl font-semibold mb-3 text-[#101840]">회원가입이 완료되었습니다</h1>
                <div className="text-center text-base font-normal text-[#474d66]">
                    이제 프로젝트를 탐색하고 팀원을 모집할 수 있어요
                    <br />
                    지금 바로 원하는 프로젝트를 찾아보세요
                </div>
            </div>

            <div className="w-full h-12 flex justify-center gap-2">
                <button type="button" className="flex-1 h-full border border-[#c1c4d6] text-base font-medium text-[#474d66] rounded-md" onClick={() => redirect("/")}>
                    메인으로 이동
                </button>
                <button className="flex-1 h-full bg-[#ff6363] text-white rounded-md text-base font-medium" onClick={() => setIsShowLoginModal(true)}>
                    로그인
                </button>
            </div>

            {/* 로그인 모달 */}
            {isShowLoginModal && (
                <LoginModal
                    onClose={() => {
                        setIsShowLoginModal(false);
                    }}
                    onOpenFindPwModal={() => setIsShowFindPwModal(true)}
                />
            )}
            {/* 비밀번호 찾기 모달 */}
            {isShowFindPwModal && <FindPwModal onClose={() => setIsShowFindPwModal(false)} />}
        </div>
    );
}
