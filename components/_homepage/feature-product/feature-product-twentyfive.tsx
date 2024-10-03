"use client";

import Card50 from "@/components/card/card50";
import SectionHeadingTwentyFive from "@/components/section-heading/section-heading-twenty-five";
import DefaultSlider from "@/components/slider/default-slider";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { SwiperSlide } from "swiper/react";

const FeatureProductTwentyFive = ({
  feature_product,
  design,
  store_id,
}: any) => {
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";
  const styleCss = `
    .feature-product-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .feature-product-next:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
 `;

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const featuredProduct = cDesign?.feature_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = featuredProduct;
  return (
    <div className="sm:px-10 px-5 pb-10">
      <style>{styleCss}</style>
      <SectionHeadingTwentyFive
        design={design}
        title={title}
        title_color={title_color}
      />

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
        breakpoints={{
          250: {
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
          976: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {feature_product?.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card50 item={productData} design={design} store_id={store_id} />
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default FeatureProductTwentyFive;
