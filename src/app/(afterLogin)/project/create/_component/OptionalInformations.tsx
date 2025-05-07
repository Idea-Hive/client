import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { skillCategories } from "../_data/skills";

interface OptionalInformationsProps {
    setHashTags: Dispatch<SetStateAction<string[]>>;
    setSkills: Dispatch<SetStateAction<string[]>>;
}

const OptionalInformations = ({ setHashTags: setHashTagsProps, setSkills }: OptionalInformationsProps) => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof skillCategories>("frontend");

    const hashTag = useInput("");
    const [hashTags, setHashTags] = useState<string[]>([]);

    const handleHashTagSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && hashTag.value.trim()) {
            e.preventDefault();
            if (!hashTags.includes(hashTag.value.trim())) {
                setHashTags([...hashTags, hashTag.value.trim()]);
                setHashTagsProps([...hashTags, hashTag.value.trim()]);
                hashTag.reset();
            }
        }
    };

    const removeHashTag = (tagToRemove: string) => {
        setHashTags(hashTags.filter((tag) => tag !== tagToRemove));
        setHashTagsProps(hashTags.filter((tag) => tag !== tagToRemove));
    };

    const handleSkillSelect = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
            setSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            if (selectedSkills.length < 20) {
                setSelectedSkills([...selectedSkills, skill]);
                setSkills([...selectedSkills, skill]);
            }
        }
    };

    return (
        <div className="flex flex-col gap-5 p-10 border border-n400 rounded-lg mb-6 bg-white">
            <h1 className="text-h3 text-black">선택 정보</h1>

            <div>
                <div className="w-[350px]">
                    <Input
                        label="프로젝트 해시태그"
                        value={hashTag.value}
                        onChange={(e) => {
                            hashTag.onChange(e);
                        }}
                        onKeyDown={handleHashTagSubmit}
                        placeholder="해시태그를 입력해주세요"
                        type="text"
                    />
                    {hashTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {hashTags.map((tag) => (
                                <div key={tag} className="flex items-center gap-1 px-3 h-8 rounded-md bg-n200">
                                    <div className="text-xs text-n800">{tag}</div>
                                    <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => removeHashTag(tag)}>
                                        <path
                                            d="M12.8538 12.1463C12.9002 12.1927 12.9371 12.2479 12.9622 12.3086C12.9873 12.3693 13.0003 12.4343 13.0003 12.5C13.0003 12.5657 12.9873 12.6308 12.9622 12.6915C12.9371 12.7522 12.9002 12.8073 12.8538 12.8538C12.8073 12.9002 12.7521 12.9371 12.6915 12.9622C12.6308 12.9874 12.5657 13.0003 12.5 13.0003C12.4343 13.0003 12.3693 12.9874 12.3086 12.9622C12.2479 12.9371 12.1927 12.9002 12.1463 12.8538L8 8.70691L3.85375 12.8538C3.75993 12.9476 3.63269 13.0003 3.5 13.0003C3.36732 13.0003 3.24007 12.9476 3.14625 12.8538C3.05243 12.76 2.99973 12.6327 2.99973 12.5C2.99973 12.3674 3.05243 12.2401 3.14625 12.1463L7.29313 8.00003L3.14625 3.85378C3.05243 3.75996 2.99973 3.63272 2.99973 3.50003C2.99973 3.36735 3.05243 3.2401 3.14625 3.14628C3.24007 3.05246 3.36732 2.99976 3.5 2.99976C3.63269 2.99976 3.75993 3.05246 3.85375 3.14628L8 7.29316L12.1463 3.14628C12.2401 3.05246 12.3673 2.99976 12.5 2.99976C12.6327 2.99976 12.7599 3.05246 12.8538 3.14628C12.9476 3.2401 13.0003 3.36735 13.0003 3.50003C13.0003 3.63272 12.9476 3.75996 12.8538 3.85378L8.70688 8.00003L12.8538 12.1463Z"
                                            fill="#474D66"
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
                                    className={`h-8 px-3 rounded-full text-sm text-n800 ${
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
        </div>
    );
};

export default OptionalInformations;
