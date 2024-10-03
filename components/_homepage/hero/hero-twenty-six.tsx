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
import { sliderImg } from "@/site-settings/siteUrl";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const HeroTwentySix = ({ slider, design }: any) => {
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
        border-radius: 50%;
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
        border:2px solid  ${bgColor} ;
        color: ${bgColor};
    }


      `;
  return (
    <div className="z-0 relative sm:container px-5 ">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-fourteen"></div>
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
                className="absolute top-[40%] lg:top-[30%] lg:left-28 left-10 max-w-sm"
              >
                <h1 className="xl:text-4xl md:text-[28px] text-[22px] font-medium mb-3">
                  {s?.title}
                </h1>
                <p className="md:text-xl text-sm mb-5">{s?.subtitle}</p>
                {s?.link && (
                  <a href={s?.link} target="_blank" rel="noopener noreferrer">
                    <h1 className="lg:px-6 rounded-md px-4 lg:py-3 py-2 bg-white text-black font-bold lg:text-sm text-xs w-max  btn-color duration-500 lg:cursor-pointer ">
                      Explore Now
                    </h1>
                  </a>
                )}
              </div>
            </div>
            <div className="group">
              <img
                className="h-auto min-w-full rounded-lg"
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

export default HeroTwentySix;
