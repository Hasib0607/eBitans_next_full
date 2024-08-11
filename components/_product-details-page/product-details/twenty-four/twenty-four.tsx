"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { SwiperSlide } from "swiper/react";

import moment from "moment";
import img from "@/assets/bg-image/twenty-four-shop.webp";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Details from "./details";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingTwentyThree from "@/components/section-heading/section-heading-twentythree";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DefaultSlider from "@/components/slider/default-slider";
import Card49 from "@/components/card/card49";

const TwentyFour = ({ data }: any) => {
  const { store_id, design } = useTheme();

  const [relatedProduct, setRelatedProduct] = useState<any>([]);
  const [reviews, setReview] = useState<any>([]);
  const [productDetails, setProductDetails] = useState<any>([]);

  useEffect(() => {
    data["store_id"] = store_id;

    httpReq.post("product-details", data).then((res: any) => {
      if (!res?.error) {
        setProductDetails(res?.product);
      }
    });

    httpReq.post("get/review", data).then((res: any) => {
      if (!res?.error) {
        setReview(res);
      } else {
        setReview([]);
      }
    });
    httpReq.post("related-product", { id: data?.product_id }).then((res) => {
      if (!res?.error) {
        setRelatedProduct(res);
      }
    });
  }, [data, store_id]);

  const styleCss = `
    .active-des-review {
      color:  ${design?.text_color};
      background: ${design?.header_color};
      
    }
    
    `;

  return (
    <div className=" bg-white">
      <div className="min-h-[200px] max-h-60 w-full overflow-hidden relative xl:pr-20 lg:pr-10">
        <img
          src={img.src}
          alt=""
          className="min-h-[200px] max-h-60 w-full object-cover"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full flex flex-col justify-center items-start sm:container px-5">
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-5xl text-white uppercase font-bold">
              Product Details
            </h1>
            <div className="flex items-center gap-1 text-white font-bold">
              <p>Home</p>
              <p>/ Product Details</p>
            </div>
          </div>
        </div>
      </div>
      <style>{styleCss}</style>
      <div className="sm:container px-5 pt-10">
        <Details data={data} />
      </div>
      {/* ************************ tab component start ***************************** */}
      <div className="mt-14 pb-20 sm:container px-5">
        <Tab.Group>
          <Tab.List className="pb-3 w-full">
            <Tab
              className={({ selected }) =>
                selected
                  ? "text-base focus:outline-none border rounded-full px-7 py-2 active-des-review"
                  : "bg-white border rounded-full px-7 py-2 text-black text-base "
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "border rounded-full px-7 py-2 text-base focus:outline-none active-des-review ml-8"
                  : "bg-white border rounded-full px-7 py-2 text-black ml-8 text-base "
              }
            >
              Reviews
            </Tab>
          </Tab.List>
          <Tab.Panels className="">
            <Tab.Panel>
              <div className="p-5 ">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.description,
                  }}
                  className="apiHtml"
                ></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {reviews.length === 0 ? (
                <div className="flex flex-1 justify-center items-center p-5">
                  <h3 className="text-xl font-sans font-bold">
                    No Found Review
                  </h3>
                </div>
              ) : (
                reviews?.map((item: any) => (
                  <UserReview key={item?.id} review={item} />
                ))
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* ************************ tab component end ***************************** */}
      <Related product={relatedProduct} />
    </div>
  );
};

export default TwentyFour;

const UserReview = ({ review }: any) => {
  return (
    <div className="p-5 flex items-center gap-5 w-full">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full">
          <img
            src={profileImg + review?.image}
            className="rounded-full h-full w-full"
            alt=""
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-semibold ">{review?.name}</p>
          <p className="text-base rounded-md font-light border px-2 py-1">
            {moment(new Date(review?.cd)).format("DD/MM/YYYY")}
          </p>
        </div>
        <Rate className="text-base" rating={review?.rating} />
        <p className="text-base font-semiBold mt-2">{review?.comment}</p>
      </div>
    </div>
  );
};

const Related = ({ product }: any) => {
  // console.log(product,"product");
  const { design } = useTheme();

  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const styleCss = `
     .feature-product-prev {
     color:  ${design?.header_color};
     border: 1px solid ${design?.header_color};
    }
    .feature-product-next{
     color:  ${design?.header_color};
     border: 1px solid ${design?.header_color};
    }
    .feature-product-prev:hover {
     color:  ${design?.text_color};
     background: ${design?.header_color};
    }
    .feature-product-next:hover {
     color:  ${design?.text_color};
     background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
     opacity:1;
     background: white;
    }
`;

  return (
    <div className="pb-10 w-full sm:container px-5">
      <style>{styleCss}</style>
      <div className="pb-2">
        <SectionHeadingTwentyThree title={"RELATED PRODUCTS"} />
      </div>

      <div className="arrow-hov relative">
        <div className="">
          <div className="arrow gap-2 lg:cursor-pointer opacity-0">
            <div
              className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
          </div>
        </div>

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
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
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <Card49 item={productData} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
