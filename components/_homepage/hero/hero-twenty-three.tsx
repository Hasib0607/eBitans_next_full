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
import { BiRightArrowAlt } from "react-icons/bi";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroTwentyThree = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const pagination = {
    el: ".swiper-pagination-fourteen",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

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
      <div>
        <div className="swiper-pagination-fourteen"></div>
      </div>
      <div className="hidden group-hover:flex lg:cursor-pointer">
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
                className="absolute z-[1] md:text-center top-1/2 -translate-y-1/2 md:max-w-sm max-w-[250px] px-4 sm:px-0 lg:left-[10%] sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
              >
                <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                  {s?.title}
                </h1>
                <p className="h-[2px] w-10 bg-black mx-auto md:block hidden"></p>
                <p className="md:text-lg text-xs md:text-center md:leading-5">
                  {s?.subtitle}
                </p>
                <a href={s?.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="lg:px-10 px-3 md:py-2 py-1 btn-slider duration-300 lg:text-lg text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer uppercase font-medium">
                    Shop Now <BiRightArrowAlt className="inline" />
                  </h1>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                className="min-h-[200px] min-w-full "
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

export default HeroTwentyThree;
