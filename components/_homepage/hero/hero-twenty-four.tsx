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

// import './heroSixteenCss/herosixteen.css'
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroTwentyFour = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const pagination = {
    el: ".swiper-pagination-fourteen",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const styleCss = `

      .swiper-pagination-fourteen {
        position: absolute;
        bottom: 20px !important;
        left: 50% !important;
        transform: translateX(-50%);
        width: auto !important;
        margin: 0;
        display: flex;
        z-index: 1000;
        gap: 1px;
    }
    
    .swiper-pagination-fourteen .swiper-pagination-bullet {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        opacity: 1;
        background:  ${textColor};
    
    }
    
    .swiper-pagination-fourteen .swiper-pagination-bullet-active {
        width: 12px;
        height: 12px;
        border-radius: 25px;
        transition-duration: 500ms;
        background: ${bgColor};

    }

    .btn-slider {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid transparent;
    }
    .btn-slider:hover {
        color:  ${design?.header_color};
        background: white;
        border: 2px solid ${design?.header_color};
    }
    .bg-color {
        color:  ${design?.text_color};
        background: ${design?.header_color};
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
    <div className="z-0 relative group">
      <style>{styleCss}</style>

      <div className="lg:block hidden">
        <div className="swiper-pagination-fourteen"></div>
      </div>

      <div className=" gap-2 hidden lg:group-hover:flex lg:cursor-pointer">
        <div
          className={`${prevEl}   text-gray-600 arrow-color absolute h-10 w-10 flex justify-center items-center bg-white rounded-full left-4 top-[50%] -translate-y-1/2 z-10 `}
        >
          <ChevronLeftIcon className="h-6 font-serif font-bold" />
        </div>
        <div
          className={`${nextEl}  text-gray-600 arrow-color absolute h-10 w-10 flex justify-center items-center bg-white rounded-full right-4 top-[50%] -translate-y-1/2 z-10 `}
        >
          <ChevronRightIcon className="h-6 font-serif font-bold" />
        </div>
      </div>

      <Swiper
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        speed={1000}
        // effect={"fade"}
        loop={true}
        // spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 3000,
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
                className="absolute md:bg-white p-5 h-max md:max-w-[400px] max-w-[300px] px-10 bottom-1 md:bottom-10 lg:bottom-32 left-0 lg:left-[20%] sm:left-10  "
              >
                <h1 className="xl:text-4xl md:text-[28px] text-[20px] font-medium md:mb-3">
                  {s?.title}
                </h1>
                <p className="md:text-xl text-sm">{s?.subtitle}</p>
                <div className="bg-color relative group w-max">
                  <p className="absolute bg-black bg-opacity-20 top-0 left-0 right-0 scale-x-0 group-hover:scale-x-100 transform origin-[0%_100%] group-hover:ease-[cubic-bezier(0.52,1.64,0.87,0.66)] ease-[cubic-bezier(0.52,1.64,0.87,0.66)] slider-btn-twenty-four duration-500 bottom-0"></p>
                  <a href={s?.link} target="_blank" rel="noopener noreferrer">
                    <h1 className="lg:px-14 mt-1 md:mt-5 px-3 lg:py-4 py-2 relative z-[2] duration-300 lg:text-base text-xs w-max lg:cursor-pointer uppercase font-medium">
                      DISCOVER MORE
                    </h1>
                  </a>
                </div>
              </div>
            </div>

            <div className="">
              <img
                className="h-auto min-w-full "
                src={sliderImg + s.image}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroTwentyFour;
