"use client";
import React from "react";

import { SwiperSlide } from "swiper/react";
import SectionHeadingTwentySeven from "../section-heading/section-heading-twenty-seven";
import DefaultSlider from "../slider/default-slider";
import Card51 from "../card/card51";

const NewArrivalProductTwentySeven = ({ product, design, store_id }: any) => {
  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5 ">
      <div className="">
        <div className=" pb-2">
          <SectionHeadingTwentySeven title={"New Arrival"} />
        </div>
        <DefaultSlider
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            560: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card51 item={item} design={design} store_id={store_id} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default NewArrivalProductTwentySeven;
