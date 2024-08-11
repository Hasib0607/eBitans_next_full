"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { SwiperSlide } from "swiper/react";
import Details from "./details";
import moment from "moment";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import SectionHeadingThirtyThree from "@/components/section-heading/section-heading-thirtythree";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DefaultSlider from "@/components/slider/default-slider";
import Card59 from "@/components/card/card59";

const ThirtyThree = ({ data }: any) => {
  const { store_id, design } = useTheme();

  const [relatedProduct, setRelatedProduct] = useState([]);
  const [reviews, setReview] = useState([]);
  const [productDetails, setProductDetails] = useState<any>([]);

  useEffect(() => {
    data["store_id"] = store_id;

    httpReq.post("product-details", data).then((res: any) => {
      if (!res?.error) {
        setProductDetails(res?.product);
      }
    });

    httpReq.post("get/review", data).then((res) => {
      if (!res?.error) {
        setReview(res);
      } else {
        setReview([]);
      }
    });
    httpReq.post("related-product", { id: data?.product_id }).then((res) => {
      if (!res?.error) {
        setRelatedProduct(res);
      }
    });
  }, [data, store_id]);

  const styleCss = `
    .active-des-review {
      color:  ${design?.header_color};
      text-decoration-color: ${design?.header_color};
    }
    
    `;

  return (
    <div className="">
      <div className="w-full bg-gray-100 text-[#252525]">
        <div className="flex flex-col justify-center sm:container px-5 py-5 my-5">
          <div className="flex items-center gap-1 text-sm">
            <p>Home</p>
            <p> {productDetails?.name}</p>
          </div>
        </div>
      </div>
      <style>{styleCss}</style>
      <div className="sm:container px-5 sm:pb-10 pb-5">
        <Details data={data} />

        {/* ************************ tab component start ***************************** */}
        <div className="my-14 border-b pb-10">
          <Tab.Group>
            <Tab.List className="pb-3 w-full border-b text-center">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "underline decoration-2 text-lg focus:outline-none underline-offset-[17px] border-hidden active-des-review uppercase"
                    : "bg-white text-black text-lg uppercase"
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "underline decoration-2 text-lg focus:outline-none underline-offset-[17px] active-des-review border-hidden ml-8 uppercase"
                    : "bg-white text-black ml-8 text-lg uppercase"
                }
              >
                Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="">
              <Tab.Panel>
                <div className="p-5 ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.description,
                    }}
                    className="apiHtml"
                  ></div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {reviews.length === 0 ? (
                  <div className="flex flex-1 justify-center items-center p-5">
                    <h3 className="text-xl font-sans font-bold">
                      No Found Review
                    </h3>
                  </div>
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
        <Related product={relatedProduct} />
      </div>
    </div>
  );
};

export default ThirtyThree;

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
  // console.log(product,"product");
  const { design } = useTheme();

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
    <div className="pb-10 w-full">
      <style>{styleCss}</style>
      <div className="">
        <SectionHeadingThirtyThree title={"Recommended products"} />
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
            375: {
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
            980: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <Card59 item={productData} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
