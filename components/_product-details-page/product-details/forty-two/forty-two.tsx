"use client";
import Card67 from "@/components/card/card67";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";

const FortyTwo = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-39"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-39"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-39"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};
  return (
    <div className="">
      <div className="sm:container px-5">
        <Details
          fetchStatus={fetchStatus}
          data={data}
          product={product}
          vrcolor={vrcolor}
          variant={variant}
        />

        {/* ************************ tab component start ***************************** */}
        <div className="mt-14 bg-white">
          <Tab.Group>
            <Tab.List className="px-5 py-2 bg-[#DDDDDD]">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "underline text-sm md:text-xl focus:outline-none underline-offset-[12px] border-hidden "
                    : "text-sm md:text-xl"
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "underline text-sm md:text-xl focus:outline-none underline-offset-[12px] border-hidden ml-8"
                    : "ml-8 text-sm md:text-xl"
                }
              >
                Customer Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="p-5">
              <Tab.Panel>
                <div className="">
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
    </div>
  );
};

export default FortyTwo;

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
  return (
    <div className="py-5 sm:py-10">
      <div>
        <h1 className="text-2xl pb-3">RELATED PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
        {product
          ?.slice(0, 10)
          .map((item: any, id: any) => <Card67 item={item} key={id} />)}
      </div>
    </div>
  );
};
