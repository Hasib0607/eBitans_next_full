"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroThirteen = ({ slider }: any) => {
  return (
    <>
      <div className="sm:container px-5 py-3">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2000,
          }}
          spaceBetween={30}
          effect={"fade"}
          // navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Pagination, Autoplay]}
          className="mySwiper relative"
        >
          {slider?.map((i: any, id: number) => (
            <SwiperSlide key={id}>
              <div>
                <div className="absolute top-1/2 -translate-y-1/2 left-[10%] md:max-w-sm max-w-[250px] ">
                  <div style={{ color: i?.color }} className="">
                    <h1 className="xl:text-4xl md:text-[24px] text-[14px] font-seven mb-1 md:mb-5 font-bold bg-white bg-opacity-70 p-2">
                      {i?.title}
                    </h1>
                    <p className="md:text-base text-xs font-seven">
                      {i?.subtitle}
                    </p>
                  </div>
                  <a href={i?.link} target="_blank" rel="noopener noreferrer">
                    <h1 className="md:mt-5 mt-1 lg:px-5 px-2 lg:py-2 py-1 bg-transparent text-white font-seven lg:text-lg text-xs rounded-md w-max border border-white hover:bg-white hover:bg-opacity-20">
                      Shop Now
                    </h1>
                  </a>
                </div>
              </div>
              <img
                alt=""
                className={"min-w-full min-h-[200px]"}
                src={sliderImg + i.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroThirteen;
