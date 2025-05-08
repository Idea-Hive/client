"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Banner2 from "@/assets/images/Banner2.png";
import Card from "@/components/Card";

interface ItemType {
    id: number;
    title: string;
    content: string;
    tags: string[];
    creator: string;
    likeCount: number;
    viewCount: number;
}

const ingProjects: ItemType[] = [
    {
        id: 1,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: ["서울", "카카오", "정부지원공모전"],
        creator: "홍길동",
        likeCount: 10,
        viewCount: 20,
    },
    {
        id: 2,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 15,
        viewCount: 25,
    },
    {
        id: 3,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 20,
        viewCount: 30,
    },
    {
        id: 4,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: ["서울", "카카오", "정부지원공모전"],
        creator: "홍길동",
        likeCount: 10,
        viewCount: 20,
    },
    {
        id: 5,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 15,
        viewCount: 25,
    },
    {
        id: 6,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 20,
        viewCount: 30,
    },
];
const moreProjects: ItemType[] = [
    {
        id: 1,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: ["서울", "카카오", "정부지원공모전"],
        creator: "홍길동",
        likeCount: 10,
        viewCount: 20,
    },
    {
        id: 2,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 15,
        viewCount: 25,
    },
    {
        id: 3,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 20,
        viewCount: 30,
    },
    {
        id: 4,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: ["서울", "카카오", "정부지원공모전"],
        creator: "홍길동",
        likeCount: 10,
        viewCount: 20,
    },
    {
        id: 5,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 15,
        viewCount: 25,
    },
    {
        id: 6,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 20,
        viewCount: 30,
    },
];
const positionProjects: ItemType[] = [
    {
        id: 1,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: ["서울", "카카오", "정부지원공모전"],
        creator: "홍길동",
        likeCount: 10,
        viewCount: 20,
    },
    {
        id: 2,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 15,
        viewCount: 25,
    },
    {
        id: 3,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 20,
        viewCount: 30,
    },
    {
        id: 4,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: ["서울", "카카오", "정부지원공모전"],
        creator: "홍길동",
        likeCount: 10,
        viewCount: 20,
    },
    {
        id: 5,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 15,
        viewCount: 25,
    },
    {
        id: 6,
        title: "태스크메이트 프로젝트 팀원 모집",
        content: "태스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 완성해보세요.",
        tags: [],
        creator: "홍길동",
        likeCount: 20,
        viewCount: 30,
    },
];

const currentPosition = "기획자";

export default function Home() {
    return (
        <div className="py-[60px]">
            <Banner />

            <div className="w-[1200px] mx-auto flex flex-col gap-[100px]">
                <ProjectList projects={ingProjects} label="모집중인 프로젝트" type="ingProjects" />
                <ProjectList projects={moreProjects} label="추가 모집중인 프로젝트" type="moreProjects" />

                <div>
                    <div className="w-full flex justify-between items-center mb-4">
                        <div className="text-n900 text-h2">포지션별 프로젝트</div>
                        <div className="text-n800 text-sm cursor-pointer">전체보기</div>
                    </div>

                    <div className="mb-6 flex items-center gap-2">
                        {["기획자", "디자이너", "프론트엔드", "백엔드"].map((item) => {
                            return (
                                <button
                                    key={item}
                                    className={`border border-n500 h-[30px] rounded-[50px] px-3 text-sm text-n800 ${
                                        currentPosition === item && "border-taskmateRed text-taskmateRed bg-taskmateRed/10"
                                    }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                    <div className="w-full grid grid-cols-3 gap-6">
                        {positionProjects.map((project) => (
                            <Card key={project.id} item={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Banner = () => {
    return (
        <div className="w-full mb-[100px]">
            <Swiper modules={[Pagination, Autoplay]} pagination={false} centeredSlides={true} loop={false} className="h-[370px]" slidesPerView="auto" spaceBetween={24}>
                <SwiperSlide className="!w-[984px] cursor-pointer">
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                        <Image src={Banner2} alt="2032 BEST PICK" className="w-full h-full object-cover" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[984px] cursor-pointer">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-taskmateRed/10">
                        <Image src={Banner2} alt="Banner 2" className="w-full h-full object-cover" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="!w-[984px] cursor-pointer">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-n100">
                        <Image src={Banner2} alt="Banner 3" className="w-full h-full object-cover" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

const ProjectList = ({ projects, label, type }: { projects: ItemType[]; label: string; type: string }) => {
    return (
        <div>
            <div className="w-full flex justify-between items-center mb-6">
                <div className="text-n900 text-h2">{label}</div>
                <div className="text-n800 text-sm cursor-pointer">전체보기</div>
            </div>

            <div className="w-full grid grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} item={project} />
                ))}
            </div>
        </div>
    );
};
