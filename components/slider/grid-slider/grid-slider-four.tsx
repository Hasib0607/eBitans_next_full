"use client";
import React from "react";
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./grid-style.css";

// import required modules
import {
  Grid,
  Navigation,
  Autoplay,
  A11y,
  EffectFade,
  Controller,
} from "swiper/modules";

const GridSliderFour = ({ nextEl, prevEl, children, ...rest }: any) => {
  return (
    <Swiper
      slidesPerView={4}
      autoplay={{
        delay: 3000,
      }}
      grid={{
        rows: 2,
      }}
      spaceBetween={4}
      modules={[Grid, Navigation, Autoplay, A11y, EffectFade, Controller]}
      navigation={{
        prevEl: `.${prevEl}`,
        nextEl: `.${nextEl}`,
      }}
      className="h-[280px] xl:h-[320px] lg:h-[320px] md:h-[320px]"
      breakpoints={{
        375: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default GridSliderFour;
