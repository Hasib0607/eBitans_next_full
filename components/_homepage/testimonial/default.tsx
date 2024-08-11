"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import DefaultSlider from "@/components/slider/default-slider";
import { testimonialImg } from "@/site-settings/siteUrl";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TestimonialThree = ({ testimonials, design }: any) => {
  const prev = "testimonial_Prev";
  const next = "testimonial_Next";

  const styleCss = `
    .testimonial-three {
        background : white;
        color: black;
        border: 1px solid ${design?.header_color};
        
    }
    .testimonial-three:hover {
        background : ${design?.header_color};
        color: ${design?.text_color};
        border: 1px solid ${design?.header_color} ;
    }
    `;

  return (
    <section className="bg-white dark:bg-gray-900">
      <style>{styleCss}</style>
      <div className="container px-6 py-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Our <span className="text-blue-500">Customer Testimonials</span>
        </h1>
        <div className="mt-8">
          <DefaultSlider
            prevEl={prev}
            nextEl={next}
            breakpoints={{
              350: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1920: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            {testimonials?.map((item: any) => (
              <SwiperSlide key={item?.id}>
                <div className="p-5 min-h-[270px] rounded-lg testimonial-three duration-500">
                  <div className="flex gap-5 items-center">
                    <img
                      src={testimonialImg + item?.image}
                      alt=""
                      className="h-32 w-32 rounded-full border-4 border-gray-200"
                    />
                    <div className="space-y-1">
                      <h1 className="font-semibold text-lg">{item?.name}</h1>
                      <p className="font-semibold text-sm">
                        {item?.occupation}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5">{item?.feedback}</p>
                </div>
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
        <div className="flex lg:cursor-pointer gap-3 mt-3">
          <div
            className={`${prev}   text-gray-600 arrow-color h-10 w-10 flex justify-center items-center bg-white rounded-full`}
          >
            <ChevronLeftIcon className="h-6 font-serif font-bold" />
          </div>
          <div
            className={`${next}  text-gray-600 arrow-color h-10 w-10 flex justify-center items-center bg-white rounded-full `}
          >
            <ChevronRightIcon className="h-6 font-serif font-bold" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialThree;
