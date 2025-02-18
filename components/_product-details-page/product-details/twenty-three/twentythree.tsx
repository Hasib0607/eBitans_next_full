"use client";
import userImg from "@/assets/img/user.png";
import Card47 from "@/components/card/card47";
import SectionHeadingTwentyThree from "@/components/section-heading/section-heading-twentythree";
import DefaultSlider from "@/components/slider/default-slider";
import useTheme from "@/hooks/use-theme";
import { productImg, profileImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";

const TwentyThree = ({ data, updatedData }: any) => {
  const { design, store_id } = useTheme();

  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-23"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-23"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-23"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const styleCss = `
    .active-des-review {
      color:  ${design?.header_color};
      text-decoration-color: ${design?.header_color};
      text-decoration-thickness: 3px;
    }
    
    `;

  return (
    <div
      className={`sm:container px-5 bg-white ${
        store_id !== 9209 ? "xl:px-24" : ""
      }`}
    >
      {store_id !== 9209 && (
        <div className="flex items-center gap-x-1 text-gray-500 text-sm mt-5">
          <Link href="/">
            <p>Home</p>
          </Link>
          <RiArrowRightSLine />
          <p className="truncate">{productDetailsData?.name}</p>
        </div>
      )}
      <style>{styleCss}</style>
      {store_id !== 9209 ? (
        <Details
          fetchStatus={fetchStatus}
          product={product}
          variant={variant}
          vrcolor={vrcolor}
          data={data}
        />
      ) : (
        <div className="grid lg:grid-cols-7 gap-5">
          <div className="lg:col-span-6 w-full">
            <Details
              fetchStatus={fetchStatus}
              product={product}
              variant={variant}
              vrcolor={vrcolor}
              data={data}
            />
          </div>
          <div className="w-full hidden lg:block">
            <RelatedProduct product={relatedProducts} />
          </div>
        </div>
      )}

      {/* ************************ tab component start ***************************** */}
      <div className="mt-20 border-b pb-10">
        <Tab.Group>
          <Tab.List className="pb-3 w-full border-b text-center">
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-lg focus:outline-none underline-offset-[17px] border-hidden active-des-review uppercase"
                  : "bg-white text-black text-lg uppercase"
              }
            >
              Description
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "underline text-lg focus:outline-none underline-offset-[17px] active-des-review border-hidden ml-8 uppercase"
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
                    __html: productDetailsData?.product?.description,
                  }}
                  className="apiHtml"
                ></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {reviews?.length === 0 ? (
                <div className="flex flex-1 justify-center items-center p-5">
                  <h3 className="text-xl font-sans font-bold">
                    No Review Found
                  </h3>
                </div>
              ) : reviews?.error ? (
                reviews?.error
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

      {product && product?.video_link && (
        <VideoPlayer videoUrl={product?.video_link} />
      )}

      {store_id !== 9209 && <Related product={relatedProducts} />}
      {store_id === 9209 && (
        <div className="w-full block lg:hidden py-3">
          <RelatedProduct product={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default TwentyThree;

const UserReview = ({ review }: any) => {
  return (
    <div className="p-5 flex items-center gap-5 w-full">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full">
          <img
            src={review?.image ? profileImg + review?.image : userImg.src}
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
  //
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
      <div className="pb-2">
        <SectionHeadingTwentyThree title={"RELATED PRODUCTS"} />
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
              slidesPerView: 2,
              spaceBetween: 10,
            },
            976: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              <Card47 item={productData} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

const RelatedProduct = ({ product }: any) => {
  return (
    <div>
      <div>
        <h1 className="xl:text-xl text-sm mb-5">Recommended For You</h1>
      </div>
      <div className="flex lg:flex-col items-center gap-1 lg:gap-5">
        {product
          ?.slice(0, 3)
          .map((item: any) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

const Card = ({ item }: any) => {
  const { store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  useEffect(() => {
    const offerData = {
      id: item?.id,
      store_id,
    };

    httpReq.post("get/offer/product", offerData).then((res) => {
      if (!res?.error) {
        setCamp(res);
      }
    });
  }, [item?.id, store_id]);

  let productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  return (
    <div>
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        <div>
          <img src={productImg + item.image[0]} alt="" />
        </div>
        <div className="my-1 xl:text-base text-sm">{item?.name}</div>
        <div className="text-gray-600 font-semibold flex items-center gap-2 w-full ">
          <p className="text-color text-sm">
            <BDT
              price={camp?.status === "active" ? campPrice : productGetPrice}
            />
          </p>
          <h1 className="line-through text-xs">
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p>
                <BDT price={Math.trunc(item.regular_price)} />
              </p>
            )}
          </h1>
        </div>
      </Link>
    </div>
  );
};
