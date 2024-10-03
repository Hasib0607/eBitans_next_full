"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";
import { BsPlusLg } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./hero-two.css";

import { sliderImg } from "@/site-settings/siteUrl";

const HeroTwo = ({ slider, design }: any) => {
  let menu = [""];

  const pagination = {
    el: ".swiper-pagination-two",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: any, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
      .swiper-pagination-two .swiper-pagination-bullet {
        background:  ${textColor};
    }
      .swiper-pagination-two .swiper-pagination-bullet-active {
        background: ${bgColor};

    }
      .shop-link:hover {
        background: ${bgColor};
        color: ${textColor};
        border:transparent;
        transform: scale(1.05);
    }
      `;

  return (
    <div className="group z-0 relative w-full">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-two"></div>
      </div>
      <Swiper
        loop={false}
        pagination={pagination}
        autoplay={{
          delay: 3000,
        }}
        modules={[Pagination, Autoplay, Navigation, Controller]}
        className={`mySwiper renderBullet relative`}
      >
        {slider?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="">
              <div
                style={{ color: item?.color }}
                className="absolute top-1/2 -translate-y-1/2 font-thin md:max-w-sm max-w-[275px] xl:left-48 lg:left-32 md:left-[120px] left-5"
              >
                <h1 className={`md:text-xl text-sm`}>{item?.subtitle}</h1>
                <p className="xl:text-4xl md:text-[28px] text-[20px] leading-none font-medium mt-3">
                  {item?.title}
                </p>
                {item?.link && (
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex lg:px-5 px-2 lg:py-2 py-1 mt-3 text-black lg:text-lg text-xs shop-link w-max lg:cursor-pointer bg-transparent border-black border duration-500 items-center space-x-1">
                      <BsPlusLg className="lg:text-sm " />
                      <h1 className="">SHOP NOW</h1>
                    </div>
                  </a>
                )}
              </div>
            </div>
            <img
              className="h-auto min-w-full"
              src={sliderImg + item.image}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroTwo;
