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

import "./hero-seventeen.css";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroSeventeen = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const pagination = {
    el: ".swiper-pagination-seventeen",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `
    .swiper-pagination-seventeen {
        position: absolute;
        bottom: 20px !important;
        left: 50% !important;
        transform: translateX(-50%);
        width: auto !important;
        margin: 0;
        display: flex;
        z-index: 1000;
        gap: 5px;
    }
    
    .swiper-pagination-seventeen .swiper-pagination-bullet {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        opacity: 1;
        background:  ${textColor};
    
    }
    
    .swiper-pagination-seventeen .swiper-pagination-bullet-active {
        width: 12px;
        height: 12px;
        border-radius: 25px;
        transition-duration: 500ms;
        background: ${bgColor};

    }
    

    `;
  return (
    <div className=" mt-0 xl:mt-0 bg-white relative z-[2]">
      <style>{styleCss}</style>
      <div className="xl:px-[0px] lg:px-0 md:px-0 px-0  ">
        <div className="group  z-0 relative ">
          <div>
            <div className="swiper-pagination-seventeen"></div>
          </div>

          <div className=" gap-2 relative md:group-hover:flex hidden">
            <div
              className={`${prevEl} lg:cursor-pointer bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute left-10 lg2:top-[200px] xl:top-[325px] top-[150px] z-10 `}
            >
              <ChevronLeftIcon
                className="h-8 text-2xl font-serif font-bold"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              />
            </div>
            <div
              className={`${nextEl} lg:cursor-pointer bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute right-10 lg2:top-[200px] xl:top-[325px] top-[150px] z-10 `}
            >
              <ChevronRightIcon
                className="h-8 text-2xl font-serif font-bold"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              />
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
            className="mySwiper relative"
          >
            {slider?.map((s: any) => (
              <SwiperSlide key={s.id} className="rounded-lg">
                <a href={s?.link}>
                  <img
                    className="min-w-full h-auto"
                    src={sliderImg + s.image}
                    alt=""
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="heroSeventeenBackground text-white absolute -bottom-12 z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSeventeen;
