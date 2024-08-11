"use client";
import Card51 from "@/components/card/card51";
import SectionHeadingTwentySeven from "@/components/section-heading/section-heading-twenty-seven";
import DefaultSlider from "@/components/slider/default-slider";
import { SwiperSlide } from "swiper/react";

const BestSellerTwentySeven = ({
  best_sell_product,
  design,
  store_id,
}: any) => {
  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5 ">
      <div className="">
        <div className=" pb-2">
          <SectionHeadingTwentySeven
            title={"Best Sellers."}
            subtitle={"Best selling of the month"}
          />
        </div>
        <DefaultSlider
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            560: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {best_sell_product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card51 item={item} design={design} store_id={store_id} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default BestSellerTwentySeven;
