"use client";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";

import ScrollTrigger from "react-scroll-trigger";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DefaultSlider from "../slider/default-slider";
import Card67 from "../card/card67";

const NewArrivalProductThirtyNine = ({ product, design, store_id }: any) => {
  const [animate, setAnimate] = useState(false);

  const prevEl = "new-product-prev-thirtynine";
  const nextEl = "new-product-next-thirtynine";

  const styleCss = `
  
 `;

  if (product.length === 0) {
    return null;
  }

  return (
    <div className="pl-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="py-5 relative">
        <div className="text-center pb-10">
          <p className="font-semibold text-[24px]">New Arrival Products</p>
        </div>

        <div className="gap-10 flex lg:cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
          <div className={`${prevEl} lg:cursor-pointer `}>
            <ChevronLeftIcon className="h-4 font-serif font-bold" />
          </div>
          <div className=""></div>
          <div className={`${nextEl} lg:cursor-pointer`}>
            <ChevronRightIcon className="h-4 font-serif font-bold" />
          </div>
        </div>
        {/* 
        <ScrollTrigger onEnter={() => setAnimate(true)}> */}
        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          paginationType={"fraction"}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5.35,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <div
                className={`${
                  animate ? "translate-y-0" : "translate-y-[200px]"
                } duration-1000 pb-10 `}
              >
                <Card67 design={design} store_id={store_id} item={item} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
        {/* </ScrollTrigger> */}
      </div>
    </div>
  );
};

export default NewArrivalProductThirtyNine;
