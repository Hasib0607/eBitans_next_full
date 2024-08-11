"use client";
import React from "react";

import { SwiperSlide } from "swiper/react";
import SectionHeadingTwentyFive from "@/components/section-heading/section-heading-twenty-five";
import DefaultSlider from "@/components/slider/default-slider";
import Card50 from "@/components/card/card50";

const FeatureProductTwentyFive = ({
  feature_product,
  design,
  store_id,
}: any) => {
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";
  const styleCss = `
    .feature-product-prev:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
    .feature-product-next:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
 `;
  return (
    <div className="sm:px-10 px-5 pb-10">
      <style>{styleCss}</style>
      <SectionHeadingTwentyFive design={design} title={"Running Product"} />

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
        breakpoints={{
          250: {
            slidesPerView: 2,
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
          976: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card50 item={productData} design={design} store_id={store_id} />
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default FeatureProductTwentyFive;
