"use client";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionHeadingTwelve from "@/components/section-heading/section-heading-twelve";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SliderFive from "@/components/slider/slider-five";
import { testimonialImg } from "@/site-settings/siteUrl";

const TestimonialTwelve = ({ testimonials, design }: any) => {
  const prevEl = "feature-category-prev";
  const nextEl = "feature-category-next";

  const styleCss = `

    .feature-category-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .feature-category-next:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
 
    `;

  return (
    <div className="xl:px-60 px-5 bg-white relative py-5 group ">
      <style>{styleCss}</style>
      <SectionHeadingTwelve title={"Testimonials"} subtitle={""} />
      <div className="relative">
        <div className=" gap-2 lg:cursor-pointer group-hover:block hidden">
          <div
            className={`${prevEl} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-36 z-10 `}
          >
            <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
          <div
            className={`${nextEl} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-36 z-10 `}
          >
            <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
        </div>
      </div>

      <SliderFive prevEl={prevEl} nextEl={nextEl}>
        {testimonials.map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card item={productData} />
          </SwiperSlide>
        ))}
      </SliderFive>
    </div>
  );
};

export default TestimonialTwelve;

const Card = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" gap-8 overflow-hidden h-80">
        <div
          className="flex justify-center mb-5 h-20 w-20 border-4 border-gray-200 overflow-hidden rounded-full mx-auto"
          onClick={() => setOpen(!open)}
        >
          <img
            src={testimonialImg + item.image}
            alt="Mountain"
            className="rounded-full h-auto min-w-full hover:scale-105 duration-500"
          />
        </div>

        <div className="text-center px-2">
          <p className="uppercase text-[13px] font-medium mb-4 font-twelve text-blue-400">
            {" "}
            {item.name}
          </p>
          <p className=" text-[13px] text-gray-600 mb-4 font-twelve">
            {" "}
            {item.feedback}
          </p>
        </div>
      </div>
    </>
  );
};
