"use client";

import useHeaderSettings from "@/utils/query/use-header-settings";
import { SwiperSlide } from "swiper/react";
import Card51 from "../card/card51";
import SectionHeadingTwentySeven from "../section-heading/section-heading-twenty-seven";
import DefaultSlider from "../slider/default-slider";

const NewArrivalProductTwentySeven = ({ product, design, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const cDesign = data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }

  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5 ">
      <div className="">
        <div className=" pb-2">
          <SectionHeadingTwentySeven
            title={title || "New Arrival"}
            title_color={title_color || "#000"}
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
          {product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <Card51 item={item} design={design} store_id={store_id} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default NewArrivalProductTwentySeven;
