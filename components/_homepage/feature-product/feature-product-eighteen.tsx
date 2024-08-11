"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SectionHeadingEighteen from "@/components/section-heading/section-heading-eighteen";
import DefaultSlider from "@/components/slider/default-slider";
import Card38 from "@/components/card/card38";

const FeatureProductEighteen = ({ feature_product, design, store_id }: any) => {
  const prevEl = "feature_product-sixteen-prev";
  const nextEl = "feature_product-sixteen-next";

  const styleCss = `
  .arrow-hov:hover .arrow {
    opacity:1;
    background: white;
  }
  .text-hover:hover {
    color:  ${design?.header_color};
 }
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 relative">
      <style>{styleCss}</style>
      <SectionHeadingEighteen title={"Featured Products"} subtitle={""} />
      <div className="relative z-[6]">
        <div className=" gap-4 lg:cursor-pointer flex absolute right-0 sm:-top-16 -top-10 duration-500">
          <div className={`${prevEl}  `}>
            <BsArrowLeft className="text-xl text-gray-500 text-hover" />
          </div>
          <div className={`${nextEl} `}>
            <BsArrowRight className="text-xl text-gray-500 text-hover" />
          </div>
        </div>
      </div>

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
        loop={true}
        loopFillGroupWithBlank={true}
        breakpoints={{
          250: {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
          560: {
            slidesPerView: 2,
            spaceBetween: 10,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesPerGroup: 3,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerGroup: 4,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 20,
            slidesPerGroup: 4,
          },
        }}
      >
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card38 item={productData} design={design} store_id={store_id} />
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default FeatureProductEighteen;
