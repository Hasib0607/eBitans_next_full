"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { BsPlay } from "react-icons/bs";
import SectionHeadingSixteen from "@/components/section-heading/section-heading-sixteen";
import DefaultSlider from "@/components/slider/default-slider";
import Card25 from "@/components/card/card25";

const FeatureProductSixteen = ({ feature_product, design, store_id }: any) => {
  const prevEl = "feature_product-sixteen-prev";
  const nextEl = "feature_product-sixteen-next";

  const styleCss = `
    .feature_product-sixteen-prev:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
    .feature_product-sixteen-next:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
  .arrow-hov:hover .arrow {
    opacity:1;
    background: white;
  }
 
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 relative arrow-hov">
      <style>{styleCss}</style>
      <SectionHeadingSixteen title={"Trending Products"} subtitle={""} />
      <div className="relative z-[2] ">
        <div className=" gap-2 lg:cursor-pointer arrow lg:opacity-0  duration-500">
          <div
            className={`${prevEl} bg-gray-400 text-white h-10 w-10 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute -left-4 top-[140px] sm:top-[180px]  z-[2] `}
          >
            <BsPlay className="h-8 text-2xl rotate-180 font-serif font-bold" />
          </div>
          <div
            className={`${nextEl} bg-gray-400 flex justify-center items-center h-10 w-10 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 z-[2] top-[140px] sm:top-[180px]`}
          >
            <BsPlay className="h-8 text-2xl  font-serif font-bold" />
          </div>
        </div>
      </div>

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
        breakpoints={{
          350: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1920: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
      >
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card25 item={productData} design={design} store_id={store_id} />
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default FeatureProductSixteen;
