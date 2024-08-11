"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { SwiperSlide } from "swiper/react";
import DefaultSlider from "@/components/slider/default-slider";
import Card58 from "@/components/card/card58";

const BestSellerTwentyEight = ({
  best_sell_product,
  design,
  store_id,
}: any) => {
  const prevEl = "best-product-prev";
  const nextEl = "best-product-next";

  const styleCss = `
    .btn-best-product {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid transparent;
    }
    .btn-best-product:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
    .best-product-prev {
        color:  ${design.header_color};
        border: 1px solid ${design.header_color};
    }
      .best-product-next{
          color:  ${design.header_color};
          border: 1px solid ${design.header_color};
    }
      .best-product-prev:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
      .best-product-next:hover {
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
        <div className="mb-3 pb-2">
          <h3 className="text-lg md:text-xl text-black pb-[10px] w-max font-bold capitalize sec-twenty-nine">
            সেরা বিক্রি পণ্য
          </h3>
        </div>
        <div className="absolute h-[1px] bg-gray-300 w-full top-10"></div>
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
            375: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {best_sell_product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <div className="px-2 pb-3">
                <Card58 item={item} design={design} store_id={store_id} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default BestSellerTwentyEight;
