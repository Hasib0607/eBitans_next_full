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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DefaultSlider from "@/components/slider/default-slider";
import Card56 from "@/components/card/card56";

const TwentySix = ({ data }: any) => {
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

    httpReq.post("get/review", data).then((res: any) => {
      if (!res?.error) {
        setReview(res);
      } else {
        setReview([]);
      }
    });
    httpReq
      .post("related-product", { id: data?.product_id })
      .then((res: any) => {
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
    <div className="sm:container px-5 pt-10 bg-white relative">
      <style>{styleCss}</style>
      <Details data={data} />

      {/* ************************ tab component start ***************************** */}
      <div className="mt-14">
        <Tab.Group>
          <Tab.List className="pb-5">
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl focus:outline-none underline-offset-8 border-hidden active-des-review "
                  : "bg-white text-black text-xl"
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-xl focus:outline-none underline-offset-8 active-des-review border-hidden ml-8"
                  : "bg-white text-black ml-8 text-xl"
              }
            >
              Reviews
            </Tab>
          </Tab.List>
          <Tab.Panels className="mb-8">
            <Tab.Panel>
              <div className="p-5 bg-slate-50 rounded-lg">
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
                <div className="flex flex-1 justify-center items-center">
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
  );
};

export default TwentySix;

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
    <div className="pb-10 w-full ">
      <style>{styleCss}</style>

      <div className="flex justify-between items-center pb-5 text-2xl">
        <p>BEST SELLER PRODUCTS</p>
        <div className="">
          <div className="lg:cursor-pointer flex items-center gap-2">
            <div
              className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear z-[5] `}
            >
              <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear z-[5] `}
            >
              <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
            </div>
          </div>
        </div>
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
            250: {
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
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <div className="py-5">
                <Card56 item={productData} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
