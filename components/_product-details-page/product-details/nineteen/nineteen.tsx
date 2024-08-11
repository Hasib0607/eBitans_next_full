"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { SwiperSlide } from "swiper/react";
import Details from "./details";
import { Tab } from "@headlessui/react";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Card39 from "@/components/card/card39";

const Nineteen = ({ data }: any) => {
  const { store_id } = useTheme();

  const [relatedProduct, setRelatedProduct] = useState<any>([]);
  const [reviews, setReview] = useState<any>([]);
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
    <div className="bg-[#FAF8F1]">
      <div className="sm:container px-5 space-y-8 pt-5 ">
        <div className="flex gap-2 items-center">
          <p>Home</p>
          <IoIosArrowForward className="text-xs mt-1" />
          <p>{productDetails?.category}</p>
          <IoIosArrowForward className="text-xs mt-1" />
          <p className="text-gray-500 font-medium">{productDetails?.name}</p>
        </div>
        <Details data={data} />

        {/* ************************ tab component start ***************************** */}
        <div className="pt-20">
          <Tab.Group>
            <Tab.List className="border-b-2 border-gray-300">
              <Tab
                className={({ selected }: any) =>
                  selected
                    ? "underline text-xl  underline-offset-8 text-black border-hidden "
                    : " text-black fiveUn "
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }: any) =>
                  selected
                    ? "underline text-xl  underline-offset-8 text-black border-hidden ml-8"
                    : " text-black fiveUn ml-8"
                }
              >
                Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="mb-8">
              <Tab.Panel>
                <div className="py-5">
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
                    <h3 className="text-xl font-sans font-bold py-5">
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
    </div>
  );
};

export default Nineteen;

const UserReview = ({ review }: any) => {
  const date = `${new Date(review?.cd).getFullYear()}-${(
    new Date(review?.cd).getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${new Date(review?.cd)
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="p-5">
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
      <p className="text-sm font-light mt-2">{date}</p>
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
        <h1 className="text-[#3B3312] text-3xl">Related Products</h1>
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
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
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              {/* <ProductCardTwo item={item} /> */}
              <Card39 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
