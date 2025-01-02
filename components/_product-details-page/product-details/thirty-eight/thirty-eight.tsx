"use client";
import Card65 from "@/components/card/card65";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import DefaultSlider from "@/components/slider/default-slider";
import { profileImg } from "@/site-settings/siteUrl";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";
import ProdMultiCategory from "@/utils/prod-multi-category";

const ThirtyEight = ({ data, updatedData, headerSetting }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-38"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-38"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-38"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const category = product?.category || [];

  return (
    <div className="">
      <div className="w-full bg-white text-[#252525]">
        <div className="flex flex-col justify-center sm:container px-5 py-2">
          <div className="flex items-center gap-1 text-sm font-bold mt-3">
            <Link href="/">
              <AiOutlineHome className="" />
            </Link>
            <p className="truncate">
              {" "}
              <Link
                href={"/category/" + productDetailsData?.product?.category_id}
              >
                <ProdMultiCategory category={category} />
              </Link> {" "}
              {productDetailsData?.product?.name}
            </p>
          </div>
          <div className="shadow-2xl rounded-full mt-4 py-2 px-5">
            <div className="flex items-center gap-4 xl:gap-2 lg:gap-2 md:gap-2 sm:gap-2  ">
              <span className="text-sm">Share:</span>
              <span className="flex py-2 space-x-2">
                <FacebookShareButton url={window.location.href}>
                  <FaFacebookF size={18} />
                </FacebookShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <FaWhatsapp size={18} />
                </WhatsappShareButton>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section>
          <Details
            fetchStatus={fetchStatus}
            data={data}
            product={product}
            vrcolor={vrcolor}
            variant={variant}
            headerSetting={headerSetting}
          />
        </section>

        {/* ************************ tab component start ***************************** */}
        <section id="description" className="bg-[#F2F4F8]">
          <div className="sm:container px-5 py-5">
            <div className="bg-white px-5 mb-5 rounded-md border">
              <div className="relative mt-5">
                <h2 className="text-lg text-gray-800 font-bold mb-3 capitalize">
                  Reviews
                </h2>
              </div>

              {reviews?.error
                ? reviews?.error
                : reviews?.map((item: any) => (
                    <UserReview key={item?.id} review={item} />
                  ))}
            </div>
            <div className="bg-white px-5 mb-5 rounded-md border">
              <div className="relative mt-5">
                <h2 className="text-lg text-gray-800 font-bold mb-3 capitalize">
                  Description
                </h2>
              </div>
              <div className="my-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetailsData?.product?.description,
                  }}
                  className="apiHtml"
                ></div>
              </div>
            </div>
          </div>
        </section>
        {/* ************************ tab component end ***************************** */}

        {product && product?.video_link && (
          <VideoPlayer videoUrl={product?.video_link} />
        )}

        <Related product={relatedProducts} />
      </div>
    </div>
  );
};

export default ThirtyEight;

const UserReview = ({ review }: any) => {
  return (
    <div className=" bg-slate-50 p-5 my-5">
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
    <div className="bg-[#F2F4F8] rounded-md py-5 sm:py-10">
      <div className="py-5 pt-1 flex justify-between items-center sm:container px-5">
        <SectionHeadingFive title={"Related product"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="sm:container px-5">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            350: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card65 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
