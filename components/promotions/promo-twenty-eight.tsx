import React from "react";

import { SwiperSlide } from "swiper/react";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SectionHeadingTwentySeven from "../section-heading/section-heading-twenty-seven";
import DefaultSlider from "../slider/default-slider";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoTwentyEight = ({ nextEl, prevEl, banner }: any) => {
  return (
    <div>
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="relative flex flex-col md:flex-row justify-between md:items-center">
          <div className="pb-2">
            <SectionHeadingTwentySeven
              title={"আরও দেখুন, "}
              subtitle={"ভাল জিনিস আপনার জন্য অপেক্ষা করছে"}
            />
          </div>
          <div className=" gap-2 flex lg:cursor-pointer">
            <div
              className={`${prevEl}   text-gray-600 arrow-color  h-10 w-10 flex justify-center items-center bg-white rounded-full left-4 top-[50%] -translate-y-1/2`}
            >
              <BsArrowLeft className="h-6 font-serif font-bold" />
            </div>
            <div
              className={`${nextEl}  text-gray-600 arrow-color  h-10 w-10 flex justify-center items-center bg-white rounded-full right-4 top-[50%] -translate-y-1/2 `}
            >
              <BsArrowRight className="h-6 font-serif font-bold" />
            </div>
          </div>
        </div>
        <div className="">
          <DefaultSlider
            navigation={{
              prevEl: `.${prevEl}`,
              nextEl: `.${nextEl}`,
            }}
            loop={true}
            breakpoints={{
              380: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="mySwiper"
          >
            {banner?.slice(0, 4).map((b: any, index: number) => (
              <SwiperSlide key={b?.id}>
                <div
                  className={`grid grid-cols-2 rounded-lg overflow-hidden h-48 md:h-72 ${
                    index === 0
                      ? "bg-[#F8F6E3]"
                      : index === 1
                      ? "bg-[#FEF2F2]"
                      : index === 2
                      ? "bg-[#EFF6FF]"
                      : index === 3
                      ? "bg-[#F0FDF4]"
                      : null
                  }`}
                >
                  <div className="relative">
                    <a href={b?.link} target="_blank" rel="noopener noreferrer">
                      <h1 className="absolute bottom-5 left-4 rounded-full px-5 lg:py-2 py-2 bg-white duration-300 lg:text-lg text-xs text-center w-max mx-auto lg:cursor-pointer font-medium">
                        সব দেখুন
                      </h1>
                    </a>
                  </div>
                  <div className="flex justify-center items-center">
                    <img
                      className="md:w-40 md:h-40 w-32 h-32 object-cover object-center"
                      src={bannerImg + b?.image}
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
      </div>
    </div>
  );
};

export default PromoTwentyEight;
