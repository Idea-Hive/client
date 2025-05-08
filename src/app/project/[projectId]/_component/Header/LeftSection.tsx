import { SmallUserImgIcon } from "@/components/icons/icons";

export default function LeftSection() {
    return (
        <div>
            <div className="text-taskmateRed text-smEmphasize mb-2">모집중</div>

            <div className="text-h2 text-n900 mb-3 flex items-center">
                태스크메이트 프로젝트 팀원 모집<span className="ml-2 text-h3 text-taskmateRed">D-12</span>
            </div>

            <div className="flex gap-2 items-center mb-6">
                {["온라인모임", "카카오", "정부지원공모전"].map((item) => {
                    return (
                        <div key={item} className="w-fit h-8 px-3 text-n800 text-xs leading-8 rounded-md bg-[#edeff5]">
                            {item}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-2">
                <div className="flex gap-2 items-center">
                    <SmallUserImgIcon />
                    <div className="text-smEmphasize text-n900">홍길동</div>
                </div>

                <div className="flex gap-2 items-center text-sm text-n800">
                    <div>백엔드 개발자</div>
                    <div className="w-[1px] h-[15.5px] bg-n300"></div>
                    <div>경력 4년</div>
                    <div className="w-[1px] h-[15.5px] bg-n300"></div>
                    <div>프로젝트 경험 2회</div>
                    <div>·</div>
                    <div>2025-01-10</div>
                </div>
            </div>
        </div>
    );
}
