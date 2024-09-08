"use client";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import Card9 from "@/components/card/card9";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import DefaultSlider from "@/components/slider/default-slider";
import Arrowbetween from "@/utils/arrow-between";
import useHeaderSettings from "@/utils/query/use-header-settings";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedSeven = ({ category }: any) => {
  const prev = "best_seller_seven_Prev";
  const next = "best_seller_seven_Next";

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const featureCategory = cDesign?.feature_category?.[0] || {};
  const { title, title_color } = featureCategory;

  return (
    <div className="container px-5 bg-white relative py-5">
      <SectionHeadingSeventeen
        title={title || "Featured Categories"}
        title_color={title_color}
      />
      <div className="relative px-5">
        <DefaultSlider
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            350: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
          }}
        >
          {category?.map((product9Data: any) => (
            <SwiperSlide key={product9Data.id}>
              <Card9 item={product9Data} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
        <div className="top-3 left-0 right-0 absolute inset-1 flex items-center">
          <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSeven;
