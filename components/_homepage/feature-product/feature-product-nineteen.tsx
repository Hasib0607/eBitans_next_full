"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import SectionHeadingNineteen from "@/components/section-heading/section-heading-nineteen";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DefaultSlider from "@/components/slider/default-slider";
import Card39 from "@/components/card/card39";

const FeatureProductNineteen = ({ feature_product, design, store_id }: any) => {
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const styleCss = `
    .feature-product-prev {
      color:  ${design.header_color};
      border: 1px solid ${design.header_color};
    }
        .feature-product-next{
            color:  ${design.header_color};
            border: 1px solid ${design.header_color};
    }
        .feature-product-prev:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
        .feature-product-next:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
    .arrow-hov:hover .arrow {
        opacity:1;
        background: white;
    }
 `;

  return (
    <div className="sm:container px-5 py-16">
      <style>{styleCss}</style>
      <div className="">
        <SectionHeadingNineteen
          title={"FEATURE CATEGORIES"}
          subtitle={"Add products to weekly line up"}
        />
      </div>

      <div className="arrow-hov relative pt-10">
        <div className="">
          <div className="arrow gap-2 lg:cursor-pointer opacity-0">
            <div
              className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
          </div>
        </div>

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          className=""
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            976: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {feature_product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <div className="flex justify-center">
                <Card39 item={productData} store_id={store_id} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeatureProductNineteen;
