"use client";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import "./five.css";
import Details from "./details";
import moment from "moment";
import { AiOutlineHome } from "react-icons/ai";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Card60 from "@/components/card/card60";

const ThirtyFour = ({ data }: any) => {
  const { store_id } = useTheme();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [reviews, setReview] = useState([]);
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
    httpReq
      .post("related-product", { id: data?.product_id })
      .then((res: any) => {
        if (!res?.error) {
          setRelatedProduct(res);
        }
      });
  }, [data, store_id]);

  console.log(productDetails, "productDetails from ;;");

  return (
    <div className="bg-[#F9F8FF]">
      <div className="w-full bg-white text-[#252525]">
        <div className="flex flex-col justify-center sm:container px-5 py-2">
          <div className="flex items-center gap-1 text-sm font-bold">
            <Link href="/">
              <AiOutlineHome className="" />
            </Link>
            <p>
              <Link href={"/category/" + productDetails?.category_id}>
                {productDetails?.category}
              </Link>
              {productDetails?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="sm:container px-5 py-5">
        <Details data={data} />

        {/* ************************ tab component start ***************************** */}
        <div className="mt-14">
          <div className="bg-white px-5 mb-5 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)]">
            <div className="relative pt-5">
              <h2 className="text-lg text-gray-800 font-bold mb-3 capitalize">
                Description:
              </h2>
              <p className="absolute h-[4px] w-28 -bottom-2 left-0 bg-orange-600"></p>
            </div>
            <div className="py-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetails?.description,
                }}
                className="apiHtml"
              ></div>
            </div>
          </div>
          <div className="bg-white px-5 pb-5 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)]">
            <div className="relative pt-5">
              <h2 className="text-lg text-gray-800 font-bold mb-3 capitalize">
                Reviews
              </h2>
              <p className="absolute h-[4px] w-28 -bottom-2 left-0 bg-orange-600"></p>
            </div>
            {reviews.length === 0 ? (
              <div className="flex flex-1 justify-center items-center">
                <h3 className="text-xl font-sans font-bold py-3">
                  No Found Review
                </h3>
              </div>
            ) : (
              reviews?.map((item: any) => (
                <UserReview key={item?.id} review={item} />
              ))
            )}
          </div>
        </div>
        {/* ************************ tab component end ***************************** */}
        <Related product={relatedProduct} />
      </div>
    </div>
  );
};

export default ThirtyFour;

const UserReview = ({ review }: any) => {
  return (
    <div className=" bg-slate-50 p-5 my-5">
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
    <div className="bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)] py-5 sm:my-10">
      <div className="my-5 pt-1 flex justify-between items-center sm:container px-5">
        <SectionHeadingFive title={"Related product"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="sm:container px-5">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            350: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card60 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
