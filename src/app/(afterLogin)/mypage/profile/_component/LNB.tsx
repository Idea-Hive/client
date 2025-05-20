"use client";

import Button from "@/components/Button";

export default function LNB() {
    return (
        <div className="w-[300px] min-h-[calc(100vh-72px)] bg-white border-r border-n300 py-10 px-6 flex flex-col justify-between">
            <div className="flex flex-col gap-[60px]">
                <Profile />
                <ProjectMenus />
            </div>
            <Footer />
        </div>
    );
}

const Profile = () => {
    return (
        <div>
            <div className="w-full flex justify-center mb-4">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M50 87.5C70.7107 87.5 87.5 70.7107 87.5 50C87.5 29.2893 70.7107 12.5 50 12.5C29.2893 12.5 12.5 29.2893 12.5 50C12.5 70.7107 29.2893 87.5 50 87.5Z"
                        stroke="#343330"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M50 62.5C58.6294 62.5 65.625 55.5044 65.625 46.875C65.625 38.2456 58.6294 31.25 50 31.25C41.3706 31.25 34.375 38.2456 34.375 46.875C34.375 55.5044 41.3706 62.5 50 62.5Z"
                        stroke="#343330"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M24.9219 77.8789C27.2731 73.2477 30.8608 69.358 35.2873 66.641C39.7138 63.924 44.8062 62.4858 50 62.4858C55.1938 62.4858 60.2862 63.924 64.7127 66.641C69.1392 69.358 72.7269 73.2477 75.0781 77.8789"
                        stroke="#343330"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="text-h3 text-n900 text-center mb-8">차민준</div>
            <Button btnType="line_red" label="프로필 수정" className="w-full" onClick={() => {}} />
        </div>
    );
};

const ProjectMenus = () => {
    return (
        <div>
            <div className="w-full px-2 py-3 text-base text-n900">프로젝트 활동</div>
            <div>
                <div className="w-full px-2 py-3 text-base text-n900 flex justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.25 6.75H12.2503L9.64969 4.8C9.38967 4.60599 9.07411 4.5008 8.74969 4.5H3.75C3.35218 4.5 2.97064 4.65804 2.68934 4.93934C2.40804 5.22064 2.25 5.60218 2.25 6V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.3334C20.709 20.2495 21.069 20.1001 21.3346 19.8346C21.6001 19.569 21.7495 19.209 21.75 18.8334V8.25C21.75 7.85218 21.592 7.47064 21.3107 7.18934C21.0294 6.90804 20.6478 6.75 20.25 6.75ZM20.25 18.75H3.75V6H8.74969L11.55 8.1C11.6798 8.19737 11.8377 8.25 12 8.25H20.25V18.75Z"
                                fill="#474D66"
                            />
                        </svg>
                        모집중 프로젝트
                    </div>
                    <div className="text-baseEmphasize">1개</div>
                </div>
                <div className="w-full px-2 py-3 text-base text-n900 flex justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.25 6.75H12.2503L9.64969 4.8C9.38967 4.60599 9.07411 4.5008 8.74969 4.5H3.75C3.35218 4.5 2.97064 4.65804 2.68934 4.93934C2.40804 5.22064 2.25 5.60218 2.25 6V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.3334C20.709 20.2495 21.069 20.1001 21.3346 19.8346C21.6001 19.569 21.7495 19.209 21.75 18.8334V8.25C21.75 7.85218 21.592 7.47064 21.3107 7.18934C21.0294 6.90804 20.6478 6.75 20.25 6.75ZM20.25 18.75H3.75V6H8.74969L11.55 8.1C11.6798 8.19737 11.8377 8.25 12 8.25H20.25V18.75Z"
                                fill="#474D66"
                            />
                        </svg>
                        진행중 프로젝트
                    </div>
                    <div className="text-baseEmphasize">1개</div>
                </div>
                <div className="w-full px-2 py-3 text-base text-n900 flex justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.25 6.75H12.2503L9.64969 4.8C9.38967 4.60599 9.07411 4.5008 8.74969 4.5H3.75C3.35218 4.5 2.97064 4.65804 2.68934 4.93934C2.40804 5.22064 2.25 5.60218 2.25 6V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.3334C20.709 20.2495 21.069 20.1001 21.3346 19.8346C21.6001 19.569 21.7495 19.209 21.75 18.8334V8.25C21.75 7.85218 21.592 7.47064 21.3107 7.18934C21.0294 6.90804 20.6478 6.75 20.25 6.75ZM20.25 18.75H3.75V6H8.74969L11.55 8.1C11.6798 8.19737 11.8377 8.25 12 8.25H20.25V18.75Z"
                                fill="#474D66"
                            />
                        </svg>
                        완료된 프로젝트
                    </div>
                    <div className="text-baseEmphasize">1개</div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    const onLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    };

    return (
        <div className="flex items-center justify-end">
            <div className="flex items-center gap-1 cursor-pointer text-sm text-n800" onClick={onLogout}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.4375 15.1875C8.4375 15.3367 8.37824 15.4798 8.27275 15.5852C8.16726 15.6907 8.02418 15.75 7.875 15.75H3.375C3.22582 15.75 3.08274 15.6907 2.97725 15.5852C2.87176 15.4798 2.8125 15.3367 2.8125 15.1875V2.8125C2.8125 2.66332 2.87176 2.52024 2.97725 2.41475C3.08274 2.30926 3.22582 2.25 3.375 2.25H7.875C8.02418 2.25 8.16726 2.30926 8.27275 2.41475C8.37824 2.52024 8.4375 2.66332 8.4375 2.8125C8.4375 2.96168 8.37824 3.10476 8.27275 3.21025C8.16726 3.31574 8.02418 3.375 7.875 3.375H3.9375V14.625H7.875C8.02418 14.625 8.16726 14.6843 8.27275 14.7898C8.37824 14.8952 8.4375 15.0383 8.4375 15.1875ZM16.148 8.60203L13.3355 5.78953C13.2299 5.68398 13.0868 5.62469 12.9375 5.62469C12.7882 5.62469 12.6451 5.68398 12.5395 5.78953C12.434 5.89508 12.3747 6.03823 12.3747 6.1875C12.3747 6.33677 12.434 6.47992 12.5395 6.58547L14.3923 8.4375H7.875C7.72582 8.4375 7.58274 8.49676 7.47725 8.60225C7.37176 8.70774 7.3125 8.85082 7.3125 9C7.3125 9.14918 7.37176 9.29226 7.47725 9.39775C7.58274 9.50324 7.72582 9.5625 7.875 9.5625H14.3923L12.5395 11.4145C12.434 11.5201 12.3747 11.6632 12.3747 11.8125C12.3747 11.9618 12.434 12.1049 12.5395 12.2105C12.6451 12.316 12.7882 12.3753 12.9375 12.3753C13.0868 12.3753 13.2299 12.316 13.3355 12.2105L16.148 9.39797C16.2003 9.34573 16.2418 9.28369 16.2701 9.2154C16.2984 9.14712 16.3129 9.07392 16.3129 9C16.3129 8.92608 16.2984 8.85288 16.2701 8.7846C16.2418 8.71631 16.2003 8.65427 16.148 8.60203Z"
                        fill="#474D66"
                    />
                </svg>
                로그아웃
            </div>
        </div>
    );
};
