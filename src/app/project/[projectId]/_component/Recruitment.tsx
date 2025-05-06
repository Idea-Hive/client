export default function Recruitment() {
    return (
        <div>
            <div className="text-h3 text-n900 mb-[15px]">모집정보</div>
            <div className="flex gap-3 items-center mb-[50px]">
                <div className="text-baseEmphasize text-n900 flex flex-col gap-3">
                    <div>모집인원</div>
                    <div>예상일정</div>
                    <div>연락 수단</div>
                </div>
                <div className="text-base text-n800 flex flex-col gap-3">
                    <div>4명</div>
                    <div>2025.05.01~2025.05.31</div>
                    <div className="underline cursor-pointer">open.kakao.com</div>
                </div>
            </div>

            <div className="text-h3 text-n900 mb-[15px]">기술 스펙</div>
            <div className="w-[732px] flex flex-wrap gap-[9px]">
                {["React", "Vue js", "Node.js", "Python (FastAPI, Django)", "PostgreSQL", "BigQuery", "AWS", "Figma", "Jira", "Notion", "Slack", "MVP", "Figma2"].map((skill) => {
                    return (
                        <button key={skill} className="border border-n500 rounded-[50px] h-[30px] px-3 text-sm text-n800 cursor-default pointer-events-none">
                            {skill}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
