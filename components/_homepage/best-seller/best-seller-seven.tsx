"use client";
import Card11 from "@/components/card/card11";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import SliderFive from "@/components/slider/slider-five";
import Arrowbetween from "@/utils/arrow-between";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { SwiperSlide } from "swiper/react";

const BestSellerSeven = ({ best_sell_product }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const bestSellProduct = cDesign?.best_sell_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = bestSellProduct;

  return (
    <div className="container px-5 bg-white relative py-5">
      <SectionHeadingSeventeen
        title={title || "Flash Sale"}
        subtitle={""}
        title_color={title_color || "#000"}
      />
      <div className="relative px-5">
        <SliderFive prevEl={prev} nextEl={next}>
          {best_sell_product?.slice(0, 10).map((productData: any) => (
            <SwiperSlide key={productData.id}>
              {" "}
              <Card11 item={productData} />
            </SwiperSlide>
          ))}
        </SliderFive>
        <div className="top-3 left-0 right-0 absolute inset-1 flex items-center">
          <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
        </div>
      </div>
    </div>
  );
};

export default BestSellerSeven;
