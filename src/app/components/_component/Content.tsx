const Content = ({
    description,
    props,
    examples,
}: {
    description: string;
    props: { name: string; type: string; description: string }[];
    examples: { description: string; code: React.ReactNode }[];
}) => {
    return (
        <div className="p-4">
            <div className="mb-8">
                <div className="font-bold mb-2">설명</div>
                <div>{description}</div>
            </div>

            <div className="mb-8">
                <div className="font-bold mb-2">Props</div>
                <div>
                    {props.map((prop, index) => {
                        return (
                            <div key={index}>
                                <span className="font-bold">{index + 1}.&nbsp;</span>
                                <span className="font-bold">{prop.name}</span>&nbsp;
                                <span className="text-gray-500">({prop.type})</span>&nbsp;:&nbsp;
                                <span>{prop.description}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="font-bold mb-2">예시</div>
                <div className="flex flex-col gap-6">
                    {examples.map((example, index) => {
                        return (
                            <div key={index}>
                                <div className="font-bold mb-1">
                                    {index + 1}.&nbsp;{example.description}
                                </div>
                                {example.code}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Content;
