"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { Tooltip } from "radix-ui";
import { useState } from "react";

export default function Idea({ idea }: { idea: string }) {
    const [isBlur, setIsBlur] = useState<boolean>(true);
    const [ideaOpenModal, setIdeaOpenModal] = useState<boolean>(false);

    return (
        <div>
            <div className="text-h3 text-n900 mb-4 flex items-center gap-2">
                아이디어
                <Tooltip.Provider delayDuration={0}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            {/** 여기 아이콘은 컴포넌트화 하면 tooltip이 안먹힘 */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                                <path
                                    d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM9.375 10.625V6.25C9.375 6.08424 9.44085 5.92527 9.55806 5.80806C9.67527 5.69085 9.83424 5.625 10 5.625C10.1658 5.625 10.3247 5.69085 10.4419 5.80806C10.5592 5.92527 10.625 6.08424 10.625 6.25V10.625C10.625 10.7908 10.5592 10.9497 10.4419 11.0669C10.3247 11.1842 10.1658 11.25 10 11.25C9.83424 11.25 9.67527 11.1842 9.55806 11.0669C9.44085 10.9497 9.375 10.7908 9.375 10.625ZM10.9375 13.4375C10.9375 13.6229 10.8825 13.8042 10.7795 13.9583C10.6765 14.1125 10.5301 14.2327 10.3588 14.3036C10.1875 14.3746 9.99896 14.3932 9.81711 14.357C9.63525 14.3208 9.4682 14.2315 9.33709 14.1004C9.20598 13.9693 9.11669 13.8023 9.08052 13.6204C9.04434 13.4385 9.06291 13.25 9.13387 13.0787C9.20482 12.9074 9.32499 12.761 9.47916 12.658C9.63333 12.555 9.81458 12.5 10 12.5C10.2486 12.5 10.4871 12.5988 10.6629 12.7746C10.8387 12.9504 10.9375 13.1889 10.9375 13.4375Z"
                                    fill="#8F95B2"
                                />
                            </svg>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="rounded-md bg-[#1e2124] px-3 py-1.5 text-sm leading-[18px] text-white" side="right" align="center" sideOffset={4}>
                                프로필을 전달하고 아이디어를 확인하세요
                                <Tooltip.Arrow className="fill-[#1e2124]" />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </div>
            <div className="relative w-[718px] h-fit bg-n0 border border-n400 rounded-lg p-6">
                <div className={`w-full h-full ${isBlur ? "blur-[4px] text-n500 select-none pointer-events-none" : "text-n900"} text-base`}>{idea}</div>
                {isBlur && (
                    <Button
                        btnType="line_red"
                        size="small"
                        label={
                            <div className="flex items-center gap-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.96063 1.5 9.825 2.1875 10.01 3.09938C10.0375 3.22823 10.1147 3.34104 10.2249 3.41328C10.335 3.48551 10.4693 3.51135 10.5984 3.48516C10.7275 3.45898 10.8411 3.38289 10.9144 3.27343C10.9877 3.16397 11.0149 3.03 10.99 2.90062C10.7075 1.50937 9.45 0.5 8 0.5C7.2046 0.500827 6.44202 0.817163 5.87959 1.37959C5.31716 1.94202 5.00083 2.7046 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM13 13H3V6H13V13Z"
                                        fill="#FF6363"
                                    />
                                </svg>
                                잠금 해제하기
                            </div>
                        }
                        onClick={() => setIdeaOpenModal(true)}
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                )}
            </div>

            <Modal
                isOpen={ideaOpenModal}
                title="아이디어 열람 확인"
                children={<div>해당 아이디어는 보호를 위해 열람 시 지원자의 프로필 정보가 작성자에게 자동 전달됩니다. 아이디어 도용 방지를 위한 조치이니, 열람 전 신중히 확인해주세요.</div>}
                cancelText="닫기"
                confirmText="열람하기"
                onClose={() => setIdeaOpenModal(false)}
                onConfirm={() => {
                    setIsBlur(false);
                    setIdeaOpenModal(false);
                }}
            />
        </div>
    );
}
