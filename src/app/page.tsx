"use client";

import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { onSearchProjectsApi, Project } from "@/apis/project/projectApis";
import Banner2 from "@/assets/images/Banner2.png";
import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
    const {
        data: newProjects,
        isPending: isNewProjectsPending,
        isError: isNewProjectsError,
    } = useQuery({
        queryKey: [
            "getProjects",
            {
                keyword: "",
                recruitType: "NEW",
                sortType: "RECENT",
                page: 1,
                size: 6,
            },
        ],
        queryFn: onSearchProjectsApi,
    });

    const {
        data: additionalProjects,
        isPending: isAdditionalProjectsPending,
        isError: isAdditionalProjectsError,
    } = useQuery({
        queryKey: [
            "getProjects",
            {
                keyword: "",
                recruitType: "ADDITIONAL",
                sortType: "RECENT",
                page: 1,
                size: 6,
            },
        ],
        queryFn: onSearchProjectsApi,
    });

    return (
        <div className="py-[60px]">
            <Banner />

            {(isNewProjectsPending || isAdditionalProjectsPending) && <Spinner />}

            <div className="w-full max-w-[1232px] px-4 mx-auto flex flex-col gap-[100px]">
                <ProjectList projects={newProjects?.projects || []} label="모집중인 프로젝트" type="NEW" />
                <ProjectList projects={additionalProjects?.projects || []} label="추가 모집중인 프로젝트" type="ADDITIONAL" />
            </div>
        </div>
    );
}

const Banner = () => {
    const swiperRef = useRef<any>(null);

    const handlePrevClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <div className="w-full mb-[100px] relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                initialSlide={1}
                pagination={false}
                navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }}
                centeredSlides={true}
                loop={true}
                className="h-[370px]"
                slidesPerView="auto"
                spaceBetween={24}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
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
            <button
                onClick={handlePrevClick}
                className="swiper-button-prev absolute top-1/2 left-[calc(50%-492px-24px)] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-n400"
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.2367 23.3632C19.3203 23.4469 19.3866 23.5461 19.4319 23.6554C19.4771 23.7646 19.5004 23.8817 19.5004 24C19.5004 24.1182 19.4771 24.2353 19.4319 24.3446C19.3866 24.4538 19.3203 24.5531 19.2367 24.6367C19.1531 24.7204 19.0538 24.7867 18.9445 24.8319C18.8353 24.8772 18.7182 24.9005 18.5999 24.9005C18.4817 24.9005 18.3646 24.8772 18.2553 24.8319C18.1461 24.7867 18.0468 24.7204 17.9632 24.6367L8.96318 15.6367C8.8795 15.5532 8.81312 15.4539 8.76782 15.3446C8.72253 15.2354 8.69922 15.1183 8.69922 15C8.69922 14.8817 8.72253 14.7646 8.76782 14.6553C8.81312 14.5461 8.8795 14.4468 8.96318 14.3632L17.9632 5.36324C18.1321 5.19436 18.3611 5.09949 18.5999 5.09949C18.8388 5.09949 19.0678 5.19436 19.2367 5.36324C19.4056 5.53211 19.5004 5.76116 19.5004 5.99999C19.5004 6.23882 19.4056 6.46786 19.2367 6.63674L10.8723 15L19.2367 23.3632Z"
                        fill="#474D66"
                    />
                </svg>
            </button>
            <button
                onClick={handleNextClick}
                className="swiper-button-next absolute top-1/2 right-[calc(50%-492px-24px)] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-n400"
            >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.0368 15.6367L12.0368 24.6367C11.9531 24.7204 11.8539 24.7867 11.7446 24.8319C11.6354 24.8772 11.5183 24.9005 11.4 24.9005C11.2818 24.9005 11.1647 24.8772 11.0554 24.8319C10.9462 24.7867 10.8469 24.7204 10.7633 24.6367C10.6796 24.5531 10.6133 24.4538 10.5681 24.3446C10.5228 24.2353 10.4995 24.1182 10.4995 24C10.4995 23.8817 10.5228 23.7646 10.5681 23.6554C10.6133 23.5461 10.6796 23.4469 10.7633 23.3632L19.1276 15L10.7633 6.63674C10.5944 6.46786 10.4995 6.23882 10.4995 5.99999C10.4995 5.76116 10.5944 5.53211 10.7633 5.36324C10.9321 5.19436 11.1612 5.09949 11.4 5.09949C11.6388 5.09949 11.8679 5.19436 12.0368 5.36324L21.0368 14.3632C21.1204 14.4468 21.1868 14.5461 21.2321 14.6553C21.2774 14.7646 21.3007 14.8817 21.3007 15C21.3007 15.1183 21.2774 15.2354 21.2321 15.3446C21.1868 15.4539 21.1204 15.5532 21.0368 15.6367Z"
                        fill="#474D66"
                    />
                </svg>
            </button>
        </div>
    );
};

const ProjectList = ({ projects, label, type }: { projects: Project[]; label: string; type: string }) => {
    const router = useRouter();

    return (
        <div>
            <div className="w-full flex justify-between items-center mb-6">
                <div className="text-n900 text-h2">{label}</div>
                <div
                    className="text-n800 text-sm cursor-pointer"
                    onClick={() => {
                        router.push(`/project?tab=${type}`);
                    }}
                >
                    전체보기
                </div>
            </div>

            {projects.length > 0 ? (
                <div className="w-full grid grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} item={project} />
                    ))}
                </div>
            ) : (
                <div className="w-full flex justify-center mt-20">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                            <path
                                d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM11.25 12.75V7.5C11.25 7.30109 11.329 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.671 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75ZM13.125 16.125C13.125 16.3475 13.059 16.565 12.9354 16.75C12.8118 16.935 12.6361 17.0792 12.4305 17.1644C12.225 17.2495 11.9988 17.2718 11.7805 17.2284C11.5623 17.185 11.3618 17.0778 11.2045 16.9205C11.0472 16.7632 10.94 16.5627 10.8966 16.3445C10.8532 16.1262 10.8755 15.9 10.9606 15.6945C11.0458 15.4889 11.19 15.3132 11.375 15.1896C11.56 15.066 11.7775 15 12 15C12.2984 15 12.5845 15.1185 12.7955 15.3295C13.0065 15.5405 13.125 15.8266 13.125 16.125Z"
                                fill="#8F95B2"
                            />
                        </svg>

                        <div className="text-n800 text-base mt-3">{type === "NEW" ? "모집중인 프로젝트가 없습니다." : "추가 모집중인 프로젝트가 없습니다."}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
