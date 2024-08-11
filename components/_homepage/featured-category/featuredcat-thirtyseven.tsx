import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, EffectFade, Autoplay, Controller } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { catImg } from "@/site-settings/siteUrl";

const FeaturedThirtySeven = ({ category, design }: any) => {
  const customCss = `
    .hoverBorder:hover{
        border:1px solid ${design?.header_color}
    }
    `;

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div className="bg-[#F1F9DD]">
      <div className="sm:container px-5 sm:py-10 py-5 group relative">
        <style>{customCss}</style>
        <div>
          <h1 className="text-2xl text-center w-full mb-10">
            SHOP BY CATEGORY
          </h1>
        </div>

        <div className="lg:cursor-pointer flex items-center gap-3">
          <div
            ref={navigationPrevRef}
            className={`absolute left-0 top-[58%] h-8 w-8 rounded-full flex justify-center items-center bg-white transition-all duration-500 ease-linear z-[5] `}
          >
            <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
          </div>
          <div
            ref={navigationNextRef}
            className={`bg-white absolute right-0 top-[58%] h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500 ease-linear z-[5] `}
          >
            <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
          </div>
        </div>

        <Swiper
          autoplay={{ delay: 2500 }}
          speed={1000}
          // loop={true}
          modules={[Autoplay, EffectFade, Navigation, Controller]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          //   onSwiper={(swiper) => {
          //     // Delay execution for the refs to be defined
          //     setTimeout(() => {
          //       // Override prevEl & nextEl now that refs are defined

          //       swiper.params.navigation.prevEl = navigationPrevRef.current;
          //       swiper.params.navigation.nextEl = navigationNextRef.current;

          //       // Re-init navigation
          //       swiper.navigation.destroy();
          //       swiper.navigation.init();
          //       swiper.navigation.update();
          //     });
          //   }}
          className=""
          breakpoints={{
            350: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 11,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 16,
              spaceBetween: 10,
            },
          }}
        >
          {category?.map((item: any) => (
            <SwiperSlide key={item?.id} className="">
              <Link href={`/category/${item.id}`}>
                <div className="px-2 flex flex-col gap-y-1 justify-center items-center group">
                  <div className="w-20 h-20 overflow-hidden flex flex-col justify-center items-center rounded-full">
                    <img
                      src={catImg + item?.banner}
                      className="h-auto min-w-full"
                      alt="cat"
                    />
                  </div>
                  <h1 className="text-center text-sm">
                    {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
                  </h1>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedThirtySeven;
