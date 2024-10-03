"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import {
  Pagination,
  Autoplay,
  Navigation,
  Controller,
  EffectCreative,
  EffectFade,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { BiRightArrowAlt } from "react-icons/bi";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlinePause,
  MdPlayArrow,
} from "react-icons/md";
import { sliderImg } from "@/site-settings/siteUrl";

SwiperCore.use([Autoplay]);

const HeroThirtyNine = ({ slider, design }: any) => {
  const [isPlaying, setIsPlaying] = useState(true);

  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const pagination = {
    el: ".swiper-pagination-thirtynine",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `

      .swiper-pagination-thirtynine {
        width: auto !important;
        margin: 0;
        display: flex;
        gap: 1px;
    }
    
    .swiper-pagination-thirtynine .swiper-pagination-bullet {
        border-radius: 50%;
        width: 7px;
        height: 7px;
        opacity: 1;
        background:  ${textColor};
        border: 1px solid black;
    
    }
    
    .swiper-pagination-thirtynine .swiper-pagination-bullet-active {
        width: 7px;
        height: 7px;
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
        color: ${bgColor};
    }
      `;

  const swiperRef = useRef<any>(null);

  const handlePlay = () => {
    swiperRef?.current?.swiper?.autoplay?.start();
    setIsPlaying(true);
  };

  const handlePause = () => {
    swiperRef?.current?.swiper?.autoplay?.stop();
    setIsPlaying(false);
  };

  return (
    <div className="mt-20">
      <div className="z-0 relative sm:container px-5 pt-3 group">
        <style>{styleCss}</style>

        <Swiper
          ref={swiperRef}
          autoplay={{ delay: 3000 }}
          navigation={{
            prevEl: `.${prevEl}`,
            nextEl: `.${nextEl}`,
          }}
          speed={1000}
          loop={true}
          pagination={pagination}
          modules={[
            Pagination,
            Autoplay,
            Navigation,
            Controller,
            EffectCreative,
            EffectFade,
          ]}
          className="mySwiper relative"
        >
          {slider?.map((s: any) => (
            <SwiperSlide key={s.id}>
              <div className="">
                <div
                  style={{ color: s?.color }}
                  className="absolute z-[1] md:text-center top-1/2 -translate-y-1/2 md:max-w-sm max-w-[250px] px-4 sm:px-0 lg:left-14 xl:left-24 md:left-10 sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
                >
                  <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                    {s?.title}
                  </h1>
                  {/* <p className='h-[2px] w-10 bg-black mx-auto md:block hidden'></p> */}
                  <p className="md:text-lg text-xs md:text-center md:leading-5">
                    {s?.subtitle}
                  </p>
                  {s?.link && (
                    <a href={s?.link} target="_blank" rel="noopener noreferrer">
                      <h1
                        className={`lg:px-10 px-6 md:py-2 py-1 btn-slider duration-300 lg:text-lg text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer bg-black text-white rounded-full font-medium ${
                          !s?.title && "sm:mt-20 mt-10"
                        }`}
                      >
                        Shop Now <BiRightArrowAlt className="inline" />
                      </h1>
                    </a>
                  )}
                </div>
              </div>
              <div className="">
                <img
                  className="h-auto min-w-full rounded-lg"
                  src={sliderImg + s.image}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center gap-x-5 border-b">
          <div className="flex items-center gap-x-3 border-r py-3 pr-3">
            <div
              className={`${prevEl} text-gray-600 lg:cursor-pointer flex justify-center items-center`}
            >
              <MdKeyboardArrowLeft className="text-xl font-bold" />
            </div>
            <div className="swiper-pagination-thirtynine"></div>
            <div
              className={`${nextEl} text-gray-600 lg:cursor-pointer flex justify-center items-center`}
            >
              <MdOutlineKeyboardArrowRight className="text-xl font-bold" />
            </div>
          </div>
          {!isPlaying && (
            <MdPlayArrow onClick={handlePlay} className="lg:cursor-pointer" />
          )}
          {isPlaying && (
            <MdOutlinePause
              onClick={handlePause}
              className="lg:cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroThirtyNine;
