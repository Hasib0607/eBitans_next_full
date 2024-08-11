"use client";
import React, { useEffect, useState } from "react";
import Details from "./details";
import { motion, AnimatePresence } from "framer-motion";
import { SwiperSlide } from "swiper/react";
import moment from "moment";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import Arrow from "@/utils/arrow";
import DefaultSlider from "@/components/slider/default-slider";
import Card22 from "@/components/card/card22";

const Nine = ({ data }: any) => {
  const { store_id } = useTheme();

  const [relatedProduct, setRelatedProduct] = useState([]);
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
      <Details data={data}>
        <div className="h-[1px] bg-gray-300 w-full my-3"></div>
        <div className="flex flex-col space-y-3 font-seven">
          <p className="text-sm text-[#5a5a5a] font-seven">
            <span className="font-semibold text-[#212121] font-seven">
              SKU:
            </span>{" "}
            {productDetails?.SKU}
          </p>
          <p className="text-sm text-[#5a5a5a] font-seven">
            <span className="font-semibold text-[#212121] font-seven">
              Category:
            </span>{" "}
            {productDetails?.category}
          </p>
          {productDetails?.tags && (
            <p className="text-sm text-[#5a5a5a] font-seven">
              <span className="font-semibold text-[#212121] font-seven">
                Tags:
              </span>{" "}
              {productDetails?.tags}
            </p>
          )}
        </div>
        <div className="h-[1px] bg-gray-300 w-full my-3"></div>
        <According
          text={"Product Details"}
          desc={productDetails?.description}
        />
        <According text={"Customer Reviews"} desc={reviews} />
      </Details>
      <Related product={relatedProduct} />
    </div>
  );
};

export default Nine;

const According = ({ text, desc }: any) => {
  const [show, setShow] = useState(false);

  return (
    <AnimatePresence>
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold mb-3"
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
          {desc[0]?.id ? (
            <div>
              {desc.length === 0 ? (
                <div className="flex flex-1 justify-center items-center">
                  <h3 className="text-xl font-sans font-bold">
                    No Found Review
                  </h3>
                </div>
              ) : (
                desc?.map((item: any) => (
                  <UserReview key={item?.id} review={item} />
                ))
              )}
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
    <div className="px-5 shadow-lg py-5 sm:py-10 rounded-md bg-white">
      <div className="my-5 pt-1 flex justify-between items-center">
        <SectionHeadingSeven title={"Related Products"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="">
        <DefaultSlider
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
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
          prevEl={prev}
          nextEl={next}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              {/* <ProductCardTwo item={item} /> */}
              <Card22 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
