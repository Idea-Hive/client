import Calendar from "@/components/Calendar/Calendar";
import Content from "./Content";

const CalendarExample = () => {
    return (
        <Content
            description="Calendar Component 입니다."
            props={[
                { name: "title", type: "string", description: "Calendar 제목" },
                { name: "description", type: "string", description: "Calendar 설명" },
                { name: "image", type: "string", description: "Calendar 이미지" },
                { name: "link", type: "string", description: "Calendar 링크" },
            ]}
            examples={[
                {
                    description: "Primary Btns",
                    code: (
                        <div className="flex gap-2">
                            <Calendar
                                year={2024}
                                month={6}
                                events={[
                                    { date: "2024-05-30", label: "[D_1] 와이어프레임", type: "design" },
                                    { date: "2024-06-01", label: "[D_1] 와이어프레임", type: "design" },
                                    { date: "2024-06-03", label: "[D_1] 화면설계서", type: "design" },
                                    { date: "2024-06-03", label: "[FE_1] 컴포넌트", type: "fe" },
                                    { date: "2024-06-13", label: "[FE_1] 컴포넌트", type: "fe" },
                                    { date: "2024-06-21", label: "[D_1] 디자인마감", type: "design" },
                                ]}
                            />
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default CalendarExample;
