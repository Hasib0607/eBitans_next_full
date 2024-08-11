"use client";
import React from "react";
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

// import './heroSixteenCss/herosixteen.css'
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroFive = ({ slider, design }: any) => {
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
            <div className="">
              <div
                style={{ color: s?.color }}
                className="absolute z-[1] md:text-center top-1/2 -translate-y-1/2 md:max-w-[450px] max-w-[250px] px-4 sm:px-0 lg:left-[10%] sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
              >
                <p className="md:text-lg text-xs md:text-center md:leading-5">
                  {s?.subtitle}
                </p>
                <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                  {s?.title}
                </h1>
                {/* <p className='h-[2px] w-10 bg-black mx-auto md:block hidden'></p> */}
                <a href={s?.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="lg:px-6 px-3 md:py-2 py-1 arrow-hover-five duration-300 lg:text-base text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer uppercase font-medium rounded-full">
                    Shop Now{" "}
                  </h1>
                </a>
              </div>
            </div>
            <img
              className="min-h-[200px] min-w-full"
              src={sliderImg + s.image}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroFive;
