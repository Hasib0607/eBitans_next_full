"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { BsArrowRight } from "react-icons/bs";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroSix = ({ slider, design }: any) => {
  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";
  let menu = [""];
  const bgColor = design?.header_color;
  const textColor = design?.text_color;
  const pagination = {
    el: ".swiper-pagination-five",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,
    renderBullet: function (index: any, className: any) {
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
        background: ${textColor};
    
    }
    
    .swiper-pagination-five .swiper-pagination-bullet-active {
        width: 12px;
        height: 12px;
        border-radius: 25px;
        transition-duration: 500ms;
        background: ${bgColor};

    }
    .arrow-hover {
        border: 1px solid ${bgColor};
        color: ${bgColor};      
    }
    .arrow-hover:hover {
        background: ${bgColor};
        color: ${textColor};
        border: 1px solid ${bgColor};
        
    }
    `;
  return (
    <div className="group z-0 relative bg-white sm:container px-5">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-five"></div>
      </div>
      <div className=" gap-2  md:group-hover:flex hidden">
        <div
          className={`${prevEl} bg-gray-500 arrow-hover text-white transition-all lg:cursor-pointer duration-500  ease-linear absolute left-10 top-[50%] -translate-y-1/2 z-10  `}
        >
          <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
        <div
          className={`${nextEl} bg-gray-500 arrow-hover  text-white transition-all lg:cursor-pointer duration-500  ease-linear absolute right-10 top-[50%] -translate-y-1/2 z-10 `}
        >
          <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        loop={false}
        spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination, Autoplay, Navigation, Controller]}
        className="mySwiper relative"
      >
        {slider?.map((s: any) => (
          <SwiperSlide key={s.id}>
            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] max-w-[50%]">
              <div style={{ color: s?.color }} className="">
                <h1 className="xl:text-4xl md:text-[24px] text-[14px] font-seven mb-1 md:mb-3 font-bold">
                  {s?.title}
                </h1>
                <p className="md:text-base text-xs font-seven">{s?.subtitle}</p>
              </div>
              {s?.link && (
                <a href={s?.link} target="_blank" rel="noopener noreferrer">
                  <h1 className="md:mt-10 mt-3 lg:px-5 px-2 lg:py-2 py-1 bg-black text-white font-seven lg:text-lg text-xs rounded-md w-max">
                    Go To Collection{" "}
                    <BsArrowRight className="inline lg:ml-3 ml-1 lg:text-2xl text-sm " />
                  </h1>
                </a>
              )}
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

export default HeroSix;
