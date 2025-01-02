"use client";
import Card22 from "@/components/card/card22";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import DefaultSlider from "@/components/slider/default-slider";
import { profileImg } from "@/site-settings/siteUrl";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";
import ProdMultiCategory from "@/utils/prod-multi-category";

const Nine = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-9"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
    staleTime: 1000 * 60 * 5,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-9"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
    staleTime: 1000 * 60 * 5,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-9"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
    staleTime: 1000 * 60 * 5,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const category = product?.category || [];

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <Details
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      >
        <div className="h-[1px] bg-gray-300 w-full my-3"></div>
        <div className="flex flex-col space-y-3 font-seven">
          <p className="text-sm text-[#5a5a5a] font-seven">
            <span className="font-semibold text-[#212121] font-seven">
              SKU:
            </span>{" "}
            {productDetailsData?.product?.SKU}
          </p>
          {Array.isArray(category) && category?.length > 0 && (
            <p className="text-sm text-[#5a5a5a] font-seven">
              <span className="font-semibold text-[#212121] font-seven">
                Category:
              </span>{" "}
              <ProdMultiCategory category={category} />
            </p>
          )}
          {productDetailsData?.product?.tags && (
            <p className="text-sm text-[#5a5a5a] font-seven">
              <span className="font-semibold text-[#212121] font-seven">
                Tags:
              </span>{" "}
              {productDetailsData?.product?.tags}
            </p>
          )}
        </div>
        <div className="h-[1px] bg-gray-300 w-full my-3"></div>
        <According
          text={"Product Details"}
          desc={productDetailsData?.product?.description}
        />
        <According text={"Customer Reviews"} desc={reviews} />
      </Details>

      {product && product?.video_link && (
        <VideoPlayer videoUrl={product?.video_link} />
      )}

      <Related product={relatedProducts} />
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
          {text === "Customer Reviews" ? (
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
