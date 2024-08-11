import React from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SectionHeadingThirtyFive from "@/components/section-heading/section-heading-thirty-five";
import SliderThirtyFive from "@/components/slider/slider-thirty-five";
import { SwiperSlide } from "swiper/react";
import Card62 from "@/components/card/card62";

const FeaturedThirtyFive = ({ category, design }: any) => {
  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
  .feature_cat_prev:hover {
    color:${textColor};
    background:${bgColor};
  }
  .feature_cat_next:hover {
    color:${textColor};
    background:${bgColor};
  }
  .bg-hover:hover {
    color:${bgColor};
  }
  .category-hover {
    color:  ${textColor};
  }
    `;

  const prevEl = "feature-category-prev";
  const nextEl = "feature-category-next";

  return (
    <div className="bg-[#F2F2F2] border-t-2 border-b-2 border-black">
      <style>{styleCss}</style>
      <div className="sm:container px-5 sm:py-10 py-5 relative">
        <SectionHeadingThirtyFive title={"✦ COLLECTIONS ✦"} />

        <div className="hidden lg:flex lg:cursor-pointer">
          <div
            className={`${prevEl} text-gray-600 hover:shadow-none duration-500 shadow-[3px_3px_1px_1px_black] arrow-color absolute h-10 w-10 flex justify-center items-center border border-black bg-white left-0 top-[50%] -translate-y-1/2 z-[3] `}
          >
            <IoIosArrowBack className="text-xl font-bold" />
          </div>
          <div
            className={`${nextEl} text-gray-600 hover:shadow-none duration-500 shadow-[3px_3px_1px_1px_black] arrow-color absolute h-10 w-10 flex justify-center items-center border border-black bg-white right-0 top-[50%] -translate-y-1/2 z-[3] `}
          >
            <IoIosArrowForward className="text-xl font-bold" />
          </div>
        </div>

        <SliderThirtyFive
          prevEl={prevEl}
          nextEl={nextEl}
          breakpoints={{
            375: {
              slidesPerView: "auto",
              spaceBetween: 30,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            980: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
        >
          {category?.map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <div className="px-2">
                <Card62 item={productData} />
              </div>
            </SwiperSlide>
          ))}
        </SliderThirtyFive>
      </div>
    </div>
  );
};

export default FeaturedThirtyFive;
