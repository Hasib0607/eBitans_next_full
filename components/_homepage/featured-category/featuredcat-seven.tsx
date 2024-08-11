import React from "react";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import DefaultSlider from "@/components/slider/default-slider";
import Card9 from "@/components/card/card9";
import Arrowbetween from "@/utils/arrow-between";

const FeaturedSeven = ({ category }: any) => {
  const prev = "best_seller_seven_Prev";
  const next = "best_seller_seven_Next";

  return (
    <div className="container px-5 bg-white relative py-5">
      <SectionHeadingSeven title={"Featured Categories"} subtitle={""} />
      <div className="relative px-5">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            350: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
          }}
        >
          {category.map((product9Data: any) => (
            <SwiperSlide key={product9Data.id}>
              <Card9 item={product9Data} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
        <div className="top-3 left-0 right-0 absolute inset-1 flex items-center">
          <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSeven;
