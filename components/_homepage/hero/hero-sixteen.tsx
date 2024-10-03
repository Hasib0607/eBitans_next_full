"use client";

import { Swiper, SwiperSlide } from "swiper/react";
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

import "./hero-sixteen.css";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroSixteen = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const pagination = {
    el: ".swiper-pagination-sixteen",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `
      .swiper-pagination-sixteen .swiper-pagination-bullet {
        background:  ${textColor};
    }
    .swiper-pagination-sixteen .swiper-pagination-bullet-active {
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
    <div className="group z-0 relative">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-sixteen"></div>
      </div>

      <Swiper
        speed={1000}
        effect={"fade"}
        loop={true}
        spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 5000,
        }}
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
                className="font-twelve absolute xl:top-48 lg:top-48 md:top-20 top-5 xl:left-[50%] lg:left-[50%] md:left-[50%] left-[30%]"
              >
                <h1 className="xl:text-4xl md:text-[28px] text-[18px] mb-2 font-medium">
                  {s?.title}
                </h1>
                <p className="md:text-xl text-sm leading-none">{s?.subtitle}</p>
                <a href={s?.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex font-twelve mt-3 lg:mt-14 lg:px-7 px-2 rounded-full lg:py-3 py-1 text-black text-sm font-bold shop-link w-max lg:cursor-pointer bg-transparent border-black border duration-500 items-center space-x-1">
                    <h1 className="">SHOP NOW</h1>
                  </div>
                </a>
              </div>
            </div>
            <img className="h-auto w-full" src={sliderImg + s.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSixteen;
