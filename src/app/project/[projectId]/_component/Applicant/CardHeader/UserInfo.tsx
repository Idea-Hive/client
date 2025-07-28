import { Applicant } from "@/apis/project/projectApis";
import { UserImgIcon } from "@/components/icons/icons";
import { CardState } from "../ApplicantCard";

export default function UserInfo({ applicant, state }: { applicant: Applicant; state: CardState }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
                <UserImgIcon />

                <div className="text-lg text-n900 font-medium flex gap-1 items-center">
                    {applicant.name && applicant.name.length > 6 ? `${applicant.name.slice(0, 6)}...` : applicant.name}
                    {state === "CONFIRMED" && <div className="w-fit h-fit px-2 py-[3px] bg-blue rounded-[12px] text-xs text-white font-normal">확정</div>}
                    {applicant.isReApplication && <div className="text-baseEmphasize text-taskmateRed ml-1">재지원</div>}
                </div>
            </div>

            <div className="flex gap-2 items-center text-sm text-n900">
                {applicant.job && (
                    <>
                        <div>{applicant.job}</div>
                        <div className="w-[1px] h-[15.5px] bg-n300"></div>
                    </>
                )}

                <div>경력 {applicant.career || 0}년</div>
                <div className="w-[1px] h-[15.5px] bg-n300"></div>
                <div>프로젝트 경험 {applicant.completedProjectCnt}회</div>
            </div>
        </div>
    );
}
