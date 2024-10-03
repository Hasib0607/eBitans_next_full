"use client";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoBottomFifteen = ({ banner }: any) => {
  return (
    <div>
      {banner[2] && (
        <div className="sm:container px-5 sm:py-10 py-5">
          <h1 className="text-3xl mb-5 sm:mb-10 font-bold">Weekly Deals</h1>
          <Swiper
            // spaceBetween={60}
            // loop={true}
            autoplay={{
              delay: 2000,
            }}
            speed={1000}
            // centeredSlides={true}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 8,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {banner?.slice(2, banner?.length).map((item: any) => (
              <SwiperSlide className="" key={item.id}>
                <div className="relative group">
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={bannerImg + item?.image}
                      alt=""
                      className="h-auto min-w-full rounded-md"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default PromoBottomFifteen;
