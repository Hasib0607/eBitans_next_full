import React from "react";
import {
  A11y,
  Autoplay,
  Controller,
  EffectFade,
  Grid,
  Navigation,
} from "swiper/modules";
import { Swiper } from "swiper/react";

const GridSliderTwo = ({ nextEl, prevEl, children, ...rest }: any) => {
  return (
    <div className="">
      <Swiper
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 3000,
        }}
        grid={{
          rows: 2,
        }}
        modules={[Grid, Navigation, Autoplay, A11y, EffectFade, Controller]}
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        className={"swiperjs"}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default GridSliderTwo;
