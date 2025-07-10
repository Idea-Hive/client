import { CheckIcon, NotCheckIcon, SmallCheckIcon, SmallNotCheckIcon } from "@/components/icons/icons";
import { useState } from "react";
import useSignupStore from "../store/signupStore";
import { terms } from "./termsContent";

export default function TOS() {
    const { formData, setFormData } = useSignupStore();
    const [visibleTerms, setVisibleTerms] = useState<{ [key: string]: boolean }>({
        terms1: false,
        terms2: false,
        terms3: false,
    });

    // 전체 이용약관 동의 onChange
    const handleAllAgreementChange = () => {
        const { terms1, terms2, terms3 } = formData;
        if (terms1 && terms2 && terms3) {
            setFormData("terms1", false);
            setFormData("terms2", false);
            setFormData("terms3", false);
        } else {
            setFormData("terms1", true);
            setFormData("terms2", true);
            setFormData("terms3", true);
        }
    };

    // 개별 이용약관 동의 onChange
    const handleAgreementChange = (type: "terms1" | "terms2" | "terms3") => {
        setFormData(type, !formData[type]);
    };

    // 이용약관 보기/접기 토글
    const toggleTermVisibility = (termId: string) => {
        setVisibleTerms((prev) => ({
            ...prev,
            [termId]: !prev[termId],
        }));
    };

    return (
        <div>
            <div className="border rounded-lg border-[#d8dae5] p-10">
                {/** 전체 이용약관 동의 */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative">
                        <div className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center`} onClick={handleAllAgreementChange}>
                            {formData.terms1 && formData.terms2 && formData.terms3 ? <CheckIcon /> : <NotCheckIcon />}
                        </div>
                    </div>
                    <label className="cursor-pointer text-base font-medium" onClick={handleAllAgreementChange}>
                        전체 이용약관에 동의합니다
                    </label>
                </div>

                {/** 개별 이용약관 동의 */}
                <div className="flex flex-col gap-4">
                    {terms.map((term) => (
                        <div key={term.id} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div
                                        className={`w-5 h-5 rounded-full cursor-pointer flex items-center justify-center`}
                                        onClick={() => handleAgreementChange(term.id as "terms1" | "terms2" | "terms3")}
                                    >
                                        {formData[term.id as keyof typeof formData] ? <SmallCheckIcon /> : <SmallNotCheckIcon />}
                                    </div>
                                </div>
                                <label className="flex-1 cursor-pointer text-sm font-normal" onClick={() => handleAgreementChange(term.id as "terms1" | "terms2" | "terms3")}>
                                    {term.label}
                                </label>
                                <button type="button" onClick={() => toggleTermVisibility(term.id)} className="text-xs font-normal text-[#696f8c] underline">
                                    {visibleTerms[term.id] ? "접기" : "보기"}
                                </button>
                            </div>
                            {visibleTerms[term.id] && (
                                <div
                                    className="h-40 overflow-y-auto p-4 border border-[#e6e8f0] bg-[#f9fafc] rounded text-xs leading-[18px] text-[#8f95b2]"
                                    dangerouslySetInnerHTML={{ __html: term.content }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
