import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";

export default function SearchAndSort({
    setSearchTerm,
    sortType,
    setSortType,
}: {
    setSearchTerm: (value: string) => void;
    sortType: "RECENT" | "DEADLINE";
    setSortType: (value: "RECENT" | "DEADLINE") => void;
}) {
    const search = useInput("");

    return (
        <div className="mb-4 mt-[26px] flex justify-between items-center">
            <div className="w-[384px]">
                <Input
                    {...search}
                    placeholder="검색어를 입력해주세요"
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearchTerm(search.value);
                        }
                    }}
                    children={
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                            <path
                                d="M17.9421 17.0577L14.0304 13.1468C15.1642 11.7856 15.7295 10.0398 15.6089 8.27238C15.4882 6.50499 14.6908 4.85216 13.3825 3.65772C12.0743 2.46328 10.3559 1.8192 8.58486 1.85944C6.81382 1.89969 5.12647 2.62118 3.87383 3.87383C2.62118 5.12647 1.89969 6.81382 1.85944 8.58486C1.8192 10.3559 2.46328 12.0743 3.65772 13.3825C4.85216 14.6908 6.50499 15.4882 8.27238 15.6089C10.0398 15.7295 11.7856 15.1642 13.1468 14.0304L17.0577 17.9421C17.1158 18.0002 17.1848 18.0463 17.2606 18.0777C17.3365 18.1091 17.4178 18.1253 17.4999 18.1253C17.5821 18.1253 17.6634 18.1091 17.7392 18.0777C17.8151 18.0463 17.8841 18.0002 17.9421 17.9421C18.0002 17.8841 18.0463 17.8151 18.0777 17.7392C18.1091 17.6634 18.1253 17.5821 18.1253 17.4999C18.1253 17.4178 18.1091 17.3365 18.0777 17.2606C18.0463 17.1848 18.0002 17.1158 17.9421 17.0577ZM3.12493 8.74993C3.12493 7.63741 3.45483 6.54988 4.07292 5.62485C4.691 4.69982 5.5695 3.97885 6.59734 3.55311C7.62517 3.12737 8.75617 3.01597 9.84732 3.23302C10.9385 3.45006 11.9407 3.98579 12.7274 4.77246C13.5141 5.55913 14.0498 6.56141 14.2669 7.65255C14.4839 8.74369 14.3725 9.87469 13.9468 10.9025C13.521 11.9304 12.8 12.8089 11.875 13.4269C10.95 14.045 9.86245 14.3749 8.74993 14.3749C7.2586 14.3733 5.82882 13.7801 4.77428 12.7256C3.71975 11.671 3.12659 10.2413 3.12493 8.74993Z"
                                fill="#474D66"
                            />
                        </svg>
                    }
                />
            </div>
            <div className="flex gap-4 items-center text-sm">
                <div className={`cursor-pointer ${sortType === "RECENT" ? "text-taskmateRed" : "text-n700"}`} onClick={() => setSortType("RECENT")}>
                    최신순
                </div>
                <div className={`cursor-pointer ${sortType === "DEADLINE" ? "text-taskmateRed" : "text-n700"}`} onClick={() => setSortType("DEADLINE")}>
                    마감임박순
                </div>
            </div>
        </div>
    );
}
