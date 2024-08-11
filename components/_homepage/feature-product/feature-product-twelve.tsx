"use client";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionHeadingTwelve from "@/components/section-heading/section-heading-twelve";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import SliderFive from "@/components/slider/slider-five";
import { getPrice } from "@/utils/get-price";
import Link from "next/link";
import { productImg } from "@/site-settings/siteUrl";
import Taka from "@/utils/taka";
import QuikView from "@/components/quick-view";
import Details from "@/components/_product-details-page/product-details/three/details";

const FeatureProductTwelve = ({ feature_product, design }: any) => {
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const styleCss = `
    .feature-product-prev:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
    .feature-product-next:hover {
      color:  ${design.text_color};
      background: ${design.header_color};
  }
 
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white relative group">
      <style>{styleCss}</style>
      <SectionHeadingTwelve title={"Featured For You"} subtitle={""} />
      <div className="relative">
        <div className=" gap-2 hidden group-hover:block lg:cursor-pointer ">
          <div
            className={`${prevEl} bg-gray-400 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-16 z-10 `}
          >
            <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
          <div
            className={`${nextEl} bg-gray-400 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-16 z-10 `}
          >
            <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
          </div>
        </div>
      </div>

      <SliderFive prevEl={prevEl} nextEl={nextEl}>
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card item={productData} />
          </SwiperSlide>
        ))}
      </SliderFive>
    </div>
  );
};

export default FeatureProductTwelve;

const Card = ({ item }: any) => {
  let productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const [open, setOpen] = useState(false);
  return (
    <>
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        <div className="flex h-40 items-center xl:space-x-5 lg:space-x-3 space-x-2 relative">
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
          <div className="" onClick={() => setOpen(!open)}>
            <img
              src={productImg + item.image[0]}
              alt="Mountain"
              className="h-28 w-28"
            />
          </div>

          <div className=" flex flex-col justify-center font-twelve gap-2 ">
            <h6 className="text-sm hover:text-green-600 capitalize font-twelve text-gray-500">
              {" "}
              {item.name.slice(0, 18)}
              {item.name.length > 18 && "..."}
            </h6>
            <Taka /> {productGetPrice}
          </div>
        </div>
      </Link>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};
