"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import SectionHeadingFive from "../section-heading/section-heading-five";
import Link from "next/link";
import { productImg } from "@/site-settings/siteUrl";
import Taka from "@/utils/taka";
import { getPrice } from "@/utils/get-price";
import { IoSearchCircleOutline } from "react-icons/io5";
import GridSliderThirteen from "../slider/grid-slider/grid-slider-thirteen";
import Card14 from "../card/card14";

const NewArrivalProductsEight = ({ product, design }: any) => {
  const prev = "new_arrival_prev";
  const next = "new_arrival_next";

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
    .new_arrival_prev:hover {
        color:${textColor};
        background:${bgColor};
      }
      .new_arrival_next:hover {
        color:${textColor};
        background:${bgColor};
      }
      .all-icon:hover {
        color:${textColor};
        background:${bgColor};
      }

    .arrow-hov:hover .arrow {
        display:block;
        background: white;
    }
 
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white">
      <div className="py-5">
        <style>{styleCss}</style>
        <div className="">
          <SectionHeadingFive title={"New Arrivals"} subtitle={""} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="col-span-1 mt-2 hidden lg:block">
            {product?.slice(0, 1).map((item: any) => (
              <div
                key={item.id}
                className="relative group overflow-hidden h-[1200px]"
              >
                {/* out of stock  */}
                {item?.quantity === "0" && (
                  <Link href={"/product/" + item?.id + "/" + item?.slug}>
                    <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
                      <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                        Sold Out
                      </p>
                    </div>
                  </Link>
                )}
                <span className="absolute bg-gray-800 text-white px-12 py-2 -rotate-45  overflow-clip -ml-12 -mt-1">
                  New
                </span>
                <Link href={"/product/" + item?.id + "/" + item?.slug}>
                  <div className="relative">
                    <img
                      src={productImg + item?.image[0]}
                      alt=""
                      className="h-[1100px] object-cover object-center w-full"
                    />
                    <div className="absolute bottom-2 right-2 bg-gray-100  px-5 text-xs text-black shadow flex j justify-between gap-4 py py-2">
                      <div className="line-through ">{item.regular_price}</div>
                      <div className="">
                        <Taka />
                        {getPrice(
                          item.regular_price,
                          item.discount_price,
                          item.discount_type
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="absolute right-2 top-8 translate-x-12  group-hover:-translate-x-6  transition-transform duration-500 ease-linear">
                  <div className="flex flex-col gap-4 ">
                    <div className="p-3 border-0 bg-white rounded-full all-icon translate-x-6  group-hover:-translate-x-2  transition-all group-hover:duration-300 ease-linear">
                      <ShoppingBagIcon className="" width={20} height={20} />
                    </div>
                    <div className="p-3 border-0 bg-white rounded-full all-icon translate-x-6  group-hover:-translate-x-2  transition-all  group-hover:duration-500 ease-linear">
                      <IoSearchCircleOutline width={20} height={20} />
                    </div>
                    <div className="p-3 border-0 bg-white rounded-full all-icon translate-x-6  group-hover:-translate-x-2  transition-all  group-hover:duration-1000 ease-linear">
                      <LinkIcon width={20} height={20} />
                    </div>
                  </div>
                </div>

                <p className="my-2 text-gray-500 text-sm font-medium">
                  {item.category}
                </p>
                <Link href={"/product/" + item?.id + "/" + item?.slug}>
                  <p className="font-semibold text-base text-gray-700">
                    {item.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div className="col-span-1 md:h-[800px] h-[600px] lg:h-[1200px] relative arrow-hov">
            <div className="lg:cursor-pointer hidden arrow ">
              <div
                className={`${prev} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4 top-1/2 -translate-y-1/2 z-[2] `}
              >
                <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
              </div>
              <div
                className={`${next} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-1/2 -translate-y-1/2 z-[2] `}
              >
                <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
              </div>
            </div>

            <GridSliderThirteen
              prevEl={prev}
              nextEl={next}
              breakpoints={{
                280: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
              className={"lg:h-[1200px] md:h-[800px] h-[600px]"}
            >
              {product?.slice(1, 9)?.map((item: any) => (
                <SwiperSlide className="swiperjs_grid_two" key={item?.id}>
                  <Card14 item={item} />
                </SwiperSlide>
              ))}
            </GridSliderThirteen>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalProductsEight;
