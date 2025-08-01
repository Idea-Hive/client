"use client";

import Pagination from "@/components/Pagination";
import { useUserInfo } from "@/hooks/queries";
import { useParams } from "next/navigation";
import { useApplicantInfo, useProjectDetail } from "../../hooks/Hooks";
import ApplicantCard from "./ApplicantCard";

export default function Applicant() {
    const { projectId } = useParams();

    const { user } = useUserInfo();
    const { project } = useProjectDetail(Number(projectId), user);
    const { applicantData } = useApplicantInfo(Number(projectId));

    if (!applicantData || !project) return null;
    return (
        <div className="w-[718px]">
            <div className="text-h3 text-n900 mb-4 flex items-center gap-2">
                지원자<div className="rounded-full px-1.5 h-[18px] bg-taskmateRed text-xs text-n0">{applicantData.applicants?.length}</div>
            </div>

            <div className="flex flex-col gap-6">
                {applicantData.applicants && applicantData.applicants.length > 0 ? (
                    applicantData.applicants.map((applicant) => {
                        return <ApplicantCard key={applicant.applyId} applicant={applicant} projectCreatorName={project.creatorName} />;
                    })
                ) : (
                    <div className="flex flex-col items-center gap-3 mt-5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM11.25 12.75V7.5C11.25 7.30109 11.329 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.671 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75ZM13.125 16.125C13.125 16.3475 13.059 16.565 12.9354 16.75C12.8118 16.935 12.6361 17.0792 12.4305 17.1644C12.225 17.2495 11.9988 17.2718 11.7805 17.2284C11.5623 17.185 11.3618 17.0778 11.2045 16.9205C11.0472 16.7632 10.94 16.5627 10.8966 16.3445C10.8532 16.1262 10.8755 15.9 10.9606 15.6945C11.0458 15.4889 11.19 15.3132 11.375 15.1896C11.56 15.066 11.7775 15 12 15C12.2984 15 12.5845 15.1185 12.7955 15.3295C13.0065 15.5405 13.125 15.8266 13.125 16.125Z"
                                fill="#8F95B2"
                            />
                        </svg>
                        <div className="text-base text-n800">지원자가 없습니다.</div>
                    </div>
                )}
            </div>

            <div className="mt-10 w-full flex justify-center">
                {applicantData.applicants && applicantData.applicants.length > 0 && <Pagination page={1} viewPerPage={10} total={applicantData.applicants.length} onChange={() => {}} />}
            </div>
        </div>
    );
}
