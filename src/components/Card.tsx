import { Project } from "@/apis/project/projectApis";
import Link from "next/link";
import { LikedIcon, SmallUserImgIcon, ViewIcon } from "./icons/icons";

const Card = ({ item }: { item: Project }) => {
    return (
        <Link href={`/project/${item.id}`}>
            <div className="w-full h-[212px] border border-n400 bg-n0 p-6 rounded-lg flex flex-col justify-between cursor-pointer hover:shadow-floatingCard transition-all ease-in-out duration-300">
                <div>
                    <div className="mb-2 text-n900 text-lg leading-6 font-medium">{item.name}</div>
                    <div className="mb-4 text-n800 text-sm truncate">{item.description}</div>
                    <div className="flex gap-2">
                        {item.hashtagNames.map((tag) => {
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
                        <LikedIcon isLike={false} onClick={() => {}} />
                        <div className="text-sm text-black ml-1.5 mr-3">{item.likedCnt}</div>
                        <ViewIcon />
                        <div className="text-sm text-black ml-1.5">{item.viewCnt}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
