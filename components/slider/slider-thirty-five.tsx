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

const SliderThirtyFive = ({ nextEl, prevEl, children, breakpoints }: any) => {
  const styleCss = `
    .swiper-thirty-five .swiper-slide {
        width: 80%;
      }
      
      .swiper-thirty-five .swiper-slide:nth-child(2n) {
        width: 60%;
      }
      `;
  return (
    <Swiper
      modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
      breakpoints={breakpoints}
      // centeredSlides={true}
      // loop={true}
      slidesPerView={"auto"}
      navigation={{
        prevEl: `.${prevEl}`,
        nextEl: `.${nextEl}`,
      }}
      className='mySwiper swiper-thirty-five'
    >
      <style>{styleCss}</style>
      {children}
    </Swiper>
  );
};

export default SliderThirtyFive;
