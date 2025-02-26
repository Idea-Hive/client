import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full h-16 text-[#333333] border-b border-[#E0E0E0]">
            <div className="w-full h-full mx-auto max-w-[1328px] min-w-[1000px] flex justify-between items-center px-6">
                <Link href="/" className="text-2xl font-bold text-[#FF7864]">
                    IdeaHive
                </Link>
                <div className="flex-1 max-w-4xl flex justify-between items-center">
                    <Search />
                    <div className="flex gap-5 w-fit">
                        <Link href="/signup" className="text-sm cursor-pointer">
                            아이디어 등록
                        </Link>
                        <Link href="/signup" className="text-sm cursor-pointer">
                            아이디어 찾기
                        </Link>
                        <Link href="/signup" className="text-sm cursor-pointer">
                            아이디어 경매
                        </Link>
                        <Link href="/signup" className="text-sm cursor-pointer">
                            투자&nbsp;/&nbsp;펀딩
                        </Link>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="text-sm border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100">로그인</button>
                    <Link href="/signup">
                        <button className="text-sm bg-[#FF7864] rounded-full px-4 py-2 text-white hover:bg-[#FF7864]/80">회원가입</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const Search = () => {
    return (
        <div className="w-96 h-10 border border-gray-300 rounded-full flex items-center justify-center mr-12 px-4 gap-4">
            <input type="text" placeholder="검색어를 입력해주세요." className="flex-1 h-full outline-none text-sm" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-4 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
    );
};
