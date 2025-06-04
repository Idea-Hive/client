import { Applicant } from "@/apis/project/projectApis";
import { BottomArrowIcon } from "@/components/icons/icons";
import { useState } from "react";

export default function CardBody({ applicant }: { applicant: Applicant }) {
    const [isSpecOpen, setIsSpecOpen] = useState(applicant.skillStacks.length > 0); // 보유 스펙 오픈

    return (
        <>
            <div className="text-n900 text-base" dangerouslySetInnerHTML={{ __html: applicant.applicationMessage }} />
            <div className="flex flex-col gap-3">
                <div className="w-fit flex items-center gap-1 text-smEmphasize text-n900 cursor-pointer" onClick={() => setIsSpecOpen(!isSpecOpen)}>
                    보유스펙
                    <BottomArrowIcon isOpen={isSpecOpen} />
                </div>

                {isSpecOpen && (
                    <div className="flex flex-wrap gap-2">
                        {applicant.skillStacks.length > 0
                            ? applicant.skillStacks.map((item) => {
                                  return (
                                      <button key={item} className="border border-[#d8dae5] text-xs text-n900 rounded-full px-3 h-8 cursor-default pointer-events-none">
                                          {item}
                                      </button>
                                  );
                              })
                            : "보유 스펙이 없습니다."}
                        {/* 보유 스펙 없는 부분 디자인 필요 */}
                    </div>
                )}
            </div>
        </>
    );
}
