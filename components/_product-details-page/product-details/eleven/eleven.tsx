"use client";
import Card21 from "@/components/card/card21";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
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
import Details from "./details";
import "./five.css";

const Eleven = ({ data, updatedData }: any) => {
  const { design } = useTheme();

  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-11"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-11"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-11"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const styleCss = `
    .video-border {
      border:  15px solid ${design?.header_color};
    }
 
    `;

  console.log({ product, vrcolor, variant });

  return (
    <div className="container px-5 bg-white pt-10">
      <style>{styleCss}</style>
      <Details
        fetchStatus={fetchStatus}
        data={data}
        product={product}
        variant={variant}
        vrcolor={vrcolor}
      />

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14">
        <Tab.Group>
          <Tab.List className="fiveBorder">
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl  underline-offset-8 text-black border-hidden focus:outline-none"
                  : "bg-white text-black fiveUn "
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl  underline-offset-8 text-black border-hidden ml-8 focus:outline-none"
                  : "bg-white text-black fiveUn ml-8"
              }
            >
              Reviews
            </Tab>
          </Tab.List>
          <Tab.Panels className="mb-8">
            <Tab.Panel>
              <div className="p-5">
                {productDetailsData?.product?.video_link && (
                  <div className="mb-5">
                    <iframe
                      className="xl:h-[700px] h-[350px] md:h-[450px] lg:h-[600px] w-full video-border"
                      src={productDetailsData?.product?.video_link}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="video"
                    />{" "}
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

export default Eleven;

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
    <div className="py-5 sm:my-10">
      <div className="my-5 pt-1 flex justify-between items-center container px-5">
        <SectionHeadingSeven title={"Related product"} />
        <Arrow prevEl={prev} nextEl={next}></Arrow>
      </div>
      <div className="container px-5">
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
              <Card21 item={item} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
