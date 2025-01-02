"use client";

import Card58 from "@/components/card/card58";
import DefaultSlider from "@/components/slider/default-slider";
import useTheme from "@/hooks/use-theme";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";
import { customizeSingleProductPage } from "@/utils/customizeDesign";
import ProdMultiCategory from "@/utils/prod-multi-category";

const TwentyEight = ({ data, updatedData }: any) => {
  const { store_id, design } = useTheme();

  const singleProductPageData = customizeSingleProductPage.find(
    (item) => item.id == store_id
  );

  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-28"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-28"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-28"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};
  const category = product?.category || [];

  const styleCss = `
    .active-des-review {
      color:  ${design?.header_color};
      text-decoration-color: ${design?.header_color};
      text-decoration-thickness: 3px;
    }
    
    `;

  return (
    <div className="sm:container px-5 pt-10 bg-white">
      <div className="flex items-center gap-x-1 text-gray-500 text-sm mb-3">
        <Link href="/">
          <p>Home</p>
        </Link>
        <RiArrowRightSLine />
        {Array.isArray(category) && category?.length > 0 && (
          <ProdMultiCategory
            category={category}
            count={1}
            className={"text-gray-500"}
          />
        )}
        <RiArrowRightSLine />
        <p>{productDetailsData?.product?.name}</p>
      </div>
      <style>{styleCss}</style>
      <Details
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      />

      <div className="mt-14 border rounded-md">
        <Tab.Group>
          <Tab.List className="pb-3 w-full ">
            <Tab
              className={({ selected }) =>
                selected
                  ? "text-lg focus:outline-none border-t-2 pt-3 px-5 border-r-2 border-t-black active-des-review uppercase"
                  : "bg-white text-black pt-3 px-5 text-lg uppercase"
              }
            >
              {singleProductPageData?.text_bangla ? "Details" : "পন্যের বিবরণ"}
            </Tab>
            {singleProductPageData?.review_not_show ? (
              ""
            ) : (
              <>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "text-lg focus:outline-none border-t-2 pt-3 px-5 border-l-2 border-t-black active-des-review uppercase"
                      : "bg-white text-black pt-3 px-5 text-lg uppercase"
                  }
                >
                  রিভিউ
                </Tab>
              </>
            )}
          </Tab.List>
          <Tab.Panels className="">
            <Tab.Panel>
              <div className="p-5 ">
                {productDetailsData?.product?.video_link && (
                  <div className="mb-5">
                    <iframe
                      className="xl:h-[700px] h-[350px] md:h-[450px] lg:h-[600px] w-full video-border"
                      src={productDetailsData?.product?.video_link}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="video"
                    />
                  </div>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetailsData?.product?.description,
                  }}
                  className="apiHtml"
                ></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {reviews?.length === 0 ? (
                <div className="flex flex-1 justify-center items-center p-5">
                  <h3 className="text-xl font-sans font-bold">
                    No Found Review
                  </h3>
                </div>
              ) : reviews?.error ? (
                reviews?.error
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

      {product && product?.video_link && (
        <VideoPlayer videoUrl={product?.video_link} />
      )}

      <Related product={relatedProducts} />
    </div>
  );
};

export default TwentyEight;

const UserReview = ({ review }: any) => {
  return (
    <div className="p-5 flex items-center gap-5 w-full">
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
  const { store_id, design } = useTheme();
  const singleProductPageData = customizeSingleProductPage.find(
    (item) => item.id == store_id
  );

  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const styleCss = `
    .feature-product-prev {
    color:  ${design?.header_color};
    border: 1px solid ${design?.header_color};
    }
    .feature-product-next{
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .feature-product-prev:hover {
    color:  ${design?.text_color};
    background: ${design?.header_color};
    }
    .feature-product-next:hover {
    color:  ${design?.text_color};
    background: ${design?.header_color};
    }


    .arrow-hov:hover .arrow {
    opacity:1;
    background: white;
    }
`;

  return (
    <div className="py-10 w-full">
      <style>{styleCss}</style>
      <div className="">
        <p className="text-lg md:text-xl text-black pb-[10px] w-max font-bold capitalize sec-twenty-nine">
          {singleProductPageData?.text_bangla
            ? "Related Product"
            : "রিলেটেড প্রোডাক্ট"}
        </p>
      </div>

      <div className="arrow-hov relative">
        <div className="">
          <div className="arrow gap-2 lg:cursor-pointer opacity-0">
            <div
              className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
            >
              <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
          </div>
        </div>

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            976: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
          }}
        >
          {product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <div className="px-2">
                <Card58 item={productData} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
