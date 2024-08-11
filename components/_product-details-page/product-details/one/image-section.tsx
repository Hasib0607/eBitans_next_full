"use client";
import React, { useState } from "react";
import ReactImageZoom from "react-image-zoom";

// import Swiper core and required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { productImg } from "@/site-settings/siteUrl";
// import Zoom from './Zoom';
// import ImageZoom from '../../"@/components/utils/ImageZoom'

const ImageSection = ({ images }: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // console.log(images);
  return (
    <>
      <Swiper
        style={
          {
            //   "--swiper-navigation-color": "#fff",
            //   "--swiper-pagination-color": "#fff",
          }
        }
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.map((item: any, index: any) => (
          <SwiperSlide key={index}>
            <div className="w-full">
              <ImageZoom img={productImg + item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative">
        <Swiper
          style={
            {
              // "--swiper-navigation-color": "#fff",
              // "--swiper-pagination-color": "#fff",
            }
          }
          //   onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={1}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper my-3 mx-1"
          navigation={{
            prevEl: `.pre`,
            nextEl: `.nex`,
          }}
        >
          {images?.map((item: any, index: any) => (
            <SwiperSlide key={index}>
              <img src={productImg + item} className={"h-20 w-20"} alt={""} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ChevronLeftIcon
          height={22}
          color={"#fff"}
          className={
            "pre absolute -left-5 bottom-8 bg-gray-700 z-10 h-6 w-6 rounded-full"
          }
        />
        <ChevronRightIcon
          height={22}
          color={"#fff"}
          className={
            "nex absolute right-0 bottom-8 bg-gray-700 z-10 h-6 w-6 rounded-full"
          }
        />
      </div>
    </>
  );
};

export default ImageSection;

const ImageZoom = ({ img }: any) => {
  const props = { img: img, zoomPosition: "original" };
  return (
    <div className="w-full overflow-hidden">
      <ReactImageZoom {...props} />
      {/* <Zoom image={img} /> */}
    </div>
  );
};
