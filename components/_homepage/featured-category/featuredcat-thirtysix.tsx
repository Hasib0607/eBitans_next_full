import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import DefaultSlider from "@/components/slider/default-slider";
import { catImg } from "@/site-settings/siteUrl";

const FeaturedThirtySix = ({ category, design }: any) => {
  const prevEl = "feature-category-prev";
  const nextEl = "feature-category-next";

  const styleCss = `
    .feature-category-prev:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
    .feature-category-next:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
 
    `;

  return (
    <div
      data-aos="fade-up"
      className="sm:container px-5 sm:py-10 py-5 relative"
    >
      <style>{styleCss}</style>
      <div className="text-center py-10 flex items-center justify-between">
        <div></div>
        <p className="text-xl xl:text-2xl">Popular Categories</p>
        <Link href="/shop">
          <div className="lg:flex justify-center items-center gap-2 font-bold hidden">
            <p className="border-b border-black">View all</p>
            <AiOutlineArrowRight />
          </div>
        </Link>
      </div>

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
        loop={true}
        breakpoints={{
          375: {
            slidesPerView: 1.75,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          980: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          1440: {
            slidesPerView: 9,
            spaceBetween: 5,
          },
        }}
      >
        {category.map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <div className="py-3 px-2">
              <Card item={productData} />
            </div>
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default FeaturedThirtySix;

const Card = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Link href={"/category/" + item.id}>
        <div className="text-center relative min-w-full category-hover border shadow-[0px_3px_8px_0px_rgba(0,0,0,0.24)] rounded-lg">
          <div
            className="flex justify-center items-center h-full"
            onClick={() => setOpen(!open)}
          >
            <img
              src={catImg + item?.banner}
              alt="catImage"
              className="h-auto w-full p-5"
            />
          </div>

          <div className="text-center font-twelve w-full px-2 pb-2">
            <p className="text-lg text-gray-800 truncate"> {item.name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
