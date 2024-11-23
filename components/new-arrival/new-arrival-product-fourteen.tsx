"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";

import useHeaderSettings from "@/utils/query/use-header-settings";
import { BsPlay } from "react-icons/bs";
import Card29 from "../card/card29";
import SectionHeadingSixteen from "../section-heading/section-heading-sixteen";
import DefaultSlider from "../slider/default-slider";

const NewArrivalProductFourteen = ({ product, design, store_id }: any) => {
  const prevEl = "new-fourteen-prev";
  const nextEl = "new-fourteen-next";

  const styleCss = `
    .new-fourteen-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .new-fourteen-next:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }

  .arrow-hov:hover .arrow {
    opacity:1;
    background: white;
  }
 
    `;

  const { data, error } = useHeaderSettings();

  const cDesign = data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;

  if (error) {
    return <p>error from new arrival product</p>;
  }
  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white relative  arrow-hov">
      <style>{styleCss}</style>
      <SectionHeadingSixteen
        title={title || "New Arrivals"}
        title_color={title_color || "#000"}
        subtitle={""}
      />
      <div className="relative z-10 ">
        <div className=" gap-2 lg:cursor-pointer arrow opacity-0  duration-500">
          <div
            className={`${prevEl} bg-gray-400 text-white h-10 w-10 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute -left-4  top-[250px] `}
          >
            <BsPlay className="h-8 text-2xl rotate-180 font-serif font-bold" />
          </div>
          <div
            className={`${nextEl} bg-gray-400 flex justify-center items-center h-10 w-10 text-white rounded-full transition-all duration-500  ease-linear absolute -right-4 top-[250px] `}
          >
            <BsPlay className="h-8 text-2xl  font-serif font-bold" />
          </div>
        </div>
      </div>

      <DefaultSlider
        prevEl={prevEl}
        nextEl={nextEl}
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
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {product.slice(0, 10).map((productData: any) => (
          <SwiperSlide key={productData.id}>
            <Card29 design={design} store_id={store_id} item={productData} />
          </SwiperSlide>
        ))}
      </DefaultSlider>
    </div>
  );
};

export default NewArrivalProductFourteen;
