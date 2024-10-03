import React from "react";

// import Swiper core and required modules
import { A11y, EffectFade, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import SectionHeading from "../section-heading/section-heading";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoFour = ({ banner, design }: any) => {
  if (banner.length === 0) {
    return;
  }
  return (
    <>
      <div className="sm:container px-5 sm:py-10 py-5 bg-gray-50">
        <div className="pb-2">
          <SectionHeading text={"Current Offers"} design={design} />
        </div>
        <div className=" shadow-xl rounded-md p-8">
          <Swiper
            loop={true}
            spaceBetween={30}
            navigation={true}
            modules={[A11y, EffectFade, Navigation]}
            breakpoints={{
              380: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="mySwiper"
          >
            {banner?.map((b: any) => (
              <SwiperSlide key={b.id}>
                <div className="">
                  <a href={b?.link} target="_blank" rel="noopener noreferrer">
                    <img
                      className="h-auto min-w-full object-cover object-center"
                      src={bannerImg + b?.image}
                      alt=""
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default PromoFour;
