import { Dispatch, SetStateAction } from "react";
import { skillCategories } from "../_data/skills";

interface OptionalInformationsProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    selectedSkills: string[];
    setSelectedSkills: Dispatch<SetStateAction<string[]>>;
    selectedCategory: keyof typeof skillCategories;
    setSelectedCategory: Dispatch<SetStateAction<keyof typeof skillCategories>>;
}

const OptionalInformations = ({ searchTerm, setSearchTerm, selectedSkills, setSelectedSkills, selectedCategory, setSelectedCategory }: OptionalInformationsProps) => {
    const handleSkillSelect = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            if (selectedSkills.length < 20) {
                setSelectedSkills([...selectedSkills, skill]);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 border-2 border-gray-300 rounded-lg mb-4 bg-white shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">선택 정보</h1>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="기술 검색"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* 1depth - 카테고리 열 */}
                        <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
                            {Object.entries(skillCategories).map(([value, category]) => (
                                <div
                                    key={value}
                                    onClick={() => setSelectedCategory(value as keyof typeof skillCategories)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedCategory === value ? "bg-blue-50" : ""}`}
                                >
                                    {category.label}
                                </div>
                            ))}
                        </div>

                        {/* 2depth - 기술 목록 열 */}
                        <div className="flex-1 border border-gray-300 rounded-lg overflow-y-auto max-h-[400px]">
                            {skillCategories[selectedCategory].skills.map((skill) => (
                                <div
                                    key={skill}
                                    onClick={() => handleSkillSelect(skill)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedSkills.includes(skill) ? "bg-yellow-50" : ""}`}
                                >
                                    {skill}
                                    {selectedSkills.includes(skill) && <span className="float-right">✓</span>}
                                </div>
                            ))}
                        </div>

                        {/* 3depth - 선택된 기술 열 */}
                        <div className="flex-1 border border-gray-300 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>{selectedSkills.length}/20</span>
                                <button className="text-blue-500 hover:text-blue-600" onClick={() => setSelectedSkills([])}>
                                    전체삭제
                                </button>
                            </div>
                            <div className="space-y-2">
                                {selectedSkills.map((skill) => (
                                    <div key={skill} className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-lg">
                                        <span>{skill}</span>
                                        <button onClick={() => handleSkillSelect(skill)} className="text-gray-500 hover:text-gray-700">
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptionalInformations;
