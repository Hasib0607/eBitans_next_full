"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Details from "./details";
import { Tab } from "@headlessui/react";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingSixteen from "@/components/section-heading/section-heading-sixteen";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import { SwiperSlide } from "swiper/react";
import Card69 from "@/components/card/card69";

const Forty = ({ data }: any) => {
  const { store_id } = useTheme();

  const [relatedProduct, setRelatedProduct] = useState<any>([]);
  const [reviews, setReview] = useState([]);
  const [productDetails, setProductDetails] = useState<any>([]);

  useEffect(() => {
    data["store_id"] = store_id;

    httpReq.post("product-details", data).then((res) => {
      if (!res?.error) {
        setProductDetails(res?.product);
      }
    });

    httpReq.post("get/review", data).then((res) => {
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

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <p>Home</p>
        </Link>
        <IoIosArrowForward className="text-xs mt-1" />
        <Link href={"/category/" + productDetails.category_id}>
          <p className="w-max">{productDetails?.category}</p>
        </Link>
        <IoIosArrowForward className="text-xs mt-1" />
        <p className="text-gray-500 font-medium truncate">
          {productDetails?.name}
        </p>
      </div>
      <Details data={data}>
        <div className="flex flex-col space-y-3">
          <p className="text-base text-[#5a5a5a]">
            <span className="font-semibold text-[#212121]">Category:</span>{" "}
            <Link href={"/category/" + productDetails.category_id}>
              {productDetails?.category}
            </Link>
          </p>
        </div>
      </Details>

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14">
        <Tab.Group>
          <Tab.List className="fiveBorder text-xs sm:text-base">
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl  underline-offset-8 text-black border-hidden "
                  : "bg-white text-black fiveUn "
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl  underline-offset-8 text-black border-hidden ml-8"
                  : "bg-white text-black fiveUn ml-8"
              }
            >
              Reviews
            </Tab>
          </Tab.List>
          <Tab.Panels className="mb-8">
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
                <div className="flex flex-1 justify-center items-center">
                  <h3 className="text-xl font-sans font-bold pt-3">
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

export default Forty;

const UserReview = ({ review }: any) => {
  return (
    <div className=" bg-slate-50 p-5">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full">
          <img
            src={profileImg + review?.image}
            className="rounded-full h-full w-full"
            alt=""
          />
        </div>
      </div>
      <Rate className="text-base" rating={review?.rating} />
      <p className="text-xs font-semibold mt-2">{review?.name}</p>
      <p className="text-sm font-light mt-2">
        {moment(new Date(review?.cd)).format("DD/MM/YYYY")}
      </p>
      <p className="text-base font-semiBold mt-2">{review?.comment}</p>
    </div>
  );
};

const Related = ({ product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";
  return (
    <div className="py-5 sm:py-10">
      <div className="my-5 pt-1 flex justify-between items-center">
        <SectionHeadingSixteen title={"Related Products"} />
        <div className="hidden sm:block">
          <Arrow prevEl={prev} nextEl={next}></Arrow>
        </div>
      </div>
      <div className="">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            250: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            560: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card69 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
