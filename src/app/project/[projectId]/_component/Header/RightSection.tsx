"use client";

import Button from "@/components/Button";
import { LikedIcon, ShareIcon, ViewIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function RightSection() {
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
                    29
                </div>
                <div className="flex gap-1.5 items-center">
                    <ViewIcon />
                    290
                </div>
            </div>
            <div className="flex justify-end">
                <Button label="지원하기" className="w-fit px-6" onClick={() => setIsOpenApplicantModal(true)} />
            </div>

            {isOpenApplicantModal && !isOpenApplicantSuccessModal ? (
                <Modal
                    isOpen={isOpenApplicantModal}
                    title="지원하기"
                    children="지원사유를 작성해주세요. 작성자에게 전달됩니다"
                    content={
                        <div className="w-full h-fit mt-4 p-4 bg-n75 border border-n300 rounded-[4px] flex gap-2">
                            <textarea
                                className="w-full h-fit min-h-20 resize-none bg-n75 border-none text-sm text-n800 focus:outline-none"
                                placeholder="지원사유를 작성해주세요. 작성자에게 전달됩니다"
                            />
                            <div className="flex flex-col justify-end text-xs text-n800">0/20</div>
                        </div>
                    }
                    confirmText="지원하기"
                    onClose={() => setIsOpenApplicantModal(false)}
                    onConfirm={() => setIsOpenApplicantSuccessModal(true)}
                />
            ) : (
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
