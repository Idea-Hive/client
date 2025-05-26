"use client";

import { ProjectDetailData } from "@/apis/project/projectApis";
import { User } from "@/apis/user/userApis";
import Button from "@/components/Button";
import { LikedIcon, ShareIcon, ViewIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function RightSection({ data, user }: { data: ProjectDetailData; user: User | undefined }) {
    const [isOpenApplicantModal, setIsOpenApplicantModal] = useState<boolean>(false);
    const [isOpenApplicantSuccessModal, setIsOpenApplicantSuccessModal] = useState<boolean>(false);

    return (
        <div className="flex flex-col justify-between">
            <div className="flex gap-3 items-center text-sm text-black">
                <div className="flex gap-1.5 items-center">
                    <ShareIcon />
                    공유하기
                </div>
                <div className="flex gap-1.5 items-center">
                    <LikedIcon />
                    {data.likedCnt}
                </div>
                <div className="flex gap-1.5 items-center">
                    <ViewIcon />
                    {data.viewCnt}
                </div>
            </div>
            <div className="flex justify-end">
                <Button label="지원하기" className="w-fit px-6" onClick={() => setIsOpenApplicantModal(true)} />
            </div>

            {/* 지원하기 모달 */}
            {isOpenApplicantModal && (
                <Modal
                    isOpen={isOpenApplicantModal}
                    title="지원하기"
                    children="지원사유를 작성해주세요. 작성자에게 전달됩니다"
                    content={<ApplicationReasonTextarea />}
                    confirmText="지원하기"
                    onClose={() => setIsOpenApplicantModal(false)}
                    onConfirm={() => {
                        setIsOpenApplicantModal(false);
                        setIsOpenApplicantSuccessModal(true);
                    }}
                />
            )}

            {/* 지원 완료 모달 */}
            {isOpenApplicantSuccessModal && (
                <Modal
                    isOpen={isOpenApplicantSuccessModal}
                    title="지원 완료"
                    children="지원이 완료되었습니다"
                    onConfirm={() => {
                        setIsOpenApplicantSuccessModal(false);
                        setIsOpenApplicantModal(false);
                    }}
                />
            )}
        </div>
    );
}

const ApplicationReasonTextarea = () => {
    return (
        <div className="w-full h-fit mt-4 p-4 bg-n75 border border-n300 rounded-[4px] flex gap-2">
            <textarea className="w-full h-fit min-h-20 resize-none bg-n75 border-none text-sm text-n800 focus:outline-none" placeholder="지원사유를 작성해주세요. 작성자에게 전달됩니다" />
            <div className="flex flex-col justify-end text-xs text-n800">0/20</div>
        </div>
    );
};
