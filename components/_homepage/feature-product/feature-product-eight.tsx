"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import Arrowbetween from "@/utils/arrow-between";
import SliderNine from "@/components/slider/slider-nine";
import Card19 from "@/components/card/card19";

const FeatureProductEight = ({ feature_product, design, store_id }: any) => {
  const prev = "daily_best_seller_Prev";
  const next = "daily_best_seller_Next";
  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white relative">
      <SectionHeadingSeven title={"Daily Best Sells"} subtitle={""} />
      <div className="mb-16 absolute inset-1 flex items-center">
        <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
      </div>

      <SliderNine prevEl={prev} nextEl={next}>
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            {" "}
            <Card19 item={productData} design={design} store_id={store_id} />
          </SwiperSlide>
        ))}
      </SliderNine>
    </div>
  );
};

export default FeatureProductEight;
