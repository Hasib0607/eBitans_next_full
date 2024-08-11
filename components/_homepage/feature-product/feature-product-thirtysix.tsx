"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import DefaultSlider from "@/components/slider/default-slider";
import Card63 from "@/components/card/card63";

const FeatureProductThirtySix = ({
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
    <div data-aos="fade-up" className="">
      <style>{styleCss}</style>
      <div
        data-aos="fade-up"
        className="gap-4 sm:container px-5 sm:py-10 py-5 relative arrow-hov"
      >
        <div className="text-center py-10 flex items-center justify-center">
          <p className="text-xl xl:text-2xl">Feature Products</p>
        </div>

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            980: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
          }}
        >
          {feature_product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card63 item={item} design={design} store_id={store_id} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeatureProductThirtySix;
