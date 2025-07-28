"use client";

import Spinner from "@/components/Spinner";
import { useUserInfo } from "@/hooks/queries";

export default function ProfileInfo() {
    const { user, userIsPending } = useUserInfo();

    if (userIsPending) return <Spinner />;
    if (!user) return null;
    return (
        <div className="w-full py-5 px-6 bg-n50 border border-n400 rounded-xl">
            <div className="text-h3 text-n900 mb-4">프로필</div>
            <div className="flex gap-4 items-center">
                <div className="text-smEmphasize text-n900 w-[50px] flex flex-col gap-2">
                    <div>닉네임</div>
                    <div>경력</div>
                    <div>직업</div>
                    <div>이메일</div>
                    <div className="leading-8">보유기술</div>
                </div>

                <div className="text-sm text-n800 flex-1 flex flex-col gap-2">
                    <div>{user.name}</div>
                    <div>경력 {user.career || 0}년</div>
                    <div>{user.job || "직업 미정"}</div>
                    <div>{user.email}</div>
                    <div className="flex items-center gap-2">
                        {user.SkillStacks.length > 0 ? (
                            user.SkillStacks.map((v) => {
                                return (
                                    <div key={v.id} className=" py-1.5 px-3 text-taskmateRed text-sm bg-taskmateRed/10 rounded-full">
                                        {v.name}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-sm text-n800 leading-8">보유기술이 없습니다.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
