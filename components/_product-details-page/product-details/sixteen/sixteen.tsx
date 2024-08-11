"use client";
import Card25 from "@/components/card/card25";
import DefaultSlider from "@/components/slider/default-slider";
import { profileImg } from "@/site-settings/siteUrl";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import Details from "./details";
import "./five.css";

const Sixteen = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-16"],
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
    <div className="sm:container px-5 sm:py-10 py-5">
      <Details
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      />

      {/* ************************ tab component start ***************************** */}
      <div className="my-10 bg-gray-100 sm:py-10 py-5">
        <Tab.Group>
          <Tab.List className="sm:container px-5">
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl focus:outline-none underline-offset-8 border-hidden active-des-review "
                  : "text-black text-xl"
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl focus:outline-none underline-offset-8 active-des-review border-hidden ml-8"
                  : "text-black ml-8 text-xl"
              }
            >
              Reviews
            </Tab>
          </Tab.List>
          <Tab.Panels className="sm:container px-5 pt-5">
            <Tab.Panel>
              <div className="bg-slate-50 rounded-lg p-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetailsData?.product?.description,
                  }}
                  className="apiHtml"
                ></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {reviews?.error
                ? reviews?.error
                : reviews?.map((item: any) => (
                    <UserReview key={item?.id} review={item} />
                  ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* ************************ tab component end ***************************** */}

      <Related product={relatedProducts} />
    </div>
  );
};

export default Sixteen;

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
    <div className=" py-5 ">
      <div className="my-5 flex justify-between items-center container">
        <p className="text-2xl">Related Items</p>
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="container">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            350: {
              slidesPerView: 2,
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
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide className="" key={item?.id}>
              <Card25 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
