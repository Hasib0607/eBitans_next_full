"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import Card67 from "@/components/card/card67";
import DefaultSlider from "@/components/slider/default-slider";
import { SwiperSlide } from "swiper/react";

const BestSellerThirtyNine = ({ best_sell_product, design, store_id }: any) => {
  const [animate, setAnimate] = useState(false);

  const prevEl = "best-product-prev-thirtynine";
  const nextEl = "best-product-next-thirtynine";

  const styleCss = `
    
 `;

  return (
    <div className="pl-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="py-5 relative">
        <div className="text-center pb-10">
          <p className="font-semibold text-[24px]">Best Selling Products</p>
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

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
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
          {best_sell_product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <div
                className={`${
                  animate ? "translate-y-0" : "translate-y-[200px]"
                } duration-1000 pb-10 `}
              >
                <Card67 item={item} design={design} store_id={store_id} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default BestSellerThirtyNine;
