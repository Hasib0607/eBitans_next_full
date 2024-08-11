"use client";
import React, { useEffect, useState } from "react";
import Details from "./details";
import { motion, AnimatePresence } from "framer-motion";
import { SwiperSlide } from "swiper/react";
import httpReq from "@/utils/http/axios/http.service";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingEighteen from "@/components/section-heading/section-heading-eighteen";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Card63 from "@/components/card/card63";

const ThirtySix = ({ data }: any) => {
  const [relatedProduct, setRelatedProduct] = useState<any>([]);
  const [reviews, setReview] = useState([]);

  useEffect(() => {
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
  }, [data]);

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <Details data={data}>
        <div className="h-[1px] bg-gray-300 w-full "></div>
        <According text={"Customer Reviews"} reviews={reviews} />
      </Details>
      <Related product={relatedProduct} />
    </div>
  );
};

export default ThirtySix;

const According = ({ text, reviews }: any) => {
  const [show, setShow] = useState(false);
  return (
    <AnimatePresence>
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold"
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
          {reviews.length === 0 ? (
            <div className="flex flex-1 justify-center items-center">
              <h3 className="text-xl font-sans font-bold">No Found Review</h3>
            </div>
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
      <div className="my-5 pt-1 flex justify-between items-center">
        <SectionHeadingEighteen title={"Related Products"} />
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
              <Card63 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
