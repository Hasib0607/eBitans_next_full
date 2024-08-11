"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import SectionHeadingThirtyThree from "@/components/section-heading/section-heading-thirtythree";
import Link from "next/link";
import DefaultSlider from "@/components/slider/default-slider";
import Card59 from "@/components/card/card59";

const FeatureProductThirtyThree = ({
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
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
 `;

  return (
    <div className="">
      <style>{styleCss}</style>
      <div className="gap-4 sm:container px-5 sm:py-10 py-5 relative arrow-hov">
        <div className="flex justify-between items-center mb-3">
          <SectionHeadingThirtyThree title={"Feature Product"} />
          <Link href="/shop">
            <p className="see py-1.5 px-2 font-bold rounded-md">See More</p>
          </Link>
        </div>

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
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
              slidesPerView: 4,
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
              <Card59 item={item} design={design} store_id={store_id} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeatureProductThirtyThree;
