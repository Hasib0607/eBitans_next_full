"use client";
import { bannerImg } from "@/site-settings/siteUrl";

import img from "@/assets/img/thirtyfive/02.webp";
import Card61 from "@/components/card/card61";
import SliderThirtyFive from "@/components/slider/slider-thirty-five";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SwiperSlide } from "swiper/react";

const BestSellerThirtyFive = ({
  best_sell_product,
  design,
  banner,
  store_id,
}: any) => {
  const styleCss = `
   
    .new-product-prev {
        color:  ${design.header_color};
        border: 1px solid ${design.header_color};
    }
      .new-product-next{
          color:  ${design.header_color};
          border: 1px solid ${design.header_color};
    }
      .new-product-prev:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
      .new-product-next:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
 `;
  const prevEl = "best-product-prev";
  const nextEl = "best-product-next";

  return (
    <div className="border-b-2 border-black">
      <div className="sm:container px-5 ">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x-2 divide-black">
            <div className="flex pt-5 lg:pt-0 items-center h-full">
              <img
                src={banner[3]?.image ? bannerImg + banner[3]?.image : img.src}
                alt=""
                className="w-full h-auto"
              />
            </div>
            <div className="sm:py-10 py-5 lg:px-5 relative w-full">
              <div className="hidden lg:flex lg:cursor-pointer">
                <div
                  className={`${prevEl} text-gray-600 hover:shadow-none duration-500 shadow-[3px_3px_1px_1px_black] arrow-color absolute h-10 w-10 flex justify-center items-center border border-black bg-white left-7 top-[50%] -translate-y-1/2 z-[3] `}
                >
                  <IoIosArrowBack className="text-xl font-bold" />
                </div>
                <div
                  className={`${nextEl} text-gray-600 hover:shadow-none duration-500 shadow-[3px_3px_1px_1px_black] arrow-color absolute h-10 w-10 flex justify-center items-center border border-black bg-white right-3 top-[50%] -translate-y-1/2 z-[3] `}
                >
                  <IoIosArrowForward className="text-xl font-bold" />
                </div>
              </div>
              <SliderThirtyFive
                prevEl={prevEl}
                nextEl={nextEl}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                }}
              >
                {best_sell_product?.slice(0, 10).map((item: any) => (
                  <SwiperSlide key={item?.id}>
                    <div className="px-0 lg:px-5 pr-2 lg:pr-2">
                      <Card61 item={item} design={design} store_id={store_id} />
                    </div>
                  </SwiperSlide>
                ))}
              </SliderThirtyFive>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerThirtyFive;
