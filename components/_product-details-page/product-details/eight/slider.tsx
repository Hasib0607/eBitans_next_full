"use client";
import React, { createRef, useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Slider from "react-slick";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";

import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/slick-carousel/slick/slick-theme.css";

export const HSlider = ({ product, variant, activeImg, setActiveImg }: any) => {
  const { design } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);
  const [active, setActive] = useState(0);
  const [activeMbl, setActiveMbl] = useState(0);
  const [images, setImages] = useState<any>([]);

  //creating the ref
  const customeSlider = createRef<any>();

  // slider navigation button
  const gotoNext = () => {
    customeSlider.current.slickNext();
  };

  const gotoPrev = () => {
    customeSlider.current.slickPrev();
  };

  // for image
  useEffect(() => {
    const arr = product?.image;

    let variantImages;
    if (variant?.length > 0) {
      variantImages = variant.map((v: any) => v.image);
    }
    if (arr === undefined) return;
    setImages([...arr, ...(variantImages || [])]);
  }, [product?.image]);

  // for modal open
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // style css
  const styleCss = `

    .icon-color:hover {
        color:${design?.header_color};
        }
        .active-img {
        border:  1px solid ${design?.header_color};
     
    }
     
    .arrow-slick-color {
        color:${design?.header_color};
    }
 

    `;
  // slider settings for image
  const settings = {
    infinite: images.length > 5 && true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: false,
    // verticalSwiping: true,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    },
  };

  console.log(images, "images");
  return (
    <div>
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 w-full gap-5 ">
        {/* for small images */}
        <div className="relative h-full w-full  order-last group ">
          <Slider {...settings} ref={customeSlider} className="relative ">
            {images?.slice(0, 10).map((item: any, index: any) => (
              <div key={index} className="focus:outline-none px-2 ">
                <img
                  onClick={() => {
                    setActiveMbl(index);
                    setId(index);
                    setActiveImg("");
                  }}
                  className={`${
                    activeMbl === index ? "active-img " : ""
                  } xl:h-24 h-auto w-full xl:w-[98px] object-cover object-center bg-gray-100 border border-gray-400 `}
                  src={productImg + item}
                  alt=""
                />
              </div>
            ))}
          </Slider>
          {images.length > 4 && (
            <div className="lg:opacity-0 group-hover:opacity-100 duration-500">
              <BsFillArrowDownSquareFill
                className="absolute -rotate-90 right-0 top-[50%] -translate-y-[50%] z-10 text-3xl arrow-slick-color"
                onClick={() => gotoNext()}
              />
              <BsFillArrowUpSquareFill
                className="absolute -rotate-90 left-0 z-10 text-3xl top-[50%] -translate-y-[50%] arrow-slick-color"
                onClick={() => gotoPrev()}
              />
            </div>
          )}
        </div>

        {/* selected image show  */}
        <div className="relative z-[1] w-full">
          <div className="h-full w-full">
            <img
              src={
                !activeImg ? productImg + images[id] : productImg + activeImg
              }
              alt=""
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
