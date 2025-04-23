import { Dispatch, SetStateAction } from "react";
import { RequiredValues } from "../_types/type";

const RequiredInformations = ({ requiredValues, setRequiredValues }: { requiredValues: RequiredValues; setRequiredValues: Dispatch<SetStateAction<RequiredValues>> }) => {
    return (
        <div className="flex flex-col gap-6 p-6 border-2 border-gray-300 rounded-lg mb-4 bg-white shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">필수 정보</h1>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        프로젝트명
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={requiredValues.name}
                        onChange={(e) => setRequiredValues((prev) => ({ ...prev, name: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="프로젝트 이름을 입력하세요"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">
                        프로젝트 설명
                    </label>
                    <textarea
                        id="description"
                        value={requiredValues.description}
                        onChange={(e) => setRequiredValues((prev) => ({ ...prev, description: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="idea" className="text-sm font-medium text-gray-700">
                        아이디어
                    </label>
                    <textarea
                        id="idea"
                        value={requiredValues.idea}
                        onChange={(e) => setRequiredValues((prev) => ({ ...prev, idea: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="프로젝트 아이디어를 자세히 설명해주세요"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="peopleNumber" className="text-sm font-medium text-gray-700">
                            모집 인원
                        </label>
                        <select
                            id="peopleNumber"
                            value={requiredValues.peopleNumber}
                            onChange={(e) => setRequiredValues((prev) => ({ ...prev, peopleNumber: Number(e.target.value) }))}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value={0}>인원 선택</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                    {num}명
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-gray-700">예상 일정</label>
                        <div className="flex gap-2">
                            <input
                                id="startDate"
                                type="date"
                                value={requiredValues.startDate}
                                onChange={(e) => setRequiredValues((prev) => ({ ...prev, startDate: e.target.value }))}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex-1"
                            />
                            <span className="flex items-center">~</span>
                            <input
                                id="endDate"
                                type="date"
                                value={requiredValues.endDate}
                                onChange={(e) => setRequiredValues((prev) => ({ ...prev, endDate: e.target.value }))}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all flex-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="link" className="text-sm font-medium text-gray-700">
                        관련 링크
                    </label>
                    <input
                        id="link"
                        type="url"
                        value={requiredValues.link}
                        onChange={(e) => setRequiredValues((prev) => ({ ...prev, link: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="관련 링크를 입력하세요 (선택사항)"
                    />
                </div>
            </div>
        </div>
    );
};

export default RequiredInformations;
