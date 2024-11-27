"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SectionHeading from "@/components/section-heading/section-heading";
import { testimonialImg } from "@/site-settings/siteUrl";

const TestimonialFour = ({ testimonials, design }: any) => {
  let isLoop = testimonials.length > 1;

  if (testimonials.length === 0) {
    return;
  }

  return (
    <div className=" sm:container px-5 sm:py-10 py-5 bg-gray-50">
      <div className="pt-10">
        <SectionHeading text={"Reviews"} design={design} />
      </div>
      <div className="shadow-lg rounded-md py-5 mt-6 bg-white">
        <Swiper
          loop={isLoop}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials?.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Review review={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialFour;

const Review = ({ review }: any) => {
  return (
    <section className="text-gray-600 body-font pb-10 ">
      <div className="container px-5 mx-auto">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
          <div className="avatar ">
            <div className="mb-4 mx-auto rounded-full w-24 h-24 text-center">
              <img
                src={testimonialImg + review.image}
                className={"w-full h-full rounded-full"}
                alt=""
              />
            </div>
          </div>
          <p className="leading-relaxed text-lg">{review.feedback}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="inline-block w-8 h-8 text-orange-400 my-4"
            viewBox="0 0 975.036 975.036"
          >
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
            {review.name}
          </h2>
          <p className="text-gray-500">{review?.occupation}</p>
        </div>
      </div>
    </section>
  );
};
