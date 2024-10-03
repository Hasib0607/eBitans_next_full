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

import "./hero-eleven.css";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroThirtyThree = ({ slider, design }: any) => {
  let menu = [""];

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const pagination = {
    el: ".swiper-pagination-five",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `

    .swiper-pagination-five {
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
  
  .swiper-pagination-five .swiper-pagination-bullet {
      border-radius: 50%;
      width: 12px;
      height: 12px;
      opacity: 1;
      background:  ${textColor};
  
  }
  
  .swiper-pagination-five .swiper-pagination-bullet-active {
      width: 12px;
      height: 12px;
      border-radius: 25px;
      transition-duration: 500ms;
      background: ${bgColor};

  }
  .arrow-hover-five {
      border: 1px solid ${bgColor};
      color: ${bgColor};
      
  }
  .arrow-hover-five:hover {
      background: ${bgColor};
      color: ${textColor};
      border: 1px solid ${bgColor};
      
  }

    `;
  return (
    <div className=" mt-0 xl:mt-0 bg-white relative heroElevenBgImage">
      <style>{styleCss}</style>
      <div className="sm:container px-5">
        <div className="group py-2 z-0 relative rounded-md">
          <div>
            <div className="swiper-pagination-five"></div>
          </div>

          <div className="lg:group-hover:flex hidden">
            <div
              className={`${prevEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute left-10 top-1/2 -translate-y-1/2 z-10 `}
            >
              <ChevronLeftIcon
                className="h-12 font-bold"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              />
            </div>
            <div
              className={`${nextEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute right-10 top-1/2 -translate-y-1/2 z-10 `}
            >
              <ChevronRightIcon
                className="h-12 font-bold"
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
                <img
                  className="h-auto min-w-full rounded-3xl"
                  src={sliderImg + s.image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroThirtyThree;
