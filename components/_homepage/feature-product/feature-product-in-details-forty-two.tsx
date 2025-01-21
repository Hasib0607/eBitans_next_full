"use client";
import Card71 from "@/components/card/card71";
import SectionHeadingThirtyFour from "@/components/section-heading/section-heading-thirtyfour";
import DefaultSlider from "@/components/slider/default-slider";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { SwiperSlide } from "swiper/react";

const FeatureProductInProductDetailsPage42 = ({
  feature_product,
  design,
  store_id,
}: any) => {
  let isLoop = feature_product?.length > 1;

  const styleCss = `
   
    .new-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .new-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .new-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .new-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
 `;
  const prevEl = "feature-product-prev";
  const nextEl = "feature-product-next";

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.custom_design || {};
  const featuredProduct = cDesign?.feature_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = featuredProduct;

  return (
    <div className="">
      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="mb-5">
            <SectionHeadingThirtyFour title={title} title_color={title_color} />
          </div>

          <DefaultSlider
            prevEl={prevEl}
            nextEl={nextEl}
            loop={isLoop}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            {feature_product?.slice(0, 10).map((item: any) => (
              <SwiperSlide key={item?.id}>
                <Card71 item={item} design={design} store_id={store_id} />
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductInProductDetailsPage42;