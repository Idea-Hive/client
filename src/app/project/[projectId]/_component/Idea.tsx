"use client";

import Button from "@/components/Button";
import { LockIcon } from "@/components/icons/icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

export default function Idea() {
    const [isBlur, setIsBlur] = useState<boolean>(true);

    return (
        <div>
            <div className="text-h3 text-n900 mb-4 flex items-center gap-2">
                아이디어
                <Tooltip.Provider delayDuration={0}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <LockIcon />
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
                <div className={`w-full h-full ${isBlur ? "blur-[4px] text-n500 select-none pointer-events-none" : "text-n900"} text-base`}>
                    사용자는 기획자, 디자이너, 개발자 등의 역할 기반으로 공고를 등록하거나, 관심 있는 프로젝트에 포지션을 지정해 지원할 수 있다. 각 공고는 기본적으로 공개 혹은 제한된 공개(초대형)를
                    설정할 수 있으며, 프로젝트 설명 외에 예상 작업 기간, 필요 인력, 기술 스택, 커뮤니케이션 툴 등의 세부 정보가 포함된다.기간, 필요 인력, 기술 스택, 커뮤니케이션 툴 등의 세부 정보가
                    포함된다.
                </div>
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
                        onClick={() => setIsBlur(!isBlur)}
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                )}
            </div>
        </div>
    );
}
