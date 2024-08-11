"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import React, { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import Details from "./details";
import { Tab } from "@headlessui/react";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import moment from "moment";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Card50 from "@/components/card/card50";

const TwentyFive = ({ data }: any) => {
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
    httpReq.post("related-product", { id: data?.product_id }).then((res) => {
      if (!res?.error) {
        setRelatedProduct(res);
      }
    });
  }, [data, store_id]);

  return (
    <div>
      <div className="sm:px-10 px-5 pt-10">
        <Details data={data} />
      </div>

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14 sm:px-10 px-5">
        <Tab.Group>
          <Tab.List className="fiveBorder">
            <Tab
              className={({ selected }: any) =>
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
                <div className="flex flex-1 my-2 items-center">
                  <h3 className="text-xl font-sans font-bold py-3 text-center w-full">
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

export default TwentyFive;

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
    <div className=" shadow-lg py-5 sm:my-10 rounded-md w-full">
      <div className="my-5 flex justify-between items-center sm:px-10 px-5">
        {/* <SectionHeadingTwentyFive title={"Related product"} /> */}
        <p className="text-2xl">Related Products</p>
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="sm:px-10 px-5">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide className="swiperjs-slide py-10" key={item?.id}>
              <Card50 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
