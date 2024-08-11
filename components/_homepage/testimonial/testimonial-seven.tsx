"use client";
import React, { useState } from "react";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ImQuotesLeft } from "react-icons/im";
import { testimonialImg } from "@/site-settings/siteUrl";

const TestimonialSeven = ({ testimonials }: any) => {
  return (
    <div className=" bg-white sm:container px-5 sm:py-10 py-5">
      <div className="">
        <SectionHeadingSeven title={"Testimonial"} subtitle="" />
      </div>
      <div>
        <div>
          <div className="swiper-pagination-testimonial"></div>
        </div>
        <Swiper
          loop={true}
          spaceBetween={30}
          //   slideActiveclassName="slide-active"
          //   pagination={pagination}
          autoplay={{
            delay: 2000,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1700: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper slide-active"
        >
          {testimonials?.map((item: any) => (
            <SwiperSlide
              className="bg-gray-100 rounded-lg drop-shadow-md mb-10 mt-10"
              key={item.id}
            >
              <Review review={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const Review = ({ review }: any) => {
  const [readMore, setReadMore] = useState(false);
  const linkName = readMore ? "Read Less " : "Read More";
  return (
    <section className="text-gray-600 pb-10 py-5 ">
      <div className={`p-5 ${readMore ? "h-auto" : "h-96"}`}>
        <div className="">
          <div className="font-seven ">
            <div className="mb-4 rounded-full w-24 h-24 overflow-hidden border-8 border-white">
              <img
                src={testimonialImg + review.image}
                className={"w-full h-full rounded-full "}
                alt=""
              />
            </div>
            <h2 className="text-black font-bold title-font tracking-wider text-2xl capitalize">
              {review.name}
            </h2>
          </div>
          <ImQuotesLeft className="text-3xl text-gray-200 inline-block my-3" />

          <p className="leading-relaxed text-base normal-case font-seven text-clip overflow-hidden ">
            <span className="inline">
              {!readMore && <span>{review.feedback.substr(0, 60)}</span>}
            </span>
            {readMore && <span className="inline">{review.feedback}</span>}{" "}
            <span
              onClick={() => setReadMore(!readMore)}
              className="text-gray-700 lg:cursor-pointer text-sm menu-hover font-bold"
            >
              {review.feedback.length > 60 && linkName}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSeven;
