"use client";

import { skillCategories } from "@/app/(afterLogin)/project/create/_data/skills";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Selectbox from "@/components/Selectbox";
import { useInput } from "@/hooks/hooks";
import { useState } from "react";

export default function EditProfile() {
    const nickname = useInput(""); // 닉네임
    const email = useInput(""); // 이메일
    const job = useInput(""); // 직업

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

    return (
        <div className="p-10">
            <div className="flex items-center gap-2.5 text-h2 text-n900 mb-[38px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7662 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H10.0603L11.7806 14.4694C11.8503 14.5391 11.9056 14.6218 11.9433 14.7128C11.981 14.8039 12.0004 14.9015 12.0004 15C12.0004 15.0985 11.981 15.1961 11.9433 15.2872C11.9056 15.3782 11.8503 15.4609 11.7806 15.5306C11.7109 15.6003 11.6282 15.6556 11.5372 15.6933C11.4461 15.731 11.3486 15.7504 11.25 15.7504C11.1515 15.7504 11.0539 15.731 10.9628 15.6933C10.8718 15.6556 10.7891 15.6003 10.7194 15.5306L7.71938 12.5306C7.64965 12.461 7.59433 12.3783 7.55658 12.2872C7.51884 12.1962 7.49941 12.0986 7.49941 12C7.49941 11.9014 7.51884 11.8038 7.55658 11.7128C7.59433 11.6217 7.64965 11.539 7.71938 11.4694L10.7194 8.46937C10.8601 8.32864 11.051 8.24958 11.25 8.24958C11.449 8.24958 11.6399 8.32864 11.7806 8.46937C11.9214 8.61011 12.0004 8.80098 12.0004 9C12.0004 9.19902 11.9214 9.38989 11.7806 9.53063L10.0603 11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z"
                        fill="#474D66"
                    />
                </svg>
                프로필 수정
            </div>

            <form className="w-[780px] mx-auto border border-n400 rounded-lg p-10 flex flex-col gap-5">
                <Input {...email} label="이메일" placeholder="이메일을 입력해주세요" type="email" isRequired={true} />
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
        </div>
    );
}
