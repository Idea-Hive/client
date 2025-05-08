import Button from "@/components/Button";
import { BottomArrowIcon, HamburgerIcon, SmallUserImgIcon, UserImgIcon } from "@/components/icons/icons";
import Modal from "@/components/Modal";
import { useEffect, useRef, useState } from "react";

export default function ApplicantCard({ state }: { state: "default" | "confirm" | "reject" | "locked" }) {
    if (state === "locked") return <LockedCard />;
    else return <Card state={state} />;
}

const content = `3년차 프론트엔드 개발자 홍길동입니다.<br/>꼭 참여하고 싶습니다.`;

const Card = ({ state }: { state: "default" | "confirm" | "reject" }) => {
    const [isDotsThreeVerticalOpen, setIsDotsThreeVerticalOpen] = useState(false); // DotsThreeVertical Dropdown 오픈
    const dotsThreeVerticalRef = useRef<HTMLDivElement>(null);

    // DotsThreeVertical Dropdown 오픈 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dotsThreeVerticalRef.current && !dotsThreeVerticalRef.current.contains(event.target as Node)) {
                setIsDotsThreeVerticalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [isEdit, setIsEdit] = useState<boolean>(false); // 수정 모드 변경
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false); // 지원 취소 모달 오픈
    const [isSpecOpen, setIsSpecOpen] = useState(true); // 보유 스펙 오픈

    return (
        <div className="w-full border border-n400 rounded-lg p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center">
                        <UserImgIcon />

                        <div className="text-lg text-n900 font-medium flex gap-1 items-center">
                            홍길동{state === "confirm" && <div className="w-fit h-[18px] px-1.5 bg-taskmateRed rounded-[12px] text-[10px] leading-[18px] text-white font-normal">확정</div>}
                        </div>
                    </div>

                    <div className="flex gap-2 items-center text-sm text-n900">
                        <div>백엔드 개발자</div>
                        <div className="w-[1px] h-[15.5px] bg-n300"></div>
                        <div>경력 4년</div>
                        <div className="w-[1px] h-[15.5px] bg-n300"></div>
                        <div>프로젝트 경험 2회</div>
                    </div>
                </div>

                {!isEdit && (
                    <div className="relative" ref={dotsThreeVerticalRef}>
                        <div className=" w-8 h-8 rounded-[4px] border border-n500 flex justify-center items-center cursor-pointer" onClick={() => setIsDotsThreeVerticalOpen(!isDotsThreeVerticalOpen)}>
                            <HamburgerIcon />
                        </div>

                        {isDotsThreeVerticalOpen && (
                            <div className="absolute w-[120px] top-10 right-0 border border-n400 rounded-[4px] shadow-elevation2 bg-white">
                                <button
                                    className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-t-[4px]"
                                    onClick={() => {
                                        setIsDotsThreeVerticalOpen(false);
                                        setIsCancelModalOpen(true);
                                    }}
                                >
                                    지원취소
                                </button>
                                <button
                                    className="w-full h-12 text-sm text-n800 px-3 text-start hover:bg-n75 rounded-b-[4px]"
                                    onClick={() => {
                                        setIsDotsThreeVerticalOpen(false);
                                        setIsEdit(true);
                                    }}
                                >
                                    수정
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isEdit ? (
                <div className="w-full h-fit p-4 border border-n300 rounded-[4px] flex gap-2">
                    <textarea className="w-full h-fit min-h-12 resize-none border-none text-base text-n800 focus:outline-none"></textarea>
                    <div className="flex flex-col justify-end text-xs text-n800">0/20</div>
                </div>
            ) : (
                <div className="text-n900 text-base" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {isEdit && (
                <div className="w-full flex justify-end gap-2">
                    <Button btnType="line" label="취소" size="small" className="w-[74px] !rounded-[4px]" onClick={() => setIsEdit(false)} />
                    <Button btnType="primary" label="저장" size="small" className="w-[74px] !rounded-[4px]" onClick={() => setIsEdit(false)} />
                </div>
            )}

            {!isEdit && (
                <div className="flex flex-col gap-3">
                    <div className="w-fit flex items-center gap-1 text-smEmphasize text-n900 cursor-pointer" onClick={() => setIsSpecOpen(!isSpecOpen)}>
                        보유스펙
                        <BottomArrowIcon isOpen={isSpecOpen} />
                    </div>

                    {isSpecOpen && (
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next", "Styled-components", "RxJS", "svelte", "Redux", "Tanstack-Query", "Redux-toolkit", "Redux-saga"].map((item) => {
                                return (
                                    <button key={item} className="border border-[#d8dae5] text-xs text-n900 rounded-full px-3 h-8 cursor-default pointer-events-none">
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {state === "reject" && (
                <div className="w-full p-6 mt-5 bg-n75 border-t border-n300">
                    <div className="flex items-center gap-2 text-baseEmphasize text-n900 mb-2.5">
                        <SmallUserImgIcon />
                        홍길동
                    </div>

                    <div className="text-base text-n900">프론트엔드 포지션이 마감되었습니다. 지원해주셔서 감사합니다.</div>
                </div>
            )}

            <Modal
                title="지원 취소"
                children="지원을 취소하시겠습니까?"
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={() => {
                    setIsCancelModalOpen(false);
                }}
            />
        </div>
    );
};

const LockedCard = () => {
    return (
        <div className="w-full h-[176px] bg-n75 border border-n300 rounded-lg text-baseEmphasize text-n600 flex gap-2 items-center justify-center">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.75 6.25H14.25V4.375C14.25 3.38044 13.8549 2.42661 13.1517 1.72335C12.4484 1.02009 11.4946 0.625 10.5 0.625C9.50544 0.625 8.55161 1.02009 7.84835 1.72335C7.14509 2.42661 6.75 3.38044 6.75 4.375V6.25H4.25C3.91848 6.25 3.60054 6.3817 3.36612 6.61612C3.1317 6.85054 3 7.16848 3 7.5V16.25C3 16.5815 3.1317 16.8995 3.36612 17.1339C3.60054 17.3683 3.91848 17.5 4.25 17.5H16.75C17.0815 17.5 17.3995 17.3683 17.6339 17.1339C17.8683 16.8995 18 16.5815 18 16.25V7.5C18 7.16848 17.8683 6.85054 17.6339 6.61612C17.3995 6.3817 17.0815 6.25 16.75 6.25ZM8 4.375C8 3.71196 8.26339 3.07607 8.73223 2.60723C9.20107 2.13839 9.83696 1.875 10.5 1.875C11.163 1.875 11.7989 2.13839 12.2678 2.60723C12.7366 3.07607 13 3.71196 13 4.375V6.25H8V4.375ZM16.75 16.25H4.25V7.5H16.75V16.25ZM11.4375 11.875C11.4375 12.0604 11.3825 12.2417 11.2795 12.3958C11.1765 12.55 11.0301 12.6702 10.8588 12.7411C10.6875 12.8121 10.499 12.8307 10.3171 12.7945C10.1352 12.7583 9.9682 12.669 9.83709 12.5379C9.70598 12.4068 9.61669 12.2398 9.58051 12.0579C9.54434 11.876 9.56291 11.6875 9.63386 11.5162C9.70482 11.3449 9.82498 11.1985 9.97915 11.0955C10.1333 10.9925 10.3146 10.9375 10.5 10.9375C10.7486 10.9375 10.9871 11.0363 11.1629 11.2121C11.3387 11.3879 11.4375 11.6264 11.4375 11.875Z"
                    fill="#8F95B2"
                />
            </svg>
            지원자 프로필은 작성자만 열람 가능합니다.
        </div>
    );
};
