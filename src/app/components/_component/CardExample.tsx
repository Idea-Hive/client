import Button from "@/components/Button";
import Content from "./Content";
import Card from "@/components/Card";

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
                            title="Card Title"
                            description="Card Description"
                            image="Card"
                            link="Card"
                            tags={["tag1", "tag2", "tag3"]}
                            name="James"
                            heartNumber={10}
                            eyeNumber={10} />
                        </div>
                    ),
                },
           
            ]}
        />
    );
};

export default CardExample;
