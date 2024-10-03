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
const GridSliderFive = ({ nextEl, prevEl, children, ...rest }: any) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={4}
      autoplay={{
        delay: 3000,
      }}
      grid={{
        rows: 2,
      }}
      spaceBetween={8}
      modules={[Grid, Navigation, Autoplay, A11y, EffectFade, Controller]}
      navigation={{
        prevEl: `.${prevEl}`,
        nextEl: `.${nextEl}`,
      }}
      // style={{ MaxHeight: '880px' }}
      className="h-[880px]"
      breakpoints={{
        375: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default GridSliderFive;
