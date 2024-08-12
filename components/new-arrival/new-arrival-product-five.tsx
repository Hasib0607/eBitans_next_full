"use client";
import React from "react";
import Arrow from "@/utils/arrow";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import DefaultSlider from "@/components/slider/default-slider";
import { SwiperSlide } from "swiper/react";
import Card41 from "@/components/card/card41";

const NewArrivalProductFive = ({ product }: any) => {
  const prev1 = "best_seller_Prev1";
  const next1 = "best_seller_Next1";

  return (
    <div className="shadow-lg sm:container px-5 sm:py-10 py-5 rounded-md">
      <div className="py-5 pt-1 flex justify-between items-center">
        <SectionHeadingFive
          title={"New Arrivals"}
          subtitle={"New arrivals products to our weekly lineup"}
        />
        <div className="pt-14 hidden sm:block">
          <Arrow prevEl={prev1} nextEl={next1}></Arrow>
        </div>
      </div>

      <div className="">
        <DefaultSlider
          prevEl={prev1}
          nextEl={next1}
          breakpoints={{
            350: {
              slidesPerView: 1,
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
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => {
            return (
              <SwiperSlide key={item?.id}>
                <Card41 item={item} />
              </SwiperSlide>
            );
          })}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default NewArrivalProductFive;
