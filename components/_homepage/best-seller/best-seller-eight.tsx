"use client";

import { SwiperSlide } from "swiper/react";

import Card40 from "@/components/card/card40";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import DefaultSlider from "@/components/slider/default-slider";
import Arrowbetween from "@/utils/arrow-between";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BestSellerEight = ({ product, store_id }: any) => {
  const prev = "best_seller_Prev";
  const next = "best_seller_Next";

  return (
    <div className="bg-white ">
      <div className="sm:container px-5 sm:py-10 py-5 relative">
        <SectionHeadingSeven title={"Best Seller Products"} subtitle={""} />
        <div className="demo">
          <div className="sm:container px-5 mt-20 absolute inset-0 flex items-center ">
            <Arrowbetween prevEl={prev} nextEl={next}></Arrowbetween>
          </div>

          <DefaultSlider
            prevEl={prev}
            nextEl={next}
            breakpoints={{
              250: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              560: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1000: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {product.map((productData: any) => (
              <SwiperSlide key={productData.id}>
                <Card40 item={productData} store_id={store_id} />
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
      </div>
    </div>
  );
};

export default BestSellerEight;
