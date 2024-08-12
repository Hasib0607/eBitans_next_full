"use client";
import React from "react";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import SliderFive from "@/components/slider/slider-five";
import { SwiperSlide } from "swiper/react";
import Card11 from "@/components/card/card11";
import Arrowbetween from "@/utils/arrow-between";

const BestSellerSeven = ({ best_sell_product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";

  return (
    <div className="container px-5 bg-white relative py-5">
      <SectionHeadingSeven title={"Flash Sale"} subtitle={""} />
      <div className="relative px-5">
        <SliderFive prevEl={prev} nextEl={next}>
          {best_sell_product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              {" "}
              <Card11 item={productData} />
            </SwiperSlide>
          ))}
        </SliderFive>
        <div className="top-3 left-0 right-0 absolute inset-1 flex items-center">
          <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
        </div>
      </div>
    </div>
  );
};

export default BestSellerSeven;
