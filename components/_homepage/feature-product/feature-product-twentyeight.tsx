"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";

import hot from "@/assets/bg-image/hot-deal-logo.gif";
import { IoIosArrowForward } from "react-icons/io";
import DefaultSlider from "@/components/slider/default-slider";
import Card58 from "@/components/card/card58";

const FeatureProductTwentyEight = ({
  feature_product,
  design,
  store_id,
}: any) => {
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
    <div className="sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="sm:container py-5 px-5 relative arrow-hov bg-[#FFEFCF]">
        <div className="mb-5 flex justify-between items-center">
          <img src={hot.src} alt="" className="h-10" />
          <p className="text-xl text-orange-600">
            সকল হট ডিল
            <IoIosArrowForward className="inline" />
          </p>
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
          {feature_product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card58 item={item} design={design} store_id={store_id} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeatureProductTwentyEight;
