"use client";
import Card54 from "@/components/card/card54";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import DefaultSlider from "@/components/slider/default-slider";
import { profileImg } from "@/site-settings/siteUrl";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import DetailsFour from "./details";

const Four = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-4"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-4"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-4"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      <DetailsFour
        fetchStatus={fetchStatus}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
        data={data}
      />

      {/* ************************ tab component start ***************************** */}
      <div className="">
        <Tab.Group>
          <Tab.List className="fiveBorder space-x-4 sm:py-10 py-5 mt-10">
            <Tab
              className={({ selected }) =>
                selected
                  ? " text-xl font-semibold  text-black border-0  border-b-2 border-black"
                  : "bg-white text-black text-lg fiveUn "
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? " text-xl font-semibold  text-black border-0  border-b-2 border-black"
                  : "bg-white text-black text-lg fiveUn"
              }
            >
              Reviews
            </Tab>
          </Tab.List>
          <Tab.Panels className="mb-8">
            <Tab.Panel>
              <div className="p-5">
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

      {product && product?.video_link && (
        <VideoPlayer videoUrl={product?.video_link} />
      )}

      <Related product={relatedProducts} />
    </div>
  );
};

export default Four;

const UserReview = ({ review }: any) => {
  return (
    <div className="flex items-center  border-b pb-5 my-4 border-gray-200 sm:flex-row flex-col">
      <div className="flex flex-col  items-center sm:w-32 sm:h-32 h-20 w-20 sm:mr-10">
        <div className="avatar">
          <div className="w-20 h-20 rounded-full">
            <img
              src={profileImg + review?.image}
              className="rounded-full h-full w-full"
              alt=""
            />
          </div>
        </div>
        <h5 className="text-black font-semibold text-center items-center">
          {review?.name}
        </h5>
        <p className="text-xs text-black text-center ">
          {moment(new Date(review?.cd)).format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <Rate rating={review?.rating} />
        <p className="leading-relaxed text-lg font-semibold text-black mb-2">
          {review?.comment}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-black">
            {new Date(review?.cd).toLocaleString()}
          </p>
          {/* <NavLink to='/' className="flex flex-row items-center text-sm" style={{ color: primaryColor }}>
                        <span>Reply</span>
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </NavLink> */}
        </div>
      </div>
    </div>
  );
};

const Related = ({ product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";
  return (
    <div className="sm:py-10 py-5 ">
      <div className="my-5 pt-1 flex justify-between items-center">
        <SectionHeadingFive title={"Related product"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="">
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
              <Card54 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
