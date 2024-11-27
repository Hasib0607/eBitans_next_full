"use client";
import Card54 from "@/components/card/card54";
import SectionHeading from "@/components/section-heading/section-heading";
import DefaultSlider from "@/components/slider/default-slider";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { SwiperSlide } from "swiper/react";

const FeatureProductFour = ({ feature_product, design, store_id }: any) => {
  const prevEl = "new-product-prev";
  const nextEl = "new-product-next";
  let isLoop = feature_product.length > 1;
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

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.custom_design || {};
  const featuredProduct = cDesign?.feature_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = featuredProduct;

  return (
    <div data-aos="fade-up" className="bg-white">
      <style>{styleCss}</style>
      <div
        data-aos="fade-up"
        className="gap-4 sm:container px-5 sm:py-10 py-5 relative arrow-hov"
      >
        <div className="">
          <SectionHeading
            text={title || "Feature Products"}
            design={design}
            title_color={title_color}
          />
        </div>

        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={isLoop}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
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
              <Card54 item={item} store_id={store_id} design={design} />
            </SwiperSlide>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default FeatureProductFour;
