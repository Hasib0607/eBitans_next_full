"use client";
import React, { createRef, useEffect } from "react";
import { useState } from "react";
// import "./style.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Slider from "react-slick";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import ImageZoom from "../image-zoom";

export const HSlider = ({ product }: any) => {
  const { design } = useTheme();

  const [isOpen, setIsOpen] = useState<any>(false);
  const [id, setId] = useState<any>(0);
  const [active, setActive] = useState<any>(0);
  const [activeMbl, setActiveMbl] = useState<any>(0);
  const [images, setImages] = useState<any>([]);

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
            {images?.slice(0, 10).map((item: any, index: any) => (
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
            {images?.slice(0, 10).map((item: any, index: any) => (
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
            <div className="z-[2] search-color flex lg:cursor-pointer absolute top-3 right-3 bg-white h-8 w-8 rounded-full  items-center justify-center">
              <MdOutlineZoomOutMap onClick={openModal} className="text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* modal image show  */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-full w-max mx-10 z-50 transform bg-transparent container text-left align-middle transition-all">
                  <div className="flex items-center flex-col-reverse gap-y-10 h-[90vh]">
                    <div className="flex gap-4 justify-between">
                      {images?.map((item: any, index: any) => (
                        <div key={index}>
                          <img
                            onClick={() => {
                              setActive(index);
                              setId(index);
                            }}
                            className={`${
                              active === index ? "active-img" : ""
                            } max-h-32 w-auto bg-gray-100 `}
                            src={productImg + item}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-100 overflow-hidden relative">
                      <img
                        src={productImg + images[id]}
                        alt=""
                        className="h-auto min-w-full"
                      />
                      <div
                        onClick={closeModal}
                        className="fixed -top-3 right-0 lg:cursor-pointer h-6 w-6 rounded-full bg-red-500 flex justify-center items-center z-[1]"
                      >
                        <CgClose className="text-lg font-medium text-white" />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
