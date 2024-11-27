"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import SectionHeadingSix from "@/components/section-heading/section-heading-six";
import GridSliderSixCat from "@/components/slider/grid-slider/grid-slider-six-cat";
import useHeaderSettings from "@/utils/query/use-header-settings";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeatureCatSix from "./suppliment/catsix";
import { useEffect, useState } from "react";

const FeaturedSix = ({ category, design }: any) => {
  const prevEl = "feature_cat_prev";
  const nextEl = "feature_cat_next";
  const [featuredCatData, setFeaturedCatData] = useState<any>([]);

  useEffect(() => {
    if (category) {
      setFeaturedCatData(category);
    }
  }, [category]);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
  .feature_cat_prev:hover {
    color:${textColor};
    background:${bgColor};
  }
  .feature_cat_next:hover {
    color:${textColor};
    background:${bgColor};
  }
    `;

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.custom_design || {};
  const featureCategory = cDesign?.feature_category?.[0] || {};
  const { title, title_color } = featureCategory;

  return (
    <div>
      <div className="sm:container px-5 sm:py-10 py-5 bg-gray-200 xl:block hidden">
        <div className="pb-3">
          <SectionHeadingSix
            title_color={title_color}
            title={title || "Featured Categories"}
          />
        </div>
        <div className=" xl:grid-cols-5 lg:grid-cols-5 bg-white grid ">
          {category?.map((item: any) => {
            return (
              <div key={item.id}>
                <FeatureCatSix item={item} />
              </div>
            );
          })}
        </div>
      </div>
      {category?.length > 0 && (
        <div className="group z-0 xl:hidden block py-10 bg-gray-200 xl:px-60 px-5">
          <style>{styleCss}</style>
          <div className=" gap-2 relative lg:cursor-pointer lg:hidden lg:group-hover:block ">
            <div
              className={`${prevEl} bg-gray-500 text-white  rounded-full transition-all duration-500  ease-linear absolute -left-4  top-[145px] z-10 `}
            >
              <ChevronLeftIcon className="h-8 text-2xl font-serif font-bold" />
            </div>
            <div
              className={`${nextEl} bg-gray-500 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-[145px] z-10 `}
            >
              <ChevronRightIcon className="h-8 text-2xl font-serif font-bold" />
            </div>
          </div>

          <GridSliderSixCat
            prevEl={prevEl}
            nextEl={nextEl}
            isLoop={featuredCatData?.length > 1}
          >
            {featuredCatData?.length > 0 &&
              featuredCatData?.map((item: any) => (
                <SwiperSlide className="swiperjs-slider-six " key={item?.id}>
                  <FeatureCatSix item={item} />
                </SwiperSlide>
              ))}
          </GridSliderSixCat>
        </div>
      )}
    </div>
  );
};

export default FeaturedSix;
