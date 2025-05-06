"use client";

import Pagination from "@/components/Pagination";
import ApplicantCard from "./ApplicantCard";

export default function Applicant() {
    return (
        <div className="w-[718px]">
            <div className="text-h3 text-n900 mb-4 flex items-center gap-2">
                지원자<div className="rounded-full px-1.5 h-[18px] bg-taskmateRed text-xs text-n0">6</div>
            </div>

            <div className="flex flex-col gap-6">
                <ApplicantCard state="default" />
                <ApplicantCard state="confirm" />
                <ApplicantCard state="reject" />
                <ApplicantCard state="locked" />
            </div>

            <div className="mt-10 w-full flex justify-center">
                <Pagination page={1} totalPage={3} onChange={() => {}} />
            </div>
        </div>
    );
}
