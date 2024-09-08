"use client";
import Card50 from "@/components/card/card50";
import DefaultSlider from "@/components/slider/default-slider";
import useTheme from "@/hooks/use-theme";
import { profileImg } from "@/site-settings/siteUrl";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";

const TwentyFive = ({ data, updatedData }: any) => {
  const { store_id } = useTheme();
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-25"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-16"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-16"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  return (
    <div>
      <div className="sm:px-10 mt-16 lg:mt-10 px-5 pt-10">
        <Details
          fetchStatus={fetchStatus}
          product={product}
          variant={variant}
          vrcolor={vrcolor}
          data={data}
        />
      </div>

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14 sm:px-10 px-5">
        <Tab.Group>
          <Tab.List className="fiveBorder">
            <Tab
              className={({ selected }: any) =>
                selected
                  ? "underline text-xl  underline-offset-8 text-black border-hidden "
                  : "bg-white text-black fiveUn "
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl  underline-offset-8 text-black border-hidden ml-8"
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
                    __html: productDetailsData?.product?.description,
                  }}
                  className="apiHtml"
                ></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {reviews?.length === 0 ? (
                <div className="flex flex-1 my-2 items-center">
                  <h3 className="text-xl font-sans font-bold py-3 text-center w-full">
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

export default TwentyFive;

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
    <div className=" shadow-lg py-5 sm:my-10 rounded-md w-full">
      <div className="my-5 flex justify-between items-center sm:px-10 px-5">
        {/* <SectionHeadingTwentyFive title={"Related product"} /> */}
        <p className="text-2xl">Related Products</p>
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="sm:px-10 px-5">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            600: {
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
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide className="swiperjs-slide py-10" key={item?.id}>
              <Card50 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
