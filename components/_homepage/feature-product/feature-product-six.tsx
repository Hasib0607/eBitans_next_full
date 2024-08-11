"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import "./feature-product-six.css";
import SectionHeadingSix from "@/components/section-heading/section-heading-six";
import ArrowSquare from "@/utils/arrow-square";
import GridSliderFour from "@/components/slider/grid-slider/grid-slider-four";
import Card8 from "@/components/card/card8";

const FeatureProductSix = ({ product, store_id }: any) => {
  const prev = "feature_product_prev";
  const next = "feature_product_next";

  return (
    <div className="bg-white relative sm:container px-5 sm:py-10 py-5">
      <div className="py-3">
        <SectionHeadingSix title={"Trending Products"} subtitle={""} />
        <div
          className="mt-10 group featureCustomHoverSix"
          style={{ border: "2px solid #f5f5f5", padding: "10px" }}
        >
          <div className="col-span-2">
            <div className="flex px-1 top-5 absolute inset-1 items-center">
              <ArrowSquare prevEl={prev} nextEl={next}></ArrowSquare>
            </div>
            <GridSliderFour prevEl={prev} nextEl={next}>
              {product?.map((item: any) => (
                <SwiperSlide className="swiperjs-slide" key={item?.id}>
                  <Card8 item={item} store_id={store_id} />
                </SwiperSlide>
              ))}
            </GridSliderFour>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductSix;
