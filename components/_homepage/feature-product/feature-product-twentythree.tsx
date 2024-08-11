"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import SectionHeadingTwentyThree from "@/components/section-heading/section-heading-twentythree";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DefaultSlider from "@/components/slider/default-slider";
import Link from "next/link";
import { productImg } from "@/site-settings/siteUrl";
import parse from "html-react-parser";

const FeatureProductTwentyThree = ({ feature_product, design }: any) => {
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const styleCss = `
    .btn-feature-product {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid transparent;
    }
    .btn-feature-product:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
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
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="pb-5 arrow-hov relative">
        <div>
          <SectionHeadingTwentyThree
            title={"FEATURE PRODUCTS"}
            design={design}
          />
        </div>
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
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
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
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          <div className="grid grid-cols-3 gap-5 overflow-hidden">
            {feature_product?.slice(0, 10).map((item: any) => (
              <SwiperSlide key={item.id}>
                <div key={item?.id}>
                  <Link href={"/product/" + item?.id + "/" + item?.slug}>
                    <div className="text-center lg:cursor-pointer">
                      <div className="overflow-hidden w-full">
                        <img
                          src={productImg + item?.image[0]}
                          alt=""
                          className="h-auto min-w-full group-hover:hidden block hover:scale-105 transform transition duration-700 ease-in-out"
                        />
                      </div>
                      <p className="font-bold py-3 text-xl uppercase px-2">
                        {item?.name.slice(0, 20)}
                        {item?.name?.length > 20 && "..."}
                      </p>
                      <p className="text-sm text-gray-600 px-2 apiHtml">
                        {parse(`${item?.description?.slice(0, 250)}`)}{" "}
                        {item?.description?.length > 250 && "..."}
                      </p>
                      <div className=" mt-5 font-semibold w-full flex justify-center">
                        <p className="py-2 px-8 btn-feature-product duration-700">
                          SHOP NOW
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeatureProductTwentyThree;
