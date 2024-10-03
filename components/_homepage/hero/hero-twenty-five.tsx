"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroTwentyFive = ({ slider, design }: any) => {
  return (
    <div className={`${design?.header === "twentyfive" && "pt-20"}`}>
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slider.map((item: any) => (
          <SwiperSlide key={item?.id}>
            <img
              src={sliderImg + item?.image}
              className={"min-h-[200px] min-w-full"}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroTwentyFive;
