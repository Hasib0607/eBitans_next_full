"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  A11y,
  Autoplay,
  Controller,
  EffectFade,
  Navigation,
} from "swiper/modules";
// Import Swiper styles
import Card47 from "@/components/card/card47";
import SectionHeadingTwentyThree from "@/components/section-heading/section-heading-twentythree";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BestSellerTwentyThree = ({
  best_sell_product,
  design,
  store_id,
}: any) => {
  const swiperRef = useRef<any>(null);

  const stopAutoplay = () => {
    const swiper = swiperRef.current.swiper;
    swiper.autoplay.stop();
  };

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
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="pb-5 md:arrow-hov relative">
        <div>
          <SectionHeadingTwentyThree title={"TRENDING NOW"} />
        </div>
        <div className="">
          <div className="md:arrow gap-2 lg:cursor-pointer md:opacity-0">
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

        <div>
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            speed={1000}
            navigation={{
              prevEl: `.${prevEl}`,
              nextEl: `.${nextEl}`,
            }}
            className="mySwiper"
            // autoplay={{ delay: 2500,  disableOnInteraction:false }}
            // loop={click ? false : true}
            // autoplay={false}
            breakpoints={{
              250: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              976: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            <div className="grid grid-cols-3 gap-5 overflow-hidden">
              {best_sell_product?.slice(0, 10).map((item: any) => (
                <SwiperSlide key={item.id}>
                  <Card47
                    design={design}
                    store_id={store_id}
                    item={item}
                    stopAutoplay={stopAutoplay}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BestSellerTwentyThree;
