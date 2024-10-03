"use client";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";
import RelatedProducts from "./related-products";

const One = ({ data, updatedData }: any) => {
  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-1"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-1"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-1"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  console.log(productDetailsData, "pd");
  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      <div className="mx-auto">
        <Details
          fetchStatus={fetchStatus}
          data={data}
          product={product}
          vrcolor={vrcolor}
          variant={variant}
        />
        {/* ************************ tab component start ***************************** */}
        <div className="mt-5">
          <Tab.Group>
            <Tab.List className="fiveBorder space-x-4 ">
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

        {/* Video */}

        {product && product?.video_link && (
          <VideoPlayer videoUrl={product?.video_link} />
        )}

        <div className="py-4"></div>
        <RelatedProducts product={relatedProducts} />
      </div>
    </div>
  );
};

export default One;

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
        <h2 className="text-gray-900 text-lg title-font font-medium">
          <Rate rating={review?.rating} />
        </h2>
        <p className="leading-relaxed text-lg font-semibold text-black mb-2">
          {review?.comment}
        </p>
      </div>
    </div>
  );
};

export const ColorSelect = ({
  setSelect,
  select,
  selectColor,
  bg,
  getColor,
}: any) => {
  return (
    <>
      <div
        onClick={() => {
          getColor(bg);
          setSelect(selectColor);
        }}
        className={`avatar ${select === selectColor ? "online" : null}`}
      >
        <div
          className={`text-neutral-content rounded-full w-8`}
          style={{ backgroundColor: bg }}
        ></div>
      </div>
    </>
  );
};

export const SizeSelect = ({
  setSelect,
  select,
  selectSize,
  setVariant,
  data,
}: any) => {
  return (
    <>
      <div
        onClick={() => {
          setVariant(data);
          setSelect(selectSize);
        }}
        className={`border border-gray-300 w-10 rounded ${
          select === selectSize ? "bg-orange-500 text-white" : null
        }`}
      >
        <p
          className={`text-lg text-center ${
            select === selectSize ? "bg-orange-500 text-white" : "text-black"
          }`}
        >
          {selectSize}
        </p>
      </div>
    </>
  );
};
