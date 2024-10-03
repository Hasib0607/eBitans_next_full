import React from "react";
import {
  A11y,
  Autoplay,
  Controller,
  EffectFade,
  Navigation,
} from "swiper/modules";
import { Swiper } from "swiper/react";

const SliderFive = ({ nextEl, prevEl, children, ...rest }: any) => {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
      }}
      modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
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
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1500: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      navigation={{
        prevEl: `.${prevEl}`,
        nextEl: `.${nextEl}`,
      }}
      className="mySwiper"
    >
      {children}
    </Swiper>
  );
};

export default SliderFive;
