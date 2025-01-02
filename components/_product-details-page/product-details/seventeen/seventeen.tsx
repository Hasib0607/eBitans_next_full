"use client";
import Card31 from "@/components/card/card31";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import DefaultSlider from "@/components/slider/default-slider";
import Arrow from "@/utils/arrow";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowForward } from "react-icons/io";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";
import "./style.css";
import ProdMultiCategory from "@/utils/prod-multi-category";

const Seventeen = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-17"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-17"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-17"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const category = product?.category || [];

  return (
    <>
      <div className="bg-[#AEE6F6] relative mb-10 py-20">
        <div className="w-full flex flex-col gap-3 justify-center items-center">
          <div>
            <h1 className="text-5xl font-medium text-white">Products</h1>
          </div>
          <div className="flex gap-1 items-center">
            {Array.isArray(category) && category?.length > 0 && (
              <p className="text-white">
                <ProdMultiCategory category={category} count={1} />
              </p>
            )}
            <IoIosArrowForward className="text-xs mt-1 text-white" />
            <p className="font-medium text-white">
              {productDetailsData?.product?.name}
            </p>
          </div>
        </div>
        <div className="bg-image-details absolute bottom-0"></div>
        <div className="bg-image-details-top absolute top-0"></div>
      </div>
      <div className="container mx-auto">
        <div className="xl:mx-80 mx-5">
          <Details
            fetchStatus={fetchStatus}
            product={product}
            variant={variant}
            vrcolor={vrcolor}
            data={data}
          />
        </div>
      </div>
      <div className="py-14">
        <div className=" sm:container px-5 xl:px-80">
          <Tab.Group>
            <Tab.List className="">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "text-xl font-semibold text-white bg-pink-500 px-3 py-1 rounded-t-md focus:outline-none mr-2 lg:cursor-pointer"
                    : "mr-2 text-xl font-semibold text-white bg-blue-500 px-3 py-1 rounded-t-md lg:cursor-pointer"
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "text-xl font-semibold text-white bg-pink-500 px-3 py-1 rounded-t-md focus:outline-none"
                    : "text-xl font-semibold text-white bg-blue-500 px-3 py-1 rounded-t-md"
                }
              >
                Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="mb-8 border">
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
                <div className="border-b mx-5">
                  <SectionHeadingSeventeen text={"Customer Reviews"} />
                </div>
                {reviews?.error
                  ? reviews?.error
                  : reviews?.map((item: any) => (
                      <UserReview key={item?.id} review={item} />
                    ))}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      {product && product?.video_link && (
        <VideoPlayer videoUrl={product?.video_link} />
      )}

      <Related product={relatedProducts} />
    </>
  );
};

export default Seventeen;

const UserReview = ({ review }: any) => {
  // console.log(review, 'review');
  const date = `${new Date(review?.cd).getFullYear()}-${(
    new Date(review?.cd).getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${new Date(review?.cd)
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="mx-5 py-5 border-b last:border-b-0">
      <p className="text-sm font-light mt-2">{date}</p>
      <p className="text-xs font-semibold mb-2">{review?.name}</p>
      <Rate className="text-xl" rating={review?.rating} />
      <p className="text-sm font-semiBold mt-1">{review?.comment}</p>
    </div>
  );
};

const Related = ({ product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";
  return (
    <div className="container px-5 xl:px-80 pb-10 bg-white">
      <div className="my-5 pt-1 flex justify-between items-center">
        <div className="hidden md:block"></div>
        <SectionHeadingSeventeen text={"Related Products"} />
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
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1800: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              {/* <ProductCardTwo item={item} /> */}
              <Card31 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
