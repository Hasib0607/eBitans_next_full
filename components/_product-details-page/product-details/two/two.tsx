"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { SwiperSlide } from "swiper/react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Details from "./details";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import Arrow from "@/utils/arrow";
import SliderFive from "@/components/slider/slider-five";
import Card16 from "@/components/card/card16";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const Two = ({ data }: any) => {
  const { store_id } = useTheme();

  const [relatedProduct, setRelatedProduct] = useState([]);
  const [reviews, setReview] = useState([]);
  const [productDetails, setProductDetails] = useState<any>([]);

  // data["store_id"] = store_id;

  // const { data: productDetails, isError: isProductDetailsError } = useQuery({
  //   queryKey: ["productDetails", data],
  //   queryFn: () => httpReq.post("product-details", data),
  //   enabled: !!data,
  // });

  // const { data: reviews, isError: isReviewError } = useQuery({
  //   queryKey: ["review", data],
  //   queryFn: () => httpReq.post("get/review", data),
  //   enabled: !!data,
  // });

  // const { data: relatedProduct, isError: isRelatedProductError } = useQuery({
  //   queryKey: ["relatedProduct", data],
  //   queryFn: () => httpReq.post("related-product", { id: data?.product_id }),
  //   enabled: !!data,
  // });

  // if (isProductDetailsError || isReviewError || isRelatedProductError) {
  //   return <div>Error fetching data</div>;
  // }

  // console.log(
  //   productDetails,
  //   "product details",
  //   reviews,
  //   "reviews",
  //   relatedProduct,
  //   "related product"
  // );

  useEffect(() => {
    data["store_id"] = store_id;

    console.log(data, "data from product details");

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
      <Details data={data} />

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14">
        <Tab.Group>
          <Tab.List className="fiveBorder">
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl underline-offset-8 text-black border-hidden focus:outline-none"
                  : "bg-white text-black fiveUn "
              }
            >
              Descriptionx
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl underline-offset-8 text-black border-hidden ml-8 focus:outline-none"
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
                  <h3 className="text-xl font-sans font-bold py-3">
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

export default Two;

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
        Since {new Date(review?.ucd).getFullYear()}
      </p>
      <p className="text-base font-semiBold mt-2">{review?.comment}</p>
    </div>
  );
};

const Related = ({ product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";
  return (
    <div className="shadow-lg py-5 sm:my-10 rounded-md px-5">
      <div className="my-5 pt-1 flex justify-between items-center">
        <SectionHeadingFive title={"Related product"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="">
        <SliderFive prevEl={prev} nextEl={next}>
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card16 item={item} />
            </SwiperSlide>
          ))}
        </SliderFive>
      </div>
    </div>
  );
};
