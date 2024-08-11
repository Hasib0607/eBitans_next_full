"use client";
import React from "react";

import { SwiperSlide } from "swiper/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SectionHeadingTwentyNine from "../section-heading/section-heading-twentynine";
import DefaultSlider from "../slider/default-slider";
import Card53 from "../card/card53";

const NewArrivalProductTwentyNine = ({ product, design, store_id }: any) => {
  const prevEl = "new-product-prev";
  const nextEl = "new-product-next";

  const styleCss = `
   
    .new-product-prev {
        color:  ${design.header_color};
        border: 1px solid ${design.header_color};
    }
      .new-product-next{
          color:  ${design.header_color};
          border: 1px solid ${design.header_color};
    }
      .new-product-prev:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
      .new-product-next:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
 `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="relative arrow-hov">
        <div className=" pb-2">
          <SectionHeadingTwentyNine
            design={design}
            title={"Top Deals Of The Day"}
          />
        </div>
        <div className="">
          <div className="arrow gap-2 lg:cursor-pointer opacity-0">
            <div
              className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
          </div>
        </div>
        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            560: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
          }}
        >
          {product?.map((item: any) => (
            <SwiperSlide key={item?.id}>
              <div className="px-2 pb-3">
                <Card53 design={design} store_id={store_id} item={item} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default NewArrivalProductTwentyNine;
