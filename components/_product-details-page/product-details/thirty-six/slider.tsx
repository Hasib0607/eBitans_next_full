"use client";
import React, { createRef, useEffect } from "react";
import { useState } from "react";
// import "./style.css";
import Slider from "react-slick";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import ImageZoom from "../image-zoom";

export const HSlider = ({ product }: any) => {
  const { design } = useTheme();

  const [id, setId] = useState<any>(0);
  const [activeMbl, setActiveMbl] = useState(0);
  const [images, setImages] = useState([]);

  //creating the ref
  const customeSlider = createRef<any>();
  const customSlider = createRef<any>();

  // setting slider configurations
  // const [sliderSettings, setSliderSettings] = useState({
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 2,
  //     slidesToScroll: 2,
  //     arrows: false,
  // })

  // slider navigation button
  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
  };
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
  // slider settings for image
  const settings = {
    infinite: images.length > 4 && true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    },
  };
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

      <div className="flex sm:grid grid-cols-5 gap-y-3 flex-col-reverse justify-start sm:flex-row gap-x-5 overflow-hidden">
        {/* for large device  */}
        <div className="relative sm:flex flex-col justify-center items-center hidden w-full max-h-[450px] xl2:max-h-[600px] overflow-hidden">
          <Slider
            {...settings}
            ref={customeSlider}
            className="relative group w-full flex flex-col justify-center items-center min-h-[300px] overflow-hidden"
          >
            {images?.slice(0, 10).map((item, index) => (
              <div key={index}>
                <img
                  onClick={() => {
                    setActiveMbl(index);
                    setId(index);
                  }}
                  className={`${
                    activeMbl === index
                      ? "active-img-mbl opacity-100"
                      : "opacity-50"
                  } min-h-full min-w-full bg-gray-100 border border-transparent  overflow-hidden`}
                  src={productImg + item}
                  alt=""
                />
              </div>
            ))}
          </Slider>
          {images.length > 4 && (
            <div>
              <BsFillArrowDownSquareFill
                className="absolute bottom-3 left-[50%] -translate-x-[50%] z-10 text-3xl arrow-slick-color lg:cursor-pointer"
                onClick={() => gotoNext()}
              />
              <BsFillArrowUpSquareFill
                className="absolute top-3 z-10 text-3xl left-[50%] -translate-x-[50%] arrow-slick-color lg:cursor-pointer"
                onClick={() => gotoPrev()}
              />
            </div>
          )}
        </div>

        {/* for small device  */}
        <div className="relative sm:hidden">
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
                  } h-auto min-w-full bg-gray-100 border border-transparent focus:outline-none`}
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

        {/* selected image show  */}
        <div className="relative z-[1] col-span-4 overflow-hidden">
          <div className="sm:hidden h-full w-full">
            <img
              src={productImg + images[id]}
              alt=""
              className="h-auto min-w-full"
            />
          </div>
          <div className="sm:block hidden sm:cursor-zoom-in relative">
            <ImageZoom img={productImg + images[id]} />
          </div>
        </div>
      </div>
    </div>
  );
};
