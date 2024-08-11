"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import SectionHeadingNine from "@/components/section-heading/section-heading-nine";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import GridSliderThirteen from "@/components/slider/grid-slider/grid-slider-thirteen";
import Card22 from "@/components/card/card22";

const BestSellerNine = ({ best_sell_product, design, store_id }: any) => {
  const prev = "best_seller_nine_prev";
  const next = "best_seller_nine_next";

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
    .best_seller_nine_prev:hover {
        color:${textColor};
        background:${bgColor};
      }
      .best_seller_nine_next:hover {
        color:${textColor};
        background:${bgColor};
      }
      .all-icon:hover {
        color:${textColor};
        background:${bgColor};
      }

    .arrow-hov:hover .arrow {
        display:block;
        background: white;
    }
 
    `;

  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="space-y-10">
        <SectionHeadingNine
          title={"Best Sellers"}
          subtitle={"Add our best sellers to your weekly lineup"}
        />
        <div className="arrow-hov relative">
          <div className=" gap-2 lg:cursor-pointer hidden arrow ">
            <div
              className={`${prev} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -left-4  top-1/2 -translate-y-1/2 z-[1] `}
            >
              <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${next} bg-gray-400 text-white rounded-full transition-all duration-500 ease-linear absolute -right-4 top-1/2 -translate-y-1/2 z-[1] `}
            >
              <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
            </div>
          </div>

          <GridSliderThirteen
            prevEl={prev}
            nextEl={next}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className={"md:h-[1080px] h-[700px]"}
          >
            {best_sell_product?.slice(0, 10).map((item: any) => (
              <SwiperSlide className="swiperjs_grid_two" key={item?.id}>
                <Card22 item={item} design={design} store_id={store_id} />
              </SwiperSlide>
            ))}
          </GridSliderThirteen>
        </div>
      </div>
    </div>
  );
};

export default BestSellerNine;
