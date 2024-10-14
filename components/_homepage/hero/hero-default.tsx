"use client";

import { sliderImg } from "@/site-settings/siteUrl";
import { BsArrowRight } from "react-icons/bs";
import { Pagination, Autoplay, Navigation, Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/react";
import "swiper/css";

const HeroDefault = ({ slider }: any) => {
  let menu = [""];
  const pagination = {
    el: ".swiper-pagination-seven",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `
      .swiper-pagination-seven .swiper-pagination-bullet {
        background:  "#000";
    }
    .swiper-pagination-seven .swiper-pagination-bullet-active {
        background: "#000";

    }
      `;
  return (
    <div className="group z-0 relative xl:px-20 lg:px-10 md:px-10 px-5 bg-white pb-5 w-full">
      <style>{styleCss}</style>
      <div>
        <div className="swiper-pagination-seven"></div>
      </div>
      <Swiper
        loop={true}
        spaceBetween={30}
        pagination={pagination}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination, Autoplay, Navigation, Controller]}
        className={`mySwiper renderBullet relative rounded-lg`}
      >
        {slider?.map((s: any) => (
          <SwiperSlide key={s.id}>
            <div className="">
              <div className="pr-[50%] absolute xl:top-48 lg:top-24 md:top-20 top-12 text-black font-thin lg:left-32 md:left-[120px] left-[60px]"></div>
            </div>
            <a
              href="https://admin.ebitans.com/design/homepage/slider"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="lg:px-5 px-2 lg:py-2 py-1 bg-black text-white lg:text-lg text-xs md:block hidden rounded-md w-max absolute lg:bottom-48 bottom-16 lg:cursor-pointer md:left-[120px] left-10">
                Go To Collection{" "}
                <BsArrowRight className="inline lg:ml-3 ml-1 lg:text-2xl text-sm " />
              </h1>
            </a>
            <img
              className="rounded-lg h-[200px] w-full xl:h-[700px] lg:h-[480px] md:h-[310px]"
              src={sliderImg + s.image}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroDefault;
