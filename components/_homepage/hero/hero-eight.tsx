"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroEight = ({ slider }: any) => {
  let menu = ["", "", "", ""];

  const nextEl = "hero-slider-next";
  const prevEl = "hero-slider-prev";

  const bgColor = "#24bbdb";
  const textColor = "#fff";

  const pagination = {
    el: ".swiper-pagination-five",
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span className="' + className + '">' + menu[index] + "</span>";
    },
  };
  const styleCss = `
    .swiper-pagination-five .swiper-pagination-bullet {
        background:  ${textColor};
    }
    .swiper-pagination-five .swiper-pagination-bullet-active {
        background: ${bgColor};
    }`;
  return (
    <div>
      <div className="min-h-full bg-gray-800">
        <div className="sm:container px-5 pt-7 bg-white group relative">
          <div className=" border-2 bg-slate-500">
            <style>{styleCss}</style>
            <div>
              <div className="swiper-pagination-five"></div>
            </div>

            <div className="gap-2 md:group-hover:flex hidden">
              <div
                className={`${prevEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute left-10 top-1/2 -translate-y-1/ z-[2]`}
              >
                <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
              </div>
              <div
                className={`${nextEl} bg-gray-500 hover:bg-black text-white transition-all duration-500  ease-linear absolute right-10 top-1/2 -translate-y-1/ z-[2] `}
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
                      <a
                        href={s?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h1 className="lg:px-6 px-3 md:py-2 py-1 arrow-hover-five duration-300 lg:text-base text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer uppercase font-medium rounded-full">
                          Shop Now{" "}
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
        </div>
      </div>
    </div>
  );
};

export default HeroEight;
