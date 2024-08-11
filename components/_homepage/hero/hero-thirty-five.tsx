"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  Navigation,
  Controller,
  EffectCreative,
  EffectFade,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './heroSixteenCss/herosixteen.css'
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import { BiRightArrowAlt } from "react-icons/bi";
import { sliderImg } from "@/site-settings/siteUrl";

const HeroThirtyFive = ({ slider }: any) => {
  const styleCss = `
      `;
  return (
    <div className="border-b-2 border-black mt-20">
      <div className="z-0 relative sm:container px-5 group">
        <style>{styleCss}</style>

        <Swiper
          speed={2000}
          // effect={"fade"}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          modules={[
            Pagination,
            Autoplay,
            Navigation,
            Controller,
            EffectCreative,
            EffectFade,
          ]}
          className="mySwiper relative"
        >
          {slider?.map((s: any) => (
            <SwiperSlide key={s.id}>
              <div className="">
                <div
                  style={{ color: s?.color }}
                  className="absolute z-[1] md:text-center top-1/2 -translate-y-1/2 md:max-w-sm max-w-[250px] px-4 sm:px-0 lg:left-14 xl:left-24 md:left-10 sm:left-5 flex flex-col gap-y-2 md:gap-y-4"
                >
                  <h1 className="xl:text-4xl md:text-[28px] text-[16px] font-bold md:text-center md:leading-7">
                    {s?.title}
                  </h1>
                  {/* <p className='h-[2px] w-10 bg-black mx-auto md:block hidden'></p> */}
                  <p className="md:text-lg text-xs md:text-center md:leading-5">
                    {s?.subtitle}
                  </p>
                  {s?.link && (
                    <a href={s?.link} target="_blank" rel="noopener noreferrer">
                      <h1
                        className={`lg:px-10 px-6 md:py-2 py-1 btn-slider duration-300 lg:text-lg text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer bg-black text-white rounded-full font-medium ${
                          !s?.title && "sm:mt-20 mt-10"
                        }`}
                      >
                        Shop Now <BiRightArrowAlt className="inline" />
                      </h1>
                    </a>
                  )}
                </div>
              </div>
              <div className="">
                <img
                  className="h-auto min-w-full"
                  src={sliderImg + s.image}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroThirtyFive;
