"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BsPlusLg } from "react-icons/bs";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroOne = ({ slider }: any) => {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
        }}
        spaceBetween={30}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slider?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="">
              <div
                style={{ color: item?.color }}
                className="md:pr-[50%] pr-[40%] absolute top-1/2 -translate-y-1/2 font-thin xl:left-48 lg:left-32 md:left-[120px] left-5 space-y-3"
              >
                <h1 className={`md:text-xl text-sm`}>{item?.subtitle}</h1>
                <p className="xl:text-4xl md:text-[28px] text-[22px] leading-none font-medium ">
                  {item?.title}
                </p>
                {item?.link && (
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex lg:px-5 px-2 lg:py-2 py-1 mt-3 md:mt-5 text-black lg:text-lg text-xs shop-link w-max lg:cursor-pointer bg-transparent border-black border duration-500 items-center space-x-1">
                      <BsPlusLg className="lg:text-sm " />
                      <h1 className="">SHOP NOW</h1>
                    </div>
                  </a>
                )}
              </div>
            </div>
            <img
              alt={item?.title}
              src={sliderImg + item.image}
              className="h-auto min-w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroOne;
