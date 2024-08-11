import React from "react";

import { SwiperSlide } from "swiper/react";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";

const FeaturedEight = ({ category, design }: any) => {
  const prev1 = "shop_best_seller_Prev1";
  const next1 = "shop_best_seller_Next1";
  const customCss = `
    .hoverBorder:hover{
        border:1px solid ${design?.header_color}
    }
    `;
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{customCss}</style>
      <div className="h-[40px]">
        <SectionHeadingSeven title={"Shop by Categories "} subtitle={""} />
      </div>
      <div className=" pb-4 pt-4 h-[50px]">
        <Arrow prevEl={prev1} nextEl={next1}></Arrow>
      </div>
      <div>
        <DefaultSlider
          prevEl={prev1}
          nextEl={next1}
          breakpoints={{
            350: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 8,
              spaceBetween: 40,
            },
            1920: {
              slidesPerView: 10,
              spaceBetween: 40,
            },
          }}
        >
          {category?.map((item: any) => (
            <SwiperSlide key={item?.id} className="mt-3">
              <Link href={"/category/" + item?.id}>
                <div className="group bg-gray-200 hover:bg-white  rounded-lg  hoverBorder border min-h-[170px] text-center">
                  <div className="group:hover:drop-shadow-xl ">
                    <div className="rounded-lg">
                      <div className="p-2">
                        <div className="flex justify-center h-28">
                          <img
                            className="w-16 h-16 my-auto"
                            src={iconImg + item?.icon}
                            alt="Mountain"
                          />
                        </div>
                        <div className="flex justify-center mt-3">
                          <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[100px]">
                            {item?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeaturedEight;
