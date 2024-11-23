"use client";
import Card67 from "@/components/card/card67";
import DefaultSlider from "@/components/slider/default-slider";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import ScrollTrigger from "react-scroll-trigger";

const FeatureProductThirtyNine = ({
  feature_product,
  design,
  store_id,
}: any) => {
  const [animate, setAnimate] = useState(false);

  const prevEl = "feature-product-prev-thirtynine";
  const nextEl = "feature-product-next-thirtynine";

  const styleCss = `
    .btn-best-product {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid transparent;
    }
    .btn-best-product:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
    .best-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .best-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .best-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .best-product-next:hover {
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
  // const { title = "Default Title", title_color = "#000" } = featuredProduct;
  const title = featuredProduct?.title;
  const title_color = featuredProduct?.title_color;

  if (feature_product?.length === 0) {
    return null;
  }

  return (
    <div className="pl-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="relative">
        <div className="text-center pb-12">
          <p
            style={{ color: title_color }}
            className="font-semibold text-[24px]"
          >
            {title}
          </p>
        </div>

        {/* <div className="gap-10 flex lg:cursor-pointer absolute bottom-16 left-1/2 -translate-x-1/2 z-[2]">
          <div className={`${prevEl} lg:cursor-pointer `}>
            <ChevronLeftIcon className="h-4 font-serif font-bold" />
          </div>
          <div className=""></div>
          <div className={`${nextEl} lg:cursor-pointer`}>
            <ChevronRightIcon className="h-4 font-serif font-bold" />
          </div>
        </div> */}

        {/* <ScrollTrigger onEnter={() => setAnimate(true)}> */}
        <DefaultSlider
          prevEl={prevEl}
          nextEl={nextEl}
          loop={true}
          modules={[Pagination]}
          paginationType={"fraction"}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5.35,
              spaceBetween: 20,
            },
          }}
        >
          {feature_product?.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item?.id}>
              <div
                className={`${
                  animate ? "translate-y-0" : "translate-y-[25px]"
                } duration-1000`}
              >
                <Card67 item={item} design={design} store_id={store_id} />
              </div>
            </SwiperSlide>
          ))}
        </DefaultSlider>
        {/* </ScrollTrigger> */}
      </div>
    </div>
  );
};

export default FeatureProductThirtyNine;
