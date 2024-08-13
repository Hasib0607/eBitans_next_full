"use client";
import React, { useEffect, useState } from "react";
import Details from "./details";
import { motion, AnimatePresence } from "framer-motion";
import { SwiperSlide } from "swiper/react";
import httpReq from "@/utils/http/axios/http.service";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Card51 from "@/components/card/card51";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";

const TwentySeven = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-27"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-27"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-27"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  return (
    <div className="pt-10 md:container xl:px-20 px-5">
      <Details
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      />
      <Related product={relatedProducts} />
    </div>
  );
};

export default TwentySeven;

const According = ({ text, reviews }: any) => {
  const [show, setShow] = useState(false);
  return (
    <AnimatePresence>
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold bg-gray-100 px-3 py-1 rounded-md"
      >
        <div className="h3 font-seven">{text}</div>
        {show ? <MinusIcon width={25} /> : <PlusIcon width={25} />}
      </div>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="font-seven"
        >
          {reviews?.length === 0 ? (
            <div className="flex flex-1 justify-center items-center">
              <h3 className="text-xl font-sans font-bold">No Found Review</h3>
            </div>
          ) : reviews?.error ? (
            reviews?.error
          ) : (
            reviews?.map((item: any) => (
              <UserReview key={item?.id} review={item} />
            ))
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
    <div className="py-5 sm:py-10 rounded-md bg-white">
      <div className="my-10 pt-1 flex flex-col sm:flex-row justify-between sm:items-center">
        <p className="sm:text-2xl text-lg font-bold">
          {" "}
          Customers also purchased
        </p>
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
            560: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              {/* <ProductCardTwo item={item} /> */}
              <Card51 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
