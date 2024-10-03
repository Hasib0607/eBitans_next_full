"use client";
// created by iazadur
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

const GridSliderThirteen = ({
  nextEl,
  prevEl,
  children,
  breakpoints,
  className,
  grid = { rows: 2 },
  ...rest
}: any) => {
  return (
    <div className="">
      <Swiper
        loop={true}
        breakpoints={breakpoints}
        autoplay={{
          delay: 3000,
        }}
        grid={grid}
        modules={[Grid, Navigation, Autoplay, A11y, EffectFade, Controller]}
        navigation={{
          prevEl: `.${prevEl}`,
          nextEl: `.${nextEl}`,
        }}
        className={className}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default GridSliderThirteen;
