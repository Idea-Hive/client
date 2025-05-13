import Link from "next/link";
import { LikedIcon, SmallUserImgIcon, ViewIcon } from "./icons/icons";

/**
 * id: 프로젝트 아이디
 * title: 프로젝트 제목
 * content: 프로젝트 내용
 * tags: 프로젝트 태그
 * creator: 프로젝트 생성자
 * likeCount: 프로젝트 좋아요 수
 * viewCount: 프로젝트 조회 수
 */
interface ItemType {
    id: number;
    title: string;
    content: string;
    tags: string[];
    creator: string;
    likeCount: number;
    viewCount: number;
}

const Card = ({ item }: { item: ItemType }) => {
    return (
        <Link href={`/project/${item.id}`}>
            <div className="w-full h-[212px] border border-n400 bg-n0 p-6 rounded-lg flex flex-col justify-between cursor-pointer hover:shadow-floatingCard transition-all ease-in-out duration-300">
                <div>
                    <div className="mb-2 text-n900 text-lg leading-6 font-medium">{item.title}</div>
                    <div className="mb-4 text-n800 text-sm truncate">{item.content}</div>
                    <div className="flex gap-2">
                        {item.tags.map((tag) => {
                            return (
                                <div key={tag} className="bg-[#edeff5] h-8 w-fit px-3 leading-8 text-xs text-n800 rounded-md">
                                    {tag}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-n300 pt-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <SmallUserImgIcon />

                        <div className="text-smEmphasize text-n900">{item.creator}</div>
                    </div>
                    <div className="flex items-center">
                        <LikedIcon />
                        <div className="text-sm text-black ml-1.5 mr-3">{item.likeCount}</div>
                        <ViewIcon />
                        <div className="text-sm text-black ml-1.5">{item.viewCount}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
