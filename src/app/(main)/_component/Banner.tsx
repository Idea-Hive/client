import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Banner2 from "@/assets/images/Banner2.png";

export default function Banner() {
    const swiperRef = useRef<any>(null);

    // 이전 버튼 클릭 시
    const handlePrevClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    // 다음 버튼 클릭 시
    const handleNextClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <div className="w-full mb-[100px] relative">
            <Swiper
                modules={[Pagination, Autoplay]} // 페이지네이션, 자동 재생
                initialSlide={1}
                pagination={false} // 페이지네이션 비활성화
                navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }}
                centeredSlides={true} // 중앙 정렬
                loop={true} // 무한 반복
                className="h-[370px]"
                slidesPerView="auto" // 슬라이드 개수 자동 조절
                spaceBetween={24} // 슬라이드 간격
                onSwiper={(swiper) => (swiperRef.current = swiper)}
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

            {/* 이전 버튼 */}
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

            {/* 다음 버튼 */}
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
}
