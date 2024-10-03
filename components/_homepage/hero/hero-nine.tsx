"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { BsPlusLg } from "react-icons/bs";
import { sliderImg } from "@/site-settings/siteUrl";
import "./hero-nine.css";

const HeroNine = ({ slider, design }: any) => {
  let menu = [""];

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const pagination = {
    el: ".swiper-pagination-nine",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span className="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `
    .swiper-pagination-nine .swiper-pagination-bullet {
        background:  ${textColor};
    }
    .swiper-pagination-nine .swiper-pagination-bullet-active {
        background: ${bgColor};
    }
    .shop-link {
        background: ${bgColor};
        border:transparent;
        transform: scale(1.05);
        color:  ${textColor};
    }
    .shop-link:hover {
        background: black;
        border:transparent;
        transform: scale(1.05);
        color:  white;
    }
  
    `;
  return (
    <div className="group z-0 relative">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-nine"></div>
      </div>

      <div className="md:group-hover:flex hidden">
        <div
          className={`${prevEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute left-10 top-1/2 -translate-y-1/2 z-[2] `}
        >
          <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
        <div
          className={`${nextEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute right-10 top-1/2 -translate-y-1/2 z-[2] `}
        >
          <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
      </div>

      <Swiper
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        loop={true}
        spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination, Autoplay, Navigation, Controller]}
        className="mySwiper relative"
      >
        {slider?.map((s: any) => {
          return (
            <SwiperSlide key={s.id}>
              <div className="">
                <div
                  style={{ color: s?.color }}
                  className="font-twelve pr-[50%] absolute xl:top-48 lg:top-24 md:top-20 top-5 xl:left-[400px] lg:left-32 md:left-[120px] left-[60px]"
                >
                  <h1 className="xl:text-4xl md:text-[28px] text-[22px] mb-2 font-medium">
                    {s?.title}
                  </h1>
                  <p className="md:text-xl text-sm leading-none mb-5">
                    {s?.subtitle}
                  </p>
                  {s?.link && (
                    <a href={s?.link} target="_blank" rel="noopener noreferrer">
                      <div className="flex font-twelve lg:px-5 px-2 lg:py-2 py-1 text-black lg:text-lg text-xs shop-link w-max lg:cursor-pointer bg-transparent border-black border duration-500 items-center space-x-1">
                        <BsPlusLg className="lg:text-sm " />
                        <h1 className="">SHOP NOW</h1>
                      </div>
                    </a>
                  )}
                </div>
              </div>

              <img className="h-auto w-full" src={sliderImg + s.image} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroNine;
