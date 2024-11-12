"use client";
import Card19 from "@/components/card/card19";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import SliderNine from "@/components/slider/slider-nine";
import Arrowbetween from "@/utils/arrow-between";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { SwiperSlide } from "swiper/react";

const FeatureProductEleven = ({ feature_product, design, store_id }: any) => {
  const prev = "daily_best_seller_Prev";
  const next = "daily_best_seller_Next";

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const featuredProduct = cDesign?.feature_product?.[0] || {};
  
  if (!featuredProduct) {
    return null;
  }

  const title = featuredProduct?.title || "Default Title";
  const title_color = featuredProduct?.title_color || "#000";
  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white relative">
      <SectionHeadingSeventeen
        title={title}
        subtitle={""}
        title_color={title_color || "#000"}
      />
      <div className="mb-16 absolute inset-1 flex items-center">
        <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
      </div>

      <SliderNine prevEl={prev} nextEl={next}>
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            {" "}
            <Card19 item={productData} design={design} store_id={store_id} />
          </SwiperSlide>
        ))}
      </SliderNine>
    </div>
  );
};

export default FeatureProductEleven;
