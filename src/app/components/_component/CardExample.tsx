import Card from "@/components/Card";
import Content from "./Content";

const CardExample = () => {
    return (
        <Content
            description="Card Component 입니다."
            props={[
                { name: "title", type: "string", description: "Card 제목" },
                { name: "description", type: "string", description: "Card 설명" },
                { name: "image", type: "string", description: "Card 이미지" },
                { name: "link", type: "string", description: "Card 링크" },
            ]}
            examples={[
                {
                    description: "Primary Btns",
                    code: (
                        <div className="flex gap-2">
                            <Card
                                item={{
                                    id: 1,
                                    title: "태스크메이트 프로젝트 팀원 모집",
                                    content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
                                    tags: ["서울", "카카오", "정부지원공모전"],
                                    creator: "홍길동",
                                    likeCount: 10,
                                    viewCount: 20,
                                }}
                            />
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default CardExample;
