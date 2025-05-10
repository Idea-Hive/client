interface PaginationProps {
    page: number;
    viewPerPage: number;
    total: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, viewPerPage, total, onChange }: PaginationProps) {
    const totalPage = Math.ceil(total / viewPerPage);

    const renderPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPage > 7;

        if (showEllipsis) {
            if (page <= 3) {
                // 1 2 3 4 5 ... {totalPage}
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPage);
            } else if (page >= totalPage - 2) {
                // 1 ... {totalPage-4} {totalPage-3} {totalPage-2} {totalPage-1} {totalPage}
                pages.push(1);
                pages.push("...");
                for (let i = totalPage - 4; i <= totalPage; i++) {
                    pages.push(i);
                }
            } else {
                // 1 ... {page-1} {page} {page+1} ... {totalPage}
                pages.push(1);
                pages.push("...");
                pages.push(page - 1);
                pages.push(page);
                pages.push(page + 1);
                pages.push("...");
                pages.push(totalPage);
            }
        } else {
            // 전체 페이지가 7페이지 이하일 경우 모든 페이지 번호 표시
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => page > 1 && onChange(page - 1)} disabled={page === 1} className="w-8 h-8 rounded-[4px] border border-n400 flex items-center justify-center cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.64597 7.64625L9.64597 2.64625C9.69243 2.59979 9.74758 2.56294 9.80827 2.5378C9.86897 2.51266 9.93402 2.49972 9.99972 2.49972C10.0654 2.49972 10.1305 2.51266 10.1912 2.5378C10.2519 2.56294 10.307 2.59979 10.3535 2.64625C10.3999 2.6927 10.4368 2.74785 10.4619 2.80855C10.4871 2.86924 10.5 2.9343 10.5 3C10.5 3.06569 10.4871 3.13075 10.4619 3.19144C10.4368 3.25214 10.3999 3.30729 10.3535 3.35375L5.7066 8L10.3535 12.6462C10.4473 12.7401 10.5 12.8673 10.5 13C10.5 13.1327 10.4473 13.2599 10.3535 13.3537C10.2597 13.4476 10.1324 13.5003 9.99972 13.5003C9.86704 13.5003 9.73979 13.4476 9.64597 13.3537L4.64597 8.35375C4.59948 8.30731 4.5626 8.25217 4.53744 8.19147C4.51228 8.13077 4.49933 8.0657 4.49933 8C4.49933 7.93429 4.51228 7.86923 4.53744 7.80853C4.5626 7.74783 4.59948 7.69268 4.64597 7.64625Z"
                        fill="#474D66"
                    />
                </svg>
            </button>

            <div className="flex gap-2">
                {renderPageNumbers().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === "number" && onChange(number)}
                        className={`w-8 h-8 rounded-[4px] cursor-pointer text-n800 text-base ${
                            page === number ? "bg-taskmateRed text-white text-baseEmphasize" : typeof number === "string" ? "" : "hover:bg-taskmateRed hover:text-white"
                        } ${typeof number === "string" ? "cursor-default" : ""}`}
                        disabled={typeof number === "string"}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <button
                onClick={() => page < totalPage && onChange(page + 1)}
                disabled={page === totalPage}
                className="w-8 h-8 rounded-[4px] border border-n400 flex items-center justify-center cursor-pointer"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.354 8.35375L6.35403 13.3538C6.30757 13.4002 6.25242 13.4371 6.19173 13.4622C6.13103 13.4873 6.06598 13.5003 6.00028 13.5003C5.93458 13.5003 5.86953 13.4873 5.80883 13.4622C5.74813 13.4371 5.69298 13.4002 5.64653 13.3538C5.60007 13.3073 5.56322 13.2521 5.53808 13.1915C5.51294 13.1308 5.5 13.0657 5.5 13C5.5 12.9343 5.51294 12.8693 5.53808 12.8086C5.56322 12.7479 5.60007 12.6927 5.64653 12.6463L10.2934 8L5.64653 3.35375C5.55271 3.25993 5.5 3.13269 5.5 3C5.5 2.86732 5.55271 2.74007 5.64653 2.64625C5.74035 2.55243 5.8676 2.49973 6.00028 2.49973C6.13296 2.49973 6.26021 2.55243 6.35403 2.64625L11.354 7.64625C11.4005 7.69269 11.4374 7.74783 11.4626 7.80853C11.4877 7.86923 11.5007 7.9343 11.5007 8C11.5007 8.06571 11.4877 8.13077 11.4626 8.19147C11.4374 8.25217 11.4005 8.30732 11.354 8.35375Z"
                        fill="#474D66"
                    />
                </svg>
            </button>
        </div>
    );
}
