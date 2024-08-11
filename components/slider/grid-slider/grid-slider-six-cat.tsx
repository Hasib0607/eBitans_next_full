"use client";
import React from "react";
import { Swiper } from "swiper/react";
import {
  Grid,
  Navigation,
  Autoplay,
  A11y,
  EffectFade,
  Controller,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./grid-slider-six-cat.css";

// import required modules

const GridSliderSixCat = ({ nextEl, prevEl, children, ...rest }: any) => {
  return (
    <Swiper
      slidesPerView={2}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      grid={{
        rows: 1,
      }}
      observer={true}
      observeParents={true}
      loop={true}
      spaceBetween={0}
      modules={[Grid, Navigation, Autoplay, A11y, EffectFade, Controller]}
      navigation={{
        prevEl: `.${prevEl}`,
        nextEl: `.${nextEl}`,
      }}
      className='h-[380px]'
      breakpoints={{
        375: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default GridSliderSixCat;
