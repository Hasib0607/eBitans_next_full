"use client";
import React from "react";
// import Swiper core and required modules
import {
  Navigation,
  A11y,
  EffectFade,
  Autoplay,
  Controller,
} from "swiper/modules";

import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SliderEleven = ({ nextEl, prevEl, children, ...rest }: any) => {
  return (
    <Swiper
      loop={true}
      grid={{
        rows: 1,
      }}
      autoplay={{
        delay: 5000,
      }}
      modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
      breakpoints={{
        375: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      }}
      navigation={{
        prevEl: `.${prevEl}`,
        nextEl: `.${nextEl}`,
      }}
      className='mySwiper'
    >
      {children}
    </Swiper>
  );
};

export default SliderEleven;
