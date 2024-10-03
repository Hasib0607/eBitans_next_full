"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  Navigation,
  Controller,
  EffectFade,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sliderImg } from "@/site-settings/siteUrl";
// import './heroFiveCss/herofive.css'

const HeroTen = ({ slider, design }: any) => {
  let menu = [""];

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const pagination = {
    el: ".swiper-pagination-ten",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `

    .swiper-pagination-ten {
      position: absolute;
      bottom: 20px !important;
      left: 50% !important;
      transform: translateX(-50%);
      width: auto !important;
      margin: 0;
      display: flex;
      z-index: 1000;
      gap: 10px;
  }
  
  .swiper-pagination-ten .swiper-pagination-bullet {
      border-radius: 50%;
      width: 12px;
      height: 12px;
      opacity: 1;
      background:  ${textColor};
  
  }
  
  .swiper-pagination-ten .swiper-pagination-bullet-active {
      width: 12px;
      height: 12px;
      border-radius: 25px;
      transition-duration: 500ms;
      background: ${bgColor};

  }

  .btn-color:hover {
      background: ${bgColor};
      color: ${textColor};

  }
  
  .arrow-color:hover {
      background: ${bgColor};
      color: ${textColor};
  }
  .arrow-color {
      border:2px solid  ${bgColor} ;
      color: ${bgColor};
  }
    `;
  return (
    <div className="group z-0 relative">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-ten"></div>
      </div>

      <div className=" md:group-hover:flex hidden lg:cursor-pointer">
        <div
          className={`${prevEl} bg-gray-500 hover:bg-black text-white transition-all duration-500 ease-linear absolute left-10 top-1/2 -translate-y-1/2 z-[2] `}
        >
          <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
        <div
          className={`${nextEl} bg-gray-500 hover:bg-black text-white transition-all duration-500 ease-linear absolute right-10 top-1/2 -translate-y-1/2 z-[2] `}
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
        effect={"fade"}
        pagination={pagination}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination, Autoplay, Navigation, Controller, EffectFade]}
        className="mySwiper"
      >
        {slider?.map((s: any) => (
          <SwiperSlide key={s.id}>
            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] max-w-[50%]">
              <div style={{ color: s?.color }} className="">
                <h1 className="xl:text-4xl md:text-[24px] text-[14px] font-seven mb-1 md:mb-3 font-bold">
                  {s?.title}
                </h1>
                <p className="md:text-base text-xs font-seven">{s?.subtitle}</p>
              </div>
              {s?.link && (
                <a href={s?.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="md:mt-10 mt-3 lg:px-5 px-2 lg:py-2 py-1 bg-black text-white font-seven lg:text-lg text-xs rounded-md w-max">
                    Go To Collection
                  </h1>
                </a>
              )}
            </div>
            <img
              className="min-w-full h-auto "
              src={sliderImg + s.image}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroTen;
