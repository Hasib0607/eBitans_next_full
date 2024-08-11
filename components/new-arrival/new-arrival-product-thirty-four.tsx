"use client";
import React from "react";

import { SwiperSlide } from "swiper/react";
import SectionHeadingThirtyFour from "../section-heading/section-heading-thirtyfour";
import DefaultSlider from "../slider/default-slider";
import Card60 from "../card/card60";

const NewArrivalProductThirtyFour = ({ product, design, store_id }: any) => {
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
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
 `;

  const prevEl = "new-product-prev";
  const nextEl = "new-product-next";

  return (
    <div className="bg-[#F9F8FF]">
      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="text-center mb-5">
            <SectionHeadingThirtyFour title={"New Arrivals Product"} />
          </div>

          <DefaultSlider
            prevEl={prevEl}
            nextEl={nextEl}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            {product?.slice(0, 10).map((item: any) => (
              <SwiperSlide key={item?.id}>
                <Card60 item={item} design={design} store_id={store_id} />
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalProductThirtyFour;
