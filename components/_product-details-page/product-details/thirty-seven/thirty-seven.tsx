"use client";
import React, { useEffect, useState } from "react";
import Details from "./details";
import moment from "moment";
import { Tab } from "@headlessui/react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import Card64 from "@/components/card/card64";

const ThirtySeven = ({ data }: any) => {
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
    <div className="bg-[#F1F9DD]">
      <div className="sm:container px-5">
        <Details data={data}></Details>

        {/* ************************ tab component start ***************************** */}
        <div className="mt-14 bg-white">
          <Tab.Group>
            <Tab.List className="px-5 py-2 bg-[#DDDDDD]">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "underline text-xl focus:outline-none underline-offset-[12px] border-hidden "
                    : "text-xl"
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "underline text-xl focus:outline-none underline-offset-[12px] border-hidden ml-8"
                    : "ml-8 text-xl"
                }
              >
                Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="p-5">
              <Tab.Panel>
                <div className="">
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
    </div>
  );
};

export default ThirtySeven;

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
  return (
    <div className="py-5 sm:py-10">
      <div>
        <h1 className="text-2xl pb-3">RELATED PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
        {product?.slice(0, 10).map((item: any, id: any) => (
          <Card64 item={item} key={id} />
        ))}
      </div>
    </div>
  );
};
