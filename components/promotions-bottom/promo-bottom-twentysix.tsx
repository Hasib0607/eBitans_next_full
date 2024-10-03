"use client";
import { bannerImg, brandImg } from "@/site-settings/siteUrl";
import React from "react";
import { SwiperSlide } from "swiper/react";
import DefaultSlider from "../slider/default-slider";
import Link from "next/link";

const PromoBottomTwentySix = ({ banner, brand }: any) => {
  return (
    <>
      {banner[2] && (
        <div className="sm:container px-5 sm:py-10 py-5">
          <div className="relative group">
            <img
              src={bannerImg + banner[2]?.image}
              alt=""
              className="min-w-full object-cover h-auto object-center rounded-md"
            />
            {banner[2]?.link && (
              <a
                href={banner[2]?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute z-[1] left-1/2 -translate-x-1/2 bottom-[10%] font-bold bg-black text-white px-10 py-2 text-sm rounded-sm border-2 duration-500 border-black hover:bg-white hover:text-black w-max"
              >
                Go To Collection
              </a>
            )}
          </div>
          {brand && (
            <div className="sm:mt-10 mt-5">
              <DefaultSlider
                breakpoints={{
                  350: {
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
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1920: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {brand?.map((item: any, index: any) => (
                  <SwiperSlide key={index}>
                    <Link href={"/brand/" + item?.id}>
                      <img
                        src={brandImg + item?.image}
                        alt=""
                        className="h-40"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </DefaultSlider>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PromoBottomTwentySix;
