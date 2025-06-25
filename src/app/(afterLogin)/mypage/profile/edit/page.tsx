"use client";

import { editProfileApi } from "@/apis/user/userApis";
import { skillCategories } from "@/app/(afterLogin)/project/create/_data/skills";
import { useUserInfo } from "@/app/project/[projectId]/hooks/Hooks";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Selectbox from "@/components/Selectbox";
import { useInput } from "@/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function EditProfile() {
    const { user } = useUserInfo();
    console.log("user:::", user);

    const nickname = useInput(""); // 닉네임
    const email = useInput(""); // 이메일
    const job = useInput(""); // 직업

    useEffect(() => {
        if (user) {
            nickname.resetValue(user.name || "");
            email.resetValue(user.email || "");
            job.resetValue(user.job || "");
        }
    }, [user]);

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof skillCategories>("frontend");

    const handleSkillSelect = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
            // setSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            if (selectedSkills.length < 20) {
                setSelectedSkills([...selectedSkills, skill]);
                // setSkills([...selectedSkills, skill]);
            }
        }
    };

    const editProfileMutation = useMutation({
        mutationFn: editProfileApi,
    });

    const handleSubmit = () => {
        editProfileMutation.mutate({
            email: email.value,
        });
    };

    return (
        <>
            <div className="h-[50px] text-h2 text-n900 flex items-center gap-2.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.5307 18.9694C15.6004 19.0391 15.6557 19.1218 15.6934 19.2129C15.7311 19.3039 15.7505 19.4015 15.7505 19.5001C15.7505 19.5986 15.7311 19.6962 15.6934 19.7872C15.6557 19.8783 15.6004 19.961 15.5307 20.0307C15.461 20.1004 15.3783 20.1556 15.2873 20.1933C15.1962 20.2311 15.0986 20.2505 15.0001 20.2505C14.9016 20.2505 14.804 20.2311 14.7129 20.1933C14.6219 20.1556 14.5392 20.1004 14.4695 20.0307L6.96948 12.5307C6.89974 12.461 6.84443 12.3783 6.80668 12.2873C6.76894 12.1962 6.74951 12.0986 6.74951 12.0001C6.74951 11.9015 6.76894 11.8039 6.80668 11.7128C6.84443 11.6218 6.89974 11.5391 6.96948 11.4694L14.4695 3.96943C14.6102 3.8287 14.8011 3.74963 15.0001 3.74963C15.1991 3.74963 15.39 3.8287 15.5307 3.96943C15.6715 4.11016 15.7505 4.30103 15.7505 4.50005C15.7505 4.69907 15.6715 4.88995 15.5307 5.03068L8.56041 12.0001L15.5307 18.9694Z"
                        fill="#474D66"
                    />
                </svg>
                프로필 수정
            </div>

            <form className="w-[780px] border border-n400 rounded-lg p-10 flex flex-col gap-5">
                <Input {...email} label="이메일" placeholder="이메일을 입력해주세요" type="email" isRequired={true} disabled={user?.type !== "email"} />
                <Input {...nickname} label="닉네임" placeholder="닉네임을 입력해주세요" type="text" isRequired={true} />
                <Input {...job} label="직업" placeholder="직업을 입력해주세요" type="text" />
                <Selectbox
                    label="경력"
                    placeholder="경력을 선택해주세요"
                    options={[
                        { value: "1", label: "1년" },
                        { value: "2", label: "2년" },
                        { value: "3", label: "3년" },
                        { value: "4", label: "4년" },
                    ]}
                    initialValue={user?.career ? user.career.toString() : undefined}
                />

                <div>
                    <div className="text-sm font-medium text-n800 mb-3">보유기술</div>
                    <div className="flex border rounded-[4px] border-n400 h-fit max-h-[252px]">
                        {/* 1depth - 카테고리 열 */}
                        <div className="flex-1 border-r border-n400 rounded-l-[4px] overflow-auto">
                            {Object.entries(skillCategories).map(([value, category], index, array) => (
                                <div
                                    key={value}
                                    onClick={() => setSelectedCategory(value as keyof typeof skillCategories)}
                                    className={`h-9 text-sm leading-9 text-n800 px-3 cursor-pointer hover:bg-n75 ${selectedCategory === value ? "bg-n75" : ""} ${
                                        index !== array.length - 1 ? "border-b border-n300" : ""
                                    }`}
                                >
                                    {category.label}
                                </div>
                            ))}
                        </div>

                        {/* 2depth - 기술 목록 열 */}
                        <div className="flex-1 border-r border-n400 overflow-y-auto max-h-[400px]">
                            {skillCategories[selectedCategory].skills.map((skill) => (
                                <div key={skill} className={`h-9 px-2.5 py-0.5`}>
                                    <button
                                        type="button"
                                        title={skill}
                                        className={`h-8 px-3 rounded-full text-sm text-n800 overflow-hidden whitespace-nowrap text-ellipsis max-w-[180px] ${
                                            selectedSkills.includes(skill) ? "bg-taskmateRed bg-opacity-10 border border-taskmateRed text-taskmateRed" : "border-none bg-white text-n800"
                                        }`}
                                        onClick={() => handleSkillSelect(skill)}
                                    >
                                        {skill}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* 3depth - 선택된 기술 열 */}
                        <div className="flex-1 rounded-r-[4px] p-3 flex flex-wrap content-start gap-3">
                            {selectedSkills.map((skill) => (
                                <div key={skill} className="flex items-center gap-1">
                                    <span className="text-taskmateRed text-sm">{skill}</span>
                                    <button onClick={() => handleSkillSelect(skill)} className="text-gray-500 hover:text-gray-700">
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.9137 10.628C11.9544 10.6686 11.9866 10.7169 12.0086 10.77C12.0306 10.8231 12.0419 10.88 12.0419 10.9375C12.0419 10.995 12.0306 11.0519 12.0086 11.105C11.9866 11.1581 11.9544 11.2064 11.9137 11.247C11.8731 11.2877 11.8248 11.3199 11.7717 11.3419C11.7186 11.3639 11.6617 11.3752 11.6042 11.3752C11.5467 11.3752 11.4898 11.3639 11.4367 11.3419C11.3836 11.3199 11.3353 11.2877 11.2947 11.247L7.66669 7.61851L4.03872 11.247C3.95662 11.3291 3.84528 11.3752 3.72919 11.3752C3.61309 11.3752 3.50175 11.3291 3.41965 11.247C3.33756 11.1649 3.29144 11.0536 3.29144 10.9375C3.29144 10.8214 3.33756 10.7101 3.41965 10.628L7.04817 7L3.41965 3.37203C3.33756 3.28994 3.29144 3.1786 3.29144 3.0625C3.29144 2.9464 3.33756 2.83506 3.41965 2.75297C3.50175 2.67088 3.61309 2.62476 3.72919 2.62476C3.84528 2.62476 3.95662 2.67088 4.03872 2.75297L7.66669 6.38148L11.2947 2.75297C11.3767 2.67088 11.4881 2.62476 11.6042 2.62476C11.7203 2.62476 11.8316 2.67088 11.9137 2.75297C11.9958 2.83506 12.0419 2.9464 12.0419 3.0625C12.0419 3.1786 11.9958 3.28994 11.9137 3.37203L8.2852 7L11.9137 10.628Z"
                                                fill="#8F95B2"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button label="저장" className="w-[150px] mx-auto my-2" onClick={() => {}} />
            </form>
        </>
    );
}
