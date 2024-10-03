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

export const HSlider = ({ product, setSizeId, sizeId }: any) => {
  const { design, store_id } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<any>(0);
  const [active, setActive] = useState(0);
  const [activeMbl, setActiveMbl] = useState(0);
  const [images, setImages] = useState([]);

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
     
    .arrow-slick-color {
        color:${design?.header_color};
    }
 

    `;
  // slider settings for image
  const settings = {
    infinite: images.length > 4 && true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // vertical: false,
    // verticalSwiping: true,
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

      <div className="grid grid-cols-1 w-full gap-5 ">
        {/* for images */}
        <div className="relative h-28 md:h-40 lg2:h-60 w-full order-last group">
          <Slider {...settings} ref={customeSlider} className="relative ">
            {images?.slice(0, 10).map((item, index) => (
              <div key={index} className="focus:outline-none px-2">
                <img
                  onClick={() => {
                    setActiveMbl(index);
                    setId(index);
                    setSizeId(null);
                  }}
                  className={`${
                    activeMbl === index
                      ? "active-img opacity-100"
                      : "opacity-50"
                  } h-auto w-full bg-gray-100 border border-gray-400 `}
                  src={productImg + item}
                  alt=""
                />
              </div>
            ))}
          </Slider>
          {images.length > 4 && (
            <div className="opacity-0 group-hover:opacity-100 duration-500">
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
            {store_id === 2875 ? (
              <img
                src={productImg + images[sizeId === null ? id : sizeId]}
                alt=""
                className="h-auto w-full"
              />
            ) : (
              <img
                src={productImg + images[id]}
                alt=""
                className="h-auto w-full"
              />
            )}
          </div>
          <div className="z-[2] search-color flex lg:cursor-pointer absolute top-3 right-3 cart-btn h-8 w-8 rounded-full  items-center justify-center">
            <FaSearch onClick={openModal} className="text-sm" />
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
                <Dialog.Panel className="h-full w-max mx-10 z-50 transform bg-transparent  text-left align-middle transition-all">
                  <div className="flex md:flex-row items-center flex-col-reverse gap-10 ">
                    <div className="flex md:flex-col gap-4 justify-between">
                      {images?.map((item, index) => (
                        <div key={index}>
                          <img
                            onClick={() => {
                              setActive(index);
                              setId(index);
                            }}
                            className={`${
                              active === index ? "active-img" : ""
                            } h-32 w-28 bg-gray-100 `}
                            src={productImg + item}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                    <div className="md:h-[700px] md:w-[800px] h-[450px] w-[450px] bg-gray-100 overflow-hidden">
                      <img
                        src={productImg + images[id]}
                        alt=""
                        className="h-full w-full"
                      />
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
