"use client";
// created by iazadur
import React from "react";
import { SwiperSlide } from "swiper/react";
import SectionHeadingThirteen from "../section-heading/section-heading-thirteen";
import GridSliderThirteen from "../slider/grid-slider/grid-slider-thirteeen";
import Card18 from "../card/card18";

const NewArrivalProductThirteeen = ({ product, design, store_id }: any) => {
  const prev = "newArrrival_productThirteen_prev";
  const next = "newArrrival_productThirteen_next";

  return (
    <div className="bg-white ">
      <div className="sm:container px-5 sm:py-10 py-5">
        <SectionHeadingThirteen
          prev={prev}
          next={next}
          title={"New Arrival Products"}
          design={design}
        />
        <GridSliderThirteen
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            350: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            600: {
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
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className={"h-[1000px] my-2 sm:my-12"}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide className="swiperjs_grid_two" key={item?.id}>
              <Card18 item={item} store_id={store_id} />
            </SwiperSlide>
          ))}
        </GridSliderThirteen>
      </div>
    </div>
  );
};

export default NewArrivalProductThirteeen;
