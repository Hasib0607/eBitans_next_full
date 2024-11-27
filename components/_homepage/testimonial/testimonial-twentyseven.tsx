"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { testimonialImg } from "@/site-settings/siteUrl";

const TestimonialTwentySeven = ({ testimonials, design }: any) => {
  let isLoop = testimonials.length > 1;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 ">
      <div className="pt-10 text-center font-bold text-3xl">
        <p>
          {design?.template_id === "29"
            ? "টেস্টিমোনিয়াল"
            : "Good news from far away"}
        </p>
      </div>
      <div className=" mx-auto rounded-md py-5 mt-6 xl:px-[400px] lg:px-[200px] flex items-center gap-x-5">
        <FaQuoteLeft className="text-[100px] text-[#CFEAE7]" />
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
        <FaQuoteRight className="text-[100px] text-[#CFEAE7]" />
      </div>
    </div>
  );
};

export default TestimonialTwentySeven;

const Review = ({ review, design }: any) => {
  return (
    <section
      className={`${
        design?.template_id === "34" ? "text-gray-300" : "text-gray-600"
      } body-font pb-10 `}
    >
      <div className="">
        <div className="w-full mx-auto text-center">
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
          <h2
            className={`${
              design?.template_id === "34" ? "text-gray-500" : "text-gray-900"
            } title-font tracking-wider text-lg font-bold mt-5`}
          >
            {review.name}
          </h2>
          <p className="text-gray-500">{review?.occupation}</p>
        </div>
      </div>
    </section>
  );
};
