"use client";
import Card21 from "@/components/card/card21";
import SectionHeadingTwentyOne from "@/components/section-heading/section-heading-twentyone";
import DefaultSlider from "@/components/slider/default-slider";
import useTheme from "@/hooks/use-theme";
import { profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import { Tab } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { SwiperSlide } from "swiper/react";
import { getProductDetails, getRelatedProducts, getReviews } from "../../apis";
import VideoPlayer from "../video-player";
import Details from "./details";

const Eight = ({ data, updatedData }: any) => {
  const { design } = useTheme();

  const { data: productDetailsData, fetchStatus } = useQuery({
    queryKey: ["pd-8"],
    queryFn: () => getProductDetails(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["rp-8"],
    queryFn: () => getRelatedProducts(updatedData?.product_id),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["rv-8"],
    queryFn: () => getReviews(updatedData),
    enabled: !!updatedData.slug && !!updatedData.store_id,
  });

  const { product, vrcolor, variant } = productDetailsData || {};

  const styleCss = `
    .active-des-review {
      color:  ${design?.header_color};
      text-decoration-color: ${design?.header_color};
    }
    `;

  return (
    <div className="bg-white mx-auto">
      <style>{styleCss}</style>
      <div className="">
        <div className="sm:container px-5 sm:py-10 py-5">
          <Details
            fetchStatus={fetchStatus}
            product={product}
            variant={variant}
            vrcolor={vrcolor}
            data={data}
          />
        </div>
        {/* ************************ tab component start ***************************** */}

        <div className="my-10 sm:py-10 py-5 sm:container px-5 lg:flex gap-x-10">
          <Tab.Group>
            <Tab.List className="flex flex-col lg:w-[200px] w-full border-r-2 border-gray-200">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "text-xl focus:outline-none text-left border-r-2 border-blue-400 pb-3 pr-5"
                    : "text-gray-400 text-xl text-left pb-3"
                }
              >
                Description
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "text-xl focus:outline-none text-left border-r-2 border-blue-400 pt-3"
                    : "text-gray-400 text-xl text-left pt-3"
                }
              >
                Reviews
              </Tab>
            </Tab.List>
            <Tab.Panels className="w-full lg:border-0 border mt-10 lg:mt-0">
              <Tab.Panel>
                <div className="rounded-lg p-5">
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

        <div className="sm:container px-5 sm:py-10 py-5">
          <Related product={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default Eight;

const UserReview = ({ review }: any) => {
  return (
    <div className=" rounded-lg p-5 flex items-center gap-5 w-full">
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
        <SectionHeadingTwentyOne title={"YOU"} subtitle={"MAY ALSO LIKE"} />
      </div>
      <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
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
              <Card21 item={productData} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};
