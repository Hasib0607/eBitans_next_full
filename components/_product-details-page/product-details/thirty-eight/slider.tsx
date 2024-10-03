"use client";
import React, { createRef, useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  A11y,
  EffectFade,
  Autoplay,
  Controller,
} from "swiper/modules";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";

export const HSlider = ({ product, setOpen, open }: any) => {
  const { design } = useTheme();

  const [id, setId] = useState<any>(null);
  const [activeMbl, setActiveMbl] = useState(0);
  const [images, setImages] = useState([]);

  //creating the ref
  const customSlider = createRef<any>();

  const goNext = () => {
    customSlider.current.slickNext();
  };

  const goPrev = () => {
    customSlider.current.slickPrev();
  };

  // for image
  useEffect(() => {
    const arr = product?.image;
    if (arr === undefined) return;
    setImages(arr);
  }, [product?.image]);

  // style css
  const styleCss = `

    .icon-color:hover {
        color:${design?.header_color};
        }
        .active-img {
        border:  3px solid ${design?.header_color};
    }
        .active-img-mbl {
        border:  1px solid ${design?.header_color};
    }
    .arrow-slick-color {
        color:${design?.header_color};
    }

    `;

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const settingsSmall = {
    infinite: images.length > 4 && true,
    slidesToShow: 4,
    slidesToScroll: 1,
    verticalSwiping: true,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    },
  };

  return (
    <div>
      <style>{styleCss}</style>

      <div className="grid grid-cols-5 gap-y-3 gap-x-5  w-full">
        <div className="relative z-[1] sm:col-span-5 col-span-5 ">
          <div
            ref={navigationPrevRef}
            className={`w-10 h-10 lg:cursor-pointer text-white bg-black rounded-full absolute ${
              open ? "md:-left-14 -left-3" : "left-0 hidden"
            } top-1/2 -translate-y-1/2 z-10 flex justify-center items-center`}
          >
            <IoIosArrowBack className="text-xl font-bold" />
          </div>
          <div
            ref={navigationNextRef}
            className={`w-10 h-10 lg:cursor-pointer text-white bg-black rounded-full absolute ${
              open ? "md:-right-14 -right-3" : "right-0 hidden"
            } top-1/2 -translate-y-1/2 z-10 flex justify-center items-center`}
          >
            <IoIosArrowForward className="text-xl font-bold" />
          </div>

          <Swiper
            modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={(swiper) => {
              // Delay execution for the refs to be defined
              swiper.on("slideChange", () => {
                setId(swiper.activeIndex);
              });
              setTimeout(() => {
                // // Override prevEl & nextEl now that refs are defined
                // swiper.params.navigation.prevEl = navigationPrevRef.current;
                // swiper.params.navigation.nextEl = navigationNextRef.current;
                // // Re-init navigation
                // swiper.navigation.destroy();
                // swiper.navigation.init();
                // swiper.navigation.update();
              });
            }}
            className="mySwiper relative"
          >
            {product?.image?.map((item: any) => (
              <SwiperSlide key={item?.id}>
                <img
                  onClick={() => setOpen(true)}
                  className="h-auto min-w-full"
                  src={productImg + (id !== null ? images[id] : item)}
                  alt=""
                />
              </SwiperSlide>
            ))}
            {open && (
              <div className="flex items-center justify-between w-full bg-black text-white px-5 py-2">
                <p className="truncate">{product?.name}</p>
                <p className="w-48 text-right">
                  {id + 1} of {images.length}
                </p>
              </div>
            )}
          </Swiper>
        </div>

        {/* images  */}
        {!open && (
          <div className="relative w-full col-span-5 h-20 max-w-[300px] mx-auto">
            <Slider
              {...settingsSmall}
              ref={customSlider}
              className="relative group h-full w-full "
            >
              {images?.slice(0, 10).map((item, index) => (
                <div key={index}>
                  <img
                    onClick={() => {
                      setActiveMbl(index);
                      setId(index);
                    }}
                    className={`${
                      activeMbl === index ? "active-img-mbl " : ""
                    } h-auto min-w-full bg-gray-100 border focus:outline-none`}
                    src={productImg + item}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
            {images.length > 4 && (
              <div>
                <BsFillArrowDownSquareFill
                  className="absolute -rotate-90 right-0 top-[50%] -translate-y-[50%] z-10 text-3xl arrow-slick-color"
                  onClick={() => goNext()}
                />
                <BsFillArrowUpSquareFill
                  className="absolute -rotate-90 left-0 z-10 text-3xl top-[50%] -translate-y-[50%] arrow-slick-color"
                  onClick={() => goPrev()}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
