"use client";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";
import useTheme from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import getDomain from "@/utils/getDomain";
import { useGetSettingQuery } from "@/redux/features/home/homeApi";
import FeatureProductInProductDetailsPage42 from "@/components/_homepage/feature-product/feature-product-in-details-forty-two";
import Card72 from "@/components/card/card72";

const FortyTwo = ({ data, updatedData }: any) => {
  const { design, store_id } = useTheme();
  const url = getDomain();

  const [featureProduct, setFeatureProduct] = useState<any>([]);
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

  const {
    data: featureProductData,
    isLoading: featureLoading,
    isSuccess: featureSuccess,
  } = useGetSettingQuery(
    { domain: url, slug: "feature_product" }
  );
  useEffect(() => {
    if (featureProductData) {
      const getFeatureProductData = featureProductData?.data || [];
      setFeatureProduct(getFeatureProductData);
    }
  }, [featureSuccess, featureProductData]);
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

        {/* Feature Products */}
        <div>
          <FeatureProductInProductDetailsPage42 feature_product={featureProduct} design={design} store_id={store_id} />
        </div>

        {/* ************************ tab component start ***************************** */}
        <div
          className="mt-14 bg-white"
          style={
            {
              "--header-color": design?.header_color,
              "--text-color": design?.text_color,
            } as React.CSSProperties
          }
        >
          <Tab.Group>
            <Tab.List className="px-4 bg-[#DDDDDD]">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "bg-[var(--header-color)] px-3 py-2 text-sm md:text-xl focus:outline-none underline-offset-[12px] border-hidden "
                    : "text-sm md:text-xl"
                }
              >
                Product Information
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "bg-[var(--header-color)] px-3 py-2 text-sm md:text-xl focus:outline-none underline-offset-[12px] border-hidden ml-8"
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
          .map((item: any, id: any) => <Card72 item={item} key={id} />)}
      </div>
    </div>
  );
};

