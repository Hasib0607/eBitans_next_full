"use client";
import React, { useState } from "react";
import Details from "./details";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingThirtyFive from "@/components/section-heading/section-heading-thirty-five";
import Card61 from "@/components/card/card61";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";

const ThirtyFive = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-35"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData?.slug && !!updatedData?.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-35"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData?.slug && !!updatedData?.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-35"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData?.slug && !!updatedData?.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  return (
    <div className="container lg:py-24 md:py-20 py-16 px-5">
      <Details
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      >
        <div className="flex flex-col space-y-3">
          <p className="text-sm text-[#5a5a5a]">
            <span className="font-semibold text-[#212121]">SKU:</span>{" "}
            {product?.SKU}
          </p>
          <p className="text-sm text-[#5a5a5a]">
            <span className="font-semibold text-[#212121]">Category:</span>{" "}
            {product?.category}
          </p>
          {product?.tags && (
            <p className="text-sm text-[#5a5a5a]">
              <span className="font-semibold text-[#212121]">Tags:</span>{" "}
              {product?.tags}
            </p>
          )}
        </div>
        <Accordion
          text="Product Details"
          desc={productDetailsData?.product?.description}
        />
        <Accordion text="Customer Reviews" desc={reviews} />
      </Details>
      <Related products={relatedProducts} />
    </div>
  );
};

export default ThirtyFive;

const Accordion = ({ text, desc }: any) => {
  const [show, setShow] = useState(false);
  return (
    <AnimatePresence>
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center lg:cursor-pointer text-lg font-semibold"
      >
        <div className="h3">{text}</div>
        {show ? <MinusIcon width={25} /> : <PlusIcon width={25} />}
      </div>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {desc[0]?.id ? (
            <div>
              {desc?.error
                ? desc?.error
                : desc?.map((item: any) => (
                    <UserReview key={item?.id} review={item} />
                  ))}
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: desc }}
              className="apiHtml"
            ></div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UserReview = ({ review }: any) => {
  return (
    <div className="bg-slate-50 p-5">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full">
          <img
            src={`${profileImg}${review?.image}`}
            className="rounded-full h-full w-full"
            alt={review?.name}
          />
        </div>
      </div>
      <Rate className="text-base" rating={review?.rating} />
      <p className="text-xs font-semibold mt-2">{review?.name}</p>
      <p className="text-sm font-light mt-2">
        {moment(review?.cd).format("DD/MM/YYYY")}
      </p>
      <p className="text-base font-semibold mt-2">{review?.comment}</p>
    </div>
  );
};

const Related = ({ products }: any) => {
  return (
    <div className="py-5 sm:py-10 bg-white">
      <div className="my-5 pt-1 flex justify-center items-center">
        <SectionHeadingThirtyFive title="✦ YOU MIGHT LIKE THESE ✦" />
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-6">
        {products
          ?.slice(0, 10)
          .map((productData: any) => (
            <Card61 item={productData} key={productData.id} />
          ))}
      </div>
    </div>
  );
};
