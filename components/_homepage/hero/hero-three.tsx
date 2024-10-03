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

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "./hero-three.css";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroThree = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

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
    .arrow-hover:hover {
        background: ${bgColor};
        color:  ${textColor};
    }
  
    `;
  return (
    <div className="group z-0 relative">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-nine"></div>
      </div>

      <div className=" gap-2 relative md:group-hover:flex hidden lg:cursor-pointer">
        <div
          className={`${prevEl} bg-gray-200 arrow-hover rounded-full h-12 w-12 transition-all duration-500  ease-linear absolute left-10 xl:top-[400px] lg:top-64 md:top-40 z-10 `}
        >
          <ChevronLeftIcon className="h-8 text-2xl ml-2 mt-2 font-serif font-bold" />
        </div>
        <div
          className={`${nextEl} bg-gray-200 arrow-hover rounded-full h-12 w-12  transition-all duration-500  ease-linear absolute right-10 xl:top-[400px] lg:top-64 md:top-40 z-10 `}
        >
          <ChevronRightIcon className="h-8 text-2xl ml-2 mt-2 font-serif font-bold" />
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        speed={1000}
        effect={"fade"}
        loop={false}
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
                className="absolute z-[1] top-1/2 -translate-y-1/2 md:max-w-lg max-w-[250px] px-4 sm:px-0 lg:right-[10%] right-2 sm:right-5 flex flex-col gap-y-2 md:gap-y-4"
              >
                <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:leading-7">
                  {s?.title}
                </h1>
                <p className="h-[2px] w-10 bg-black mx-auto md:block hidden"></p>
                <p className="md:text-lg text-xs md:leading-5">{s?.subtitle}</p>
                {s?.link && (
                  <a href={s?.link} target="_blank" rel="noopener noreferrer">
                    <h1 className="lg:px-10 px-3 md:py-2 py-1 duration-300 lg:text-lg text-xs w-max shop-link lg:cursor-pointer uppercase font-medium">
                      Shop Now
                    </h1>
                  </a>
                )}
              </div>
            </div>

            <img
              className="h-auto min-w-full"
              src={sliderImg + s.image}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroThree;
