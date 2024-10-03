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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IoSearchCircleOutline } from "react-icons/io5";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroTwentySeven = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const pagination = {
    el: ".swiper-pagination-twentyseven",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `

      .swiper-pagination-twentyseven {
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
    
    .swiper-pagination-twentyseven .swiper-pagination-bullet {
        width: 100px;
        height: 3px;
        opacity: 1;
        border-radius: 25px !important;
        background:  ${textColor};
    
    }
    
    .swiper-pagination-twentyseven .swiper-pagination-bullet-active {
        width: 100px;
        height: 3px;
        border-radius: 25px !important;
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
        background: ${design?.text_color};
        border: 2px solid ${design?.header_color};
    }
    
    .arrow-color:hover {
        border:2px solid  ${bgColor} ;
        color: ${bgColor};
    }
    .arrow-color {
        
        color: ${bgColor};
    }


      `;
  return (
    <div className="z-0 relative mt-20 group">
      <style>{styleCss}</style>

      <div>
        <div className="swiper-pagination-twentyseven"></div>
      </div>

      <div className=" gap-2 hidden lg:group-hover:flex lg:cursor-pointer">
        <div
          className={`${prevEl}   text-gray-600 arrow-color absolute h-10 w-10 flex justify-center items-center bg-transparent rounded-full left-4 top-[50%] -translate-y-1/2 z-10 `}
        >
          <ArrowLeftIcon className="h-6 font-serif font-bold" />
        </div>
        <div
          className={`${nextEl}  text-gray-600 arrow-color absolute h-10 w-10 flex justify-center items-center bg-transparent rounded-full right-4 top-[50%] -translate-y-1/2 z-10 `}
        >
          <ArrowRightIcon className="h-6 font-serif font-bold" />
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
                className="absolute flex flex-col gap-y-1 lg:gap-y-5 lg:bottom-[40%] bottom-[20%] left-5 lg:left-[20%] sm:max-w-lg w-full px-4 sm:px-0"
              >
                <p className="md:text-xl text-sm font-medium ">{s?.subtitle}</p>
                <h1 className="xl:text-4xl md:text-[28px] text-[22px] font-medium">
                  {s?.title}
                </h1>
                {s?.link && (
                  <a href={s?.link} target="_blank" rel="noopener noreferrer">
                    <h1 className="lg:px-10 lg:mt-5 px-5 lg:py-2 py-1 btn-slider duration-300 lg:text-lg text-xs w-max rounded-full lg:cursor-pointer uppercase font-medium">
                      Explore Now{" "}
                      <IoSearchCircleOutline className="inline h-5 ml-1" />
                    </h1>
                  </a>
                )}
              </div>
            </div>

            <div className="">
              <img
                className="h-auto w-full "
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

export default HeroTwentySeven;
