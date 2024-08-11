"use client";
import { useEffect, useState } from "react";
import {
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";
import { SwiperSlide } from "swiper/react";

import Card33 from "@/components/card/card33";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import SliderSeventeenSingleSlide from "@/components/slider/slider-seventeen-single";
import { iconImg } from "@/site-settings/siteUrl";
import ArrowSeventeen from "@/utils/arrow-seventeen";
import httpReq from "@/utils/http/axios/http.service";
import img3 from "./bg-img/17/brown.png";
import img4 from "./bg-img/17/green.png";
import img1 from "./bg-img/17/offer_bg.webp";
import img2 from "./bg-img/17/pink.png";
import img5 from "./bg-img/17/purple.png";
import image from "./bg-img/17/show_divider_3_92x48.webp";
import "./product-seventeen.css";

const ProductSeventeen = ({ category, product, design, store_id }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function handleCategory() {
      try {
        const response = await httpReq.post(`getcatproducts`, {
          id: category[id].id,
        });
        if (!response?.error) {
          setProducts(response?.data?.data);
        } // the API response object
        else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleCategory();
  }, [category, id]);

  const prev = "layer_seller_Prev";
  const next = "layer_seller_Next";

  return (
    <div className="relative z-0 overflow-hidden h-full py-4 ">
      <div className="hidden lg:block">
        <ParallaxProvider>
          <ParallaxBanner className="xl:aspect-[2/1] lg:aspect-[1.2/1] xl2:aspect-[1.5/1] w-full">
            <ParallaxBannerLayer
              image={img1.src}
              speed={-50}
              style={{
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </ParallaxBanner>
        </ParallaxProvider>
      </div>
      <div className="lg:absolute top-1/2 lg:-translate-y-1/2 left-1/2 lg:-translate-x-1/2 z-[1] sm:container px-5 xl:px-80 mx-auto">
        <div className="flex justify-center pt-4">
          <SectionHeadingSeventeen text={"Layer cakes"} />
        </div>
        <div className="flex justify-center pt-2 pb-10">
          <img src={image.src} alt="" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 ">
          <div className="xl:col-span-1 flex justify-between lg:grid grid-cols-1 gap-1 border-[#78D6F0] lg:border-r-2">
            {category?.slice(0, 4).map((data: any, index: any) => (
              <div key={data?.id} className="xl:justify-end lg:pr-14 relative">
                {active === index && (
                  <div className="h-4 w-4 bg-white lg:block hidden border-t-2 border-r-2 border-[#78D6F0] rotate-45 absolute top-1/2 -translate-y-1/2 -right-[9px]"></div>
                )}
                <div className={`lg:w-max lg:h-full`}>
                  <div
                    className={`relative lg:cursor-pointer p-2 rounded-full ${
                      active === index ? "bg-[#78D6F0]" : ""
                    }`}
                    onClick={() => {
                      setActive(index);
                      setId(index);
                    }}
                  >
                    {index === 0 && (
                      <img
                        src={img2.src}
                        alt=""
                        className="max-h-[100px] w-auto"
                      />
                    )}
                    {index === 1 && (
                      <img
                        src={img3.src}
                        alt=""
                        className="max-h-[100px] w-auto"
                      />
                    )}
                    {index === 2 && (
                      <img
                        src={img4.src}
                        alt=""
                        className="max-h-[100px] w-auto"
                      />
                    )}
                    {index === 3 && (
                      <img
                        src={img5.src}
                        alt=""
                        className="max-h-[100px] w-auto"
                      />
                    )}
                    <img
                      src={iconImg + data.icon}
                      alt=""
                      className="max-h-[50px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                  </div>
                  {/* <img src={iconImg + data?.icon} className='h-[60px] w-[60px] ' alt='' /> */}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 lg:ml-6 relative">
            <div className=" absolute lg:bottom-12 bottom-0 z-[2] left-5">
              <ArrowSeventeen prevEl={prev} nextEl={next} design={design} />
            </div>
            {products?.length ? (
              <SliderSeventeenSingleSlide prevEl={prev} nextEl={next}>
                {products?.slice(0, 12).map((productData: any) => (
                  <SwiperSlide key={productData.id}>
                    <Card33 item={productData} />
                  </SwiperSlide>
                ))}
              </SliderSeventeenSingleSlide>
            ) : (
              <div className="flex justify-center items-center h-[40vh] ">
                <p className="text-3xl text-gray-500">No Product Available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSeventeen;
