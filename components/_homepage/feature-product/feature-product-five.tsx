"use client";
import React from "react";
import featureProduct from "@/assets/img/featureProduct.png";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import Arrow from "@/utils/arrow";
import GridSliderTwo from "@/components/slider/grid-slider/grid-slider-two";
import { SwiperSlide } from "swiper/react";
import Card57 from "@/components/card/card57";

const FeatureProductFive = ({ feature_product }: any) => {
  const prev1 = "feature_product_prev";
  const next1 = "feature_product_next";

  return (
    <div
      style={{
        backgroundImage: `url(${featureProduct.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="container px-5 py-5">
        <div className="grid grid-cols-7 py-3 sm:m-0">
          <div className="hidden lg:flex lg:col-span-3"></div>
          <div className="lg:col-span-4 col-span-7 mx-4 sm:mx-0">
            <div className="my-5 pt-1 px-3 flex justify-between items-center">
              <SectionHeadingFive
                title={"Feature Products"}
                subtitle={"Feature products to our weekly lineup"}
              />
              <div className="hidden lg:block">
                <Arrow prevEl={prev1} nextEl={next1}></Arrow>
              </div>
            </div>
            <GridSliderTwo loop={true} prevEl={prev1} nextEl={next1}>
              {feature_product?.slice(0, 10).map((item: any) => (
                <SwiperSlide className="swiperjs-slide" key={item?.id}>
                  <Card57 item={item} />
                </SwiperSlide>
              ))}
            </GridSliderTwo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductFive;
