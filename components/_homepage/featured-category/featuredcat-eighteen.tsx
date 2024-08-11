import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SectionHeadingEighteen from "@/components/section-heading/section-heading-eighteen";
import DefaultSlider from "@/components/slider/default-slider";
import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const FeaturedEighteen = ({ category, design }: any) => {
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

    .card-text-color:hover {
        color:  ${design?.header_color};
  }

    .category-hover:hover img {
        transform: scale(1.1);
  }
    
    .category-hover:hover p {
        border-bottom: 2px solid ${design.header_color};
  }
 
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 relative group ">
      <style>{styleCss}</style>
      <SectionHeadingEighteen title={"Shop by Category"} subtitle={""} />
      <div className="relative z-[6]">
        <div className="gap-2 lg:cursor-pointer group-hover:opacity-100  opacity-0  duration-500">
          <div
            className={`${prevEl} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-52 `}
          >
            <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
          <div
            className={`${nextEl} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-52  `}
          >
            <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
        </div>
      </div>

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
        loop={true}
        breakpoints={{
          375: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {category.map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card item={productData} />
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default FeaturedEighteen;

const Card = ({ item }: any) => {
  return (
    <>
      <div className="category-hover">
        <div className=" h-full overflow-hidden ">
          <img
            src={catImg + item.banner}
            alt="Mountain"
            className="h-auto w-full duration-500 "
          />
        </div>

        <div className="flex justify-center py-4 ">
          <Link href={"/category/" + item.id}>
            <p className="card-text-color uppercase text-sm font-semibold text-gray-800 mb-4 border-b-2 border-transparent">
              {" "}
              {item.name}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
