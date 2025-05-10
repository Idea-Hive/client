"use client";

import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Selectbox from "@/components/Selectbox";
import Textarea from "@/components/Textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { RequiredValues } from "../_types/type";

const RequiredInformations = ({
    requiredValues,
    setRequiredValues,
    errors,
    setErrors,
}: {
    requiredValues: RequiredValues;
    setRequiredValues: Dispatch<SetStateAction<RequiredValues>>;
    errors: { title: string; description: string; idea: string; maxMembers: string; dueDateFrom: string; dueDateTo: string; contact: string };
    setErrors: Dispatch<SetStateAction<{ title: string; description: string; idea: string; maxMembers: string; dueDateFrom: string; dueDateTo: string; contact: string }>>;
}) => {
    const [date, setDate] = useState<{ start: string; end: string }>({
        start: "",
        end: "",
    });

    const handleOpenDatePicker = () => {
        console.log("open date picker");
    };

    return (
        <div className="flex flex-col gap-5 p-10 border border-n400 rounded-lg mb-6 bg-white">
            <h1 className="text-h3 text-black">필수 정보</h1>

            <div className="space-y-5">
                <Input
                    label="프로젝트명"
                    value={requiredValues.title}
                    onChange={(e) => {
                        setRequiredValues((prev) => ({ ...prev, title: e.target.value }));
                        setErrors((prev) => ({ ...prev, title: "" }));
                    }}
                    placeholder="프로젝트명을 입력해주세요"
                    type="text"
                    isRequired={true}
                    children={<div className="text-xs text-n700">{requiredValues.title.length}/20</div>}
                    maxLength={20}
                    isErr={errors.title !== ""}
                    errMsg={errors.title}
                />

                <Textarea
                    label="프로젝트 설명"
                    value={requiredValues.description}
                    onChange={(e) => {
                        setRequiredValues((prev) => ({ ...prev, description: e.target.value }));
                        setErrors((prev) => ({ ...prev, description: "" }));
                    }}
                    placeholder="💡테스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트"
                    isRequired={true}
                    isErr={errors.description !== ""}
                    errMsg={errors.description}
                />

                <Textarea
                    label="아이디어"
                    value={requiredValues.idea}
                    onChange={(e) => {
                        setRequiredValues((prev) => ({ ...prev, idea: e.target.value }));
                        setErrors((prev) => ({ ...prev, idea: "" }));
                    }}
                    placeholder="💡테스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트"
                    isRequired={true}
                    isErr={errors.idea !== ""}
                    errMsg={errors.idea}
                />

                <Input
                    label="연락수단"
                    value={requiredValues.contact}
                    onChange={(e) => {
                        setRequiredValues((prev) => ({ ...prev, contact: e.target.value }));
                        setErrors((prev) => ({ ...prev, contact: "" }));
                    }}
                    placeholder="연락수단을 입력해주세요"
                    type="text"
                    isRequired={true}
                    isErr={errors.contact !== ""}
                    errMsg={errors.contact}
                />

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        <Selectbox
                            label="모집 인원"
                            isRequired={true}
                            placeholder="인원을 선택해주세요"
                            options={[
                                { value: "1", label: "1" },
                                { value: "2", label: "2" },
                                { value: "3", label: "3" },
                                { value: "4", label: "4" },
                                { value: "5", label: "5" },
                            ]}
                            onChange={(value) => {
                                setRequiredValues((prev) => ({ ...prev, maxMembers: parseInt(value) }));
                                setErrors((prev) => ({ ...prev, maxMembers: "" }));
                            }}
                            isErr={errors.maxMembers !== ""}
                            errMsg={errors.maxMembers}
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-2">
                            <label className="flex justify-between items-center">
                                <div className="text-sm font-medium text-gray-700">
                                    예상 일정<span className="text-taskmateRed">*</span>
                                </div>
                                <Checkbox checked={false} value="1" label="미정" onClick={() => {}} />
                            </label>
                            <div
                                className={`flex w-full h-[46px] border ${
                                    errors.dueDateFrom !== "" || errors.dueDateTo !== "" ? "border-red" : "border-n400"
                                } rounded items-center px-3 justify-between cursor-pointer`}
                                onClick={handleOpenDatePicker}
                            >
                                <div className="flex gap-[15px] text-sm">
                                    <div className={`${date.start === "" ? "text-n600" : "text-n800"}`}>2025 / 03 / 27</div>
                                    <div className="text-n800">~</div>
                                    <div className={`${date.end === "" ? "text-n600" : "text-n800"}`}>2025 / 03 / 27</div>
                                </div>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.25 2.5H14.375V1.875C14.375 1.70924 14.3092 1.55027 14.1919 1.43306C14.0747 1.31585 13.9158 1.25 13.75 1.25C13.5842 1.25 13.4253 1.31585 13.3081 1.43306C13.1908 1.55027 13.125 1.70924 13.125 1.875V2.5H6.875V1.875C6.875 1.70924 6.80915 1.55027 6.69194 1.43306C6.57473 1.31585 6.41576 1.25 6.25 1.25C6.08424 1.25 5.92527 1.31585 5.80806 1.43306C5.69085 1.55027 5.625 1.70924 5.625 1.875V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM5.625 3.75V4.375C5.625 4.54076 5.69085 4.69973 5.80806 4.81694C5.92527 4.93415 6.08424 5 6.25 5C6.41576 5 6.57473 4.93415 6.69194 4.81694C6.80915 4.69973 6.875 4.54076 6.875 4.375V3.75H13.125V4.375C13.125 4.54076 13.1908 4.69973 13.3081 4.81694C13.4253 4.93415 13.5842 5 13.75 5C13.9158 5 14.0747 4.93415 14.1919 4.81694C14.3092 4.69973 14.375 4.54076 14.375 4.375V3.75H16.25V6.25H3.75V3.75H5.625ZM16.25 16.25H3.75V7.5H16.25V16.25Z"
                                        fill="#474D66"
                                    />
                                </svg>
                            </div>
                        </div>

                        {errors.dueDateFrom !== "" ? (
                            <div className="text-red text-xs mt-2">{errors.dueDateFrom}</div>
                        ) : errors.dueDateTo !== "" ? (
                            <div className="text-red text-xs mt-2">{errors.dueDateTo}</div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequiredInformations;
