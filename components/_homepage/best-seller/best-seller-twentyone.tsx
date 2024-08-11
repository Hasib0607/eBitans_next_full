"use client";
import Card45 from "@/components/card/card45";
import SectionHeadingTwentyOne from "@/components/section-heading/section-heading-twentyone";
import DefaultSlider from "@/components/slider/default-slider";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { SwiperSlide } from "swiper/react";

const BestSellerTwentyOne = ({
  best_sell_product,
  design,
  store_id,
  headerSetting,
}: any) => {
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const styleCss = `
    .feature-product-prev {
      color:  ${design.header_color};
      border: 1px solid ${design.header_color};
  }
    .feature-product-next{
        color:  ${design.header_color};
        border: 1px solid ${design.header_color};
  }
    .feature-product-prev:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
    .feature-product-next:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
  
  .arrow-hov:hover .arrow {
    opacity:1;
    background: white;
  }
 `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="flex justify-between items-center pb-2">
        <SectionHeadingTwentyOne title={"BEST SELLER"} subtitle={"PRODUCTS"} />
        <div className="">
          <div className="lg:cursor-pointer flex items-center gap-2">
            <div
              className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear z-[5] `}
            >
              <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear z-[5] `}
            >
              <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
      <div className="">
        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            976: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {best_sell_product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <div className="">
                <Card45
                  item={productData}
                  design={design}
                  store_id={store_id}
                  headerSetting={headerSetting}
                />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default BestSellerTwentyOne;
