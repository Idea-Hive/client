import React, { useState, useRef } from "react";
import { MemberResponse } from "@/apis/project/manageApis";
import Button from "@/components/Button";
import { ProfileLargerIcon, CTAButton } from "@/components/icons/icons";
import { useClickOutside } from "@/hooks/hooks";
import Dropbox from "./Dropbox";

interface MemberCardProps {
    member: MemberResponse;
}

const MemberCard = ({ member }: MemberCardProps) => {
    /* TODO */
    const handleGoToDetail = () => {};

    return (
        <div className="w-[270px] h-[232px] border border-n400 bg-n0 rounded-lg hover:shadow-floatingCard ">
            <div className="p-6">
                <div className="flex flex-col">
                    <div className="flex justify-between w-full">
                        {member?.profileUrl ? <img src={member.profileUrl} alt="프로필이미지" className="w-10 h-10 rounded-full object-over" /> : <ProfileLargerIcon />}
                        <MemberSettingDropDown />
                    </div>
                    <div className="flex mt-5 gap-1">
                        <p className="text-n900 text-smEmphasis">{member?.name}</p>
                        <div className="flex justify-center items-center">
                            <p className="text-n800 text-sm">팀장{/* TODO */}</p>
                        </div>
                    </div>
                    <p className="mt-2 text-n900">{member?.job ? member?.job : "-"}</p>
                    <Button className="mt-5" label="프로필" onClick={handleGoToDetail} size="small" btnType="line" />
                </div>
            </div>
        </div>
    );
};

const MemberSettingDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropBoxRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropBoxRef, () => {
        if (isOpen) setIsOpen(false);
    });

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <CTAButton />
            </div>
            {isOpen && (
                <Dropbox
                    items={[
                        {
                            label: "삭제",
                            onClick: () => {
                                console.log("삭제");
                            },
                        },
                        {
                            label: "팀장 변경",
                            onClick: () => {
                                console.log("팀장 변경");
                            },
                        },
                    ]}
                    dropBoxRef={dropBoxRef}
                    className="top-1/2 mt-1 right-0"
                />
            )}
        </div>
    );
};

export default MemberCard;
