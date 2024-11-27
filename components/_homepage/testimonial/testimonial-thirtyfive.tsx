"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ImQuotesLeft } from "react-icons/im";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SectionHeadingThirtyFive from "@/components/section-heading/section-heading-thirty-five";
import Rate from "@/utils/rate";

const TestimonialThirtyFive = ({ testimonials }: any) => {
  let menu = [""];
  let isLoop = testimonials.length > 1;
  const pagination = {
    el: ".swiper-pagination-testimonial-thirtyfive",
    clickable: true,
    bulletElement: `swiper-pagination-bullet`,

    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + menu + "</span>";
    },
  };

  const styleCss = `

    .swiper-pagination-testimonial-thirtyfive {
        position: absolute;
        bottom: 0px !important;
        left: 50% !important;
        height: 5px;
        transform: translateX(-50%);
        width: 90% !important;
        background-color: #888888;
        margin-bottom: 20px;
        margin-left: 0px;
        display: flex;
    
    }
    
    .swiper-pagination-testimonial-thirtyfive .swiper-pagination-bullet {
    
        background: #888888;
        width: 100%;
        height: 5px;
        border-radius: 0px;
        overflow-x: hidden;
    
    }
    
    .swiper-pagination-testimonial-thirtyfive .swiper-pagination-bullet-active {
        background: #050505;
        width: 100%;
        height: 5px;
        border-radius: 0px;
        transition-duration: 1000ms;
        overflow-x: hidden;
    
    }
    
    .swiper-pagination-testimonial-thirtyfive.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0;
    }
    
   
    @media only screen and (min-width: 1400px) {
        .slide-active-thirtyfive .swiper-slide-active {
            scale: 1.2;
            transition: 1.3s;
        
        }
      }
      `;

  return (
    <div className=" bg-white sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="">
        <SectionHeadingThirtyFive title={"✦ CUSTOMER TESTIMONIALS ✦"} />
      </div>
      <div>
        <div>
          <div className="swiper-pagination-testimonial-thirtyfive"></div>
        </div>
        <Swiper
          // spaceBetween={60}
          loop={isLoop}
          pagination={pagination}
          autoplay={{
            delay: 2000,
          }}
          speed={1000}
          centeredSlides={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
            1700: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper slide-active-thirtyfive"
        >
          {testimonials?.map((item: any) => (
            <SwiperSlide
              className="border-black border shadow-[2px_2px_1px_1px_black] mb-10 mt-10 mr-5"
              key={item.id}
            >
              <div className="">
                <Review review={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialThirtyFive;

const Review = ({ review }: any) => {
  return (
    <section className="pb-10 py-5 ">
      <div className={`p-5`}>
        <div className="flex flex-col justify-center items-center">
          <ImQuotesLeft className="text-6xl text-black inline-block my-3" />
          <Rate rating={5} />
          <p className="text-sm my-6">{review.feedback}</p>
          <h2 className="text-black font-medium title-font tracking-wider text-lg capitalize">
            {review.name}
          </h2>
        </div>
      </div>
    </section>
  );
};
