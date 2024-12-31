"use client";
import Card23 from "@/components/card/card23";
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
import useTheme from "@/hooks/use-theme";

const Three = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-3"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-3"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-3"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const {design } = useTheme();

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <Details
        fetchStatus={fetchStatus}
        productx={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      >
        <div className="flex flex-col space-y-3 my-3">
          <p className="text-sm text-[#5a5a5a] font-seven">
            <span className="font-semibold text-[#212121] font-seven">
              SKU:
            </span>{" "}
            {productDetailsData?.product?.SKU}
          </p>
          <ProdMultiCategory product={product} design={design}/>
          {productDetailsData?.product?.tags && (
            <p className="text-sm text-[#5a5a5a] font-seven">
              <span className="font-semibold text-[#212121] font-seven">
                Tags:
              </span>{" "}
              {productDetailsData?.product?.tags}
            </p>
          )}
        </div>
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

export default Three;

const According = ({ text, desc }: any) => {
  const [show, setShow] = useState(false);
  return (
    <AnimatePresence>
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold my-2"
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
          {desc[0]?.id || desc.length === 0 ? (
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
    <div className=" bg-slate-50 rounded-lg p-5 flex items-center gap-5 w-full">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full">
          <img
            src={profileImg + review?.image}
            className="rounded-full h-full w-full"
            alt=""
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-semibold ">{review?.name}</p>
          <p className="text-base rounded-md font-light border px-2 py-1">
            {moment(new Date(review?.cd)).format("DD/MM/YYYY")}
          </p>
        </div>
        <Rate className="text-base" rating={review?.rating} />

        <p className="text-base font-semiBold mt-2">{review?.comment}</p>
      </div>
    </div>
  );
};

const Related = ({ product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";
  return (
    <div className="shadow-lg py-5 sm:py-10 rounded-md px-4">
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
              <Card23 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
