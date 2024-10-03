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

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroNineteen = ({ slider, design }: any) => {
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

    .arrow-hover-five:hover {
        background: ${bgColor};
        color: ${textColor};
        
    }


      `;
  return (
    <div className="group z-0 relative">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-five"></div>
      </div>

      <div className=" gap-2 md:group-hover:flex lg:cursor-pointer hidden">
        <div
          className={`${prevEl}  lg2:h-12 lg2:w-12 h-8 w-8 bg-gray-200 arrow-hover-five duration-500 text-gray-600 absolute left-4 top-[50%] translate-y-[-50%] z-10 `}
        >
          <ChevronLeftIcon className="h-8 lg2:h-12 lg2:w-12 font-serif font-bold" />
        </div>
        <div
          className={`${nextEl}  lg2:h-12 lg2:w-12 h-8 w-8 bg-gray-200 text-gray-600 duration-500 arrow-hover-five absolute right-4 top-[50%] translate-y-[-50%] z-10 `}
        >
          <ChevronRightIcon className="h-8 lg2:h-12 lg2:w-12 font-serif font-bold" />
        </div>
      </div>

      <Swiper
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        speed={1000}
        effect={"fade"}
        loop={true}
        spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 2000,
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
            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] max-w-[50%]">
              <div
                style={{ color: s?.color }}
                className="flex flex-col lg:gap-y-8 gap-y-2 max-w-[500px]"
              >
                <p className="md:text-base text-xs">{s?.subtitle}</p>
                <h1 className="xl:text-4xl md:text-[24px] text-[14px] font-bold">
                  {s?.title}
                </h1>
                {s?.link && (
                  <a href={s?.link} target="_blank" rel="noopener noreferrer">
                    <h1 className="lg:px-5 px-2 lg:py-2 py-1 hover:bg-[#f7f3e3] bg-[#F1EBD1] text-[#837B5D] lg:text-lg text-xs border border-black w-max">
                      SHOP NOW
                    </h1>
                  </a>
                )}
              </div>
            </div>
            <img
              className="h-auto min-w-full "
              src={sliderImg + s.image}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroNineteen;
