"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules

// import "./NewArrivalProductSix.css";
import SectionHeadingSix from "../section-heading/section-heading-six";
import ArrowSquare from "@/utils/arrow-square";
import SliderFive from "../slider/slider-five";
import Card57 from "../card/card57";
import Card7 from "../card/card7";

const NewArrivalProductSix = ({ product, design, store_id }: any) => {
  const prev = "new_arrival_Prev";
  const next = "new_arrival_Next";

  return (
    <div className=" sm:container px-5 sm:py-10 py-5 rounded-sm bg-white relative">
      <div className="my-5 pt-1 flex justify-between items-center ">
        <SectionHeadingSix title={"New Arrival"} subtitle={""} />
      </div>

      <div
        className="customHoverSix"
        style={{ border: "2px solid #f5f5f5", padding: "20px" }}
      >
        <div className="flex top-5 absolute inset-1  items-center  ">
          <ArrowSquare
            prevEl={prev}
            nextEl={next}
            design={design}
          ></ArrowSquare>
        </div>
        <SliderFive prevEl={prev} nextEl={next}>
          {product.slice(0, 10).map((productData: any) => {
            console.log(productData, "productData");
            return (
              <SwiperSlide key={productData.id} className="flex justify-center">
                <Card7 item={productData} store_id={store_id} />
              </SwiperSlide>
            );
          })}
        </SliderFive>
      </div>
    </div>
  );
};

export default NewArrivalProductSix;
