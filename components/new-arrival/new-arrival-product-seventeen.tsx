"use client";
import React from "react";
import "./new-arrival-product-seventeen.css";

import image from "./bg-img/17/show_divider_5_69x61.webp";

import {
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";
import img1 from "./bg-img/17/bg.webp";
import SectionHeadingSeventeen from "../section-heading/section-heading-seventeen";
import Image from "next/image";
import Card35 from "../card/card35";

const NewArrivalProductSeventeen = ({ product, design, store_id }: any) => {
  return (
    <div className="relative z-0 h-full overflow-hidden py-4 ">
      <div className="hidden lg:block">
        <ParallaxProvider>
          <ParallaxBanner className="xl:aspect-[1.3/1] lg:aspect-[0.9/1] w-full">
            <ParallaxBannerLayer
              image={img1.src}
              speed={-100}
              style={{
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </ParallaxBanner>
        </ParallaxProvider>
      </div>
      <div className="lg:absolute top-1/2 lg:-translate-y-1/2 left-1/2 lg:-translate-x-1/2 z-[1] sm:container px-5 xl:px-80 mx-auto">
        <div className="flex justify-center ">
          <SectionHeadingSeventeen text={"Crazy Flavor Cakes"} />
        </div>
        <div className="flex justify-center pt-2">
          <img src={image.src} alt="" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-2 xl:gap-5 mt-16">
          {product?.slice(0, 8).map((data: any) => (
            <Card35
              item={data}
              key={data?.id}
              design={design}
              store_id={store_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalProductSeventeen;
