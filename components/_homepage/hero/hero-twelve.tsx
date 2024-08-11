"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { BiRightArrowAlt } from "react-icons/bi";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroTwelve = ({ slider, design }: any) => {
  let menu = [""];

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const pagination = {
    el: ".swiper-pagination-twelve",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `
    .swiper-pagination-twelve {
        position: absolute;
        bottom: 10px !important;
        left: 50% !important;
        transform: translateX(-50%);
        width: auto !important;
        margin: 0;
        z-index: 1000;
    }
    .swiper-pagination-twelve .swiper-pagination-bullet {
    background:  ${textColor};
    border-radius: 50%;
	width: 15px;
	height: 15px;
	opacity: 1;
  }
  .swiper-pagination-twelve .swiper-pagination-bullet-active {
    background: ${bgColor};
    width: 15px;
	height: 15px;
    border-radius: 25px;
    transition-duration: 500ms;

  }
  .shop-link {
      border:1px solid ${bgColor};
      color:  ${bgColor};

  }
  .shop-link:hover {
      background: ${bgColor};
      border:1px solid transparent;
      transform: scale(1.05);
      color:  ${textColor};
  }


    `;

  return (
    <div className="group z-0 relative sm:container px-5 lg:mt-10 mt-5">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-twelve"></div>
      </div>

      <div className="lg:group-hover:flex hidden">
        <div
          className={`${prevEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute left-6 top-1/2 z-10 `}
        >
          <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
        <div
          className={`${nextEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute right-6 top-1/2 z-10 `}
        >
          <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        loop={true}
        spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination, Autoplay, Navigation, Controller]}
        className="mySwiper relative "
      >
        {slider?.map((s: any) => (
          <SwiperSlide key={s.id}>
            <div className="">
              <div
                style={{ color: s?.color }}
                className="absolute z-[1] top-1/2 -translate-y-1/2 md:max-w-[450px] max-w-[250px] px-4 sm:px-0 lg:left-[10%] sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
              >
                <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:leading-7">
                  {s?.title}
                </h1>
                {/* <p className='h-[2px] w-10 bg-black mx-auto md:block hidden'></p> */}
                <p className="md:text-lg text-xs md:leading-5">{s?.subtitle}</p>
                <a href={s?.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="lg:px-10 px-3 md:py-2 py-1 shop-link duration-300 lg:text-lg text-xs sm:text-left w-max  lg:cursor-pointer uppercase font-medium">
                    Shop Now <BiRightArrowAlt className="inline" />
                  </h1>
                </a>
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

export default HeroTwelve;
