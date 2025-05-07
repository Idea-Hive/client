import Tag from "./Tag";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


interface CardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
    name: string;
    heartNumber: number;
    eyeNumber: number;
}

export default function Card({ title, description, image, link, tags, name, heartNumber, eyeNumber }: CardProps) {
    return (
        <div className="w-[384px] min-w-[384px] max-w-[544px] h-[204px] rounded-lg border p-6 flex flex-col justify-center">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <h1 className="font-medium text-lg leading-6 tracking-[-0.5%]">{title}</h1>
                    <p className="font-normal text-sm leading-5 tracking-[-0.5%]">{description}</p>
                </div>
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag} tag={tag} />
                    ))}
                </div>
            </div>
            <div className="flex justify-between w-[336px] pt-3 mt-3 border-t space-between">
                <div className="flex gap-8">
                    <div className="w-4 h-4">{image}</div>
                    <div className="w-4 h-4">{name}</div>
                </div>
                {/* right Wrapper */}
                <div className="flex gap-2">
                    <div className="flex gap-2 items-center">    
                    <FaHeart className="border-taskmateRed" />
                        <div className="">{heartNumber}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaEye className="border-taskmateRed" />
                        <div className="">{eyeNumber}</div>
                    </div>
                </div>
               
                
            </div>
        </div>
    );
}