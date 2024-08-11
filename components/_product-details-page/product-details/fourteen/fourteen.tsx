"use client";
import Card29 from "@/components/card/card29";
import SectionHeadingSixteen from "@/components/section-heading/section-heading-sixteen";
import DefaultSlider from "@/components/slider/default-slider";
import { profileImg } from "@/site-settings/siteUrl";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { IoIosArrowForward } from "react-icons/io";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import Details from "./details";

const Fourteen = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-14"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-14"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-14"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="flex flex-wrap gap-2 items-center">
        <p>Home</p>
        <IoIosArrowForward className="text-xs mt-1" />
        <p>{productDetailsData?.product?.category}</p>
        <IoIosArrowForward className="text-xs mt-1" />
        <p className="text-gray-500 font-medium ">
          {productDetailsData?.product?.name}
        </p>
      </div>
      <Details
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      >
        <div className="flex flex-col space-y-3">
          <p className="text-sm text-[#5a5a5a]">
            <span className="font-semibold text-[#212121]">Category:</span>{" "}
            {productDetailsData?.product?.category}
          </p>
        </div>
      </Details>

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14">
        <Tab.Group>
          <Tab.List className="fiveBorder text-xs sm:text-base">
            <Tab
              className={({ selected }) =>
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

export default Fourteen;

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
    <div className="shadow-lg py-5 sm:py-10 rounded-md bg-white">
      <div className="my-5 pt-1 flex justify-between items-center px-4">
        <SectionHeadingSixteen title={"Related Products"} />
        <div className="hidden sm:block">
          <Arrow prevEl={prev} nextEl={next}></Arrow>
        </div>
      </div>
      <div className="px-4">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            250: {
              slidesPerView: 2,
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
              {/* <ProductCardTwo item={item} /> */}
              <Card29 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
