"use client";
import Arrow from "@/utils/arrow";

import Card24 from "@/components/card/card24";
import SliderEleven from "@/components/slider/slider-eleven";
import { SwiperSlide } from "swiper/react";

const FeaturedThree = ({ product, category, design, store_id }: any) => {
  const prev1 = "category_Prev1";
  const next1 = "category_Next1";

  const prev2 = "lcategory_Prev2";
  const next2 = "lcategory_Next2";

  const prev3 = "category_Prev3";
  const next3 = "category_Next3";
  const customDesign = `


    .footerFiveBorderCustom {
        margin: 0;
        padding-bottom: 7px;
        position: relative;
        width: 40%;
    }
    
    .footerFiveBorderCustom:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;

        content: '';
        bottom: 0;
        right: 0;
        left: 0;
    }
    `;

  const latestCategory = category?.slice(category.length - 3);

  const categoryOne = product.filter((data: any) => {
    return parseInt(data?.category_id) === latestCategory[0]?.id;
  });
  const categoryTwo = product.filter(
    (data: any) => parseInt(data?.category_id) === latestCategory[1]?.id
  );
  const categoryThree = product.filter(
    (data: any) => parseInt(data?.category_id) === latestCategory[2]?.id
  );

  return (
    <div className="bg-white px-2">
      <style>{customDesign}</style>
      <div className="container py-5">
        <div className="py-5 pt-1 flex justify-between items-center ">
          <div className="container">
            <div className="grid lg2:grid-cols-3 grid-cols-1 gap-4">
              {categoryOne.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg footerFiveBorderCustom">
                      {latestCategory[0]?.name}
                    </div>
                    <div className="">
                      <Arrow prevEl={prev1} nextEl={next1}></Arrow>
                    </div>
                  </div>
                  <div className="container">
                    <SliderEleven prevEl={prev1} nextEl={next1}>
                      {categoryOne?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                          <Card24
                            item={item}
                            design={design}
                            store_id={store_id}
                          />
                        </SwiperSlide>
                      ))}
                    </SliderEleven>
                  </div>
                </div>
              )}

              {categoryTwo.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg footerFiveBorderCustom">
                      {latestCategory[1]?.name}
                    </div>
                    <div className="">
                      <Arrow prevEl={prev2} nextEl={next2}></Arrow>
                    </div>
                  </div>
                  <div className="container">
                    <SliderEleven prevEl={prev2} nextEl={next2}>
                      {categoryTwo?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                          <Card24
                            item={item}
                            design={design}
                            store_id={store_id}
                          />
                        </SwiperSlide>
                      ))}
                    </SliderEleven>
                  </div>
                </div>
              )}

              {categoryThree.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-lg footerFiveBorderCustom">
                      {latestCategory[2]?.name}
                    </div>
                    <div className="">
                      <Arrow prevEl={prev3} nextEl={next3}></Arrow>
                    </div>
                  </div>
                  <div className="container">
                    <SliderEleven prevEl={prev3} nextEl={next3}>
                      {categoryThree?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                          <Card24
                            item={item}
                            design={design}
                            store_id={store_id}
                          />
                        </SwiperSlide>
                      ))}
                    </SliderEleven>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedThree;
