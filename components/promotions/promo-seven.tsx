import React from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./promo-seven.css";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoSeven = ({ banner }: any) => {
  const prevEl = "promo_seven_Prev";
  const nextEl = "promo_seven_Next";

  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white">
      <div className=" sm:grid-cols-2 gap-6 md:grid hidden">
        {banner?.slice(0, 2).map((ban: any) => (
          <div key={ban.id} className="relative shine overflow-hidden">
            <a href={ban?.link} target="_blank" rel="noopener noreferrer">
              <img
                alt="gallery shine"
                className="min-w-full object-cover object-center block h-auto rounded-md lg:cursor-pointer"
                src={bannerImg + ban?.image}
              />
            </a>
            <div className="absolute top-0 bottom-0 left-4 flex justify-start items-center "></div>
          </div>
        ))}
      </div>

      <div className="group z-0 md:hidden relative">
        <div className="">
          <div
            className={`${prevEl} bg-gray-500  hover:bg-black text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-1/2 -translate-y-1/2 z-[4] `}
          >
            <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
          <div
            className={`${nextEl} bg-gray-500 hover:bg-black text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-1/2 -translate-y-1/2 z-[4]`}
          >
            <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
        </div>

        <Swiper
          navigation={{
            prevEl: `.${prevEl}`,
            nextEl: `.${nextEl}`,
          }}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
          modules={[Pagination, Autoplay, Navigation, Controller]}
          className="mySwiper relative"
        >
          {banner?.slice(0, 2).map((s: any) => (
            <SwiperSlide key={s.id}>
              <img
                className="h-auto min-w-full object-cover object-center"
                src={bannerImg + s.image}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PromoSeven;
