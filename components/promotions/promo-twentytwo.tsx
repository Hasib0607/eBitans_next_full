import React from "react";

import { AiOutlineArrowRight } from "react-icons/ai";
import "./promo-twentytwo.css";
import { bannerImg } from "@/site-settings/siteUrl";
const PromoTwentyTwo = ({ banner }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      {banner.slice(0, 1).map((item: any, index: number) => (
        <div className="relative group mt-5" key={index}>
          <img
            className="h-auto w-[100%]"
            src={bannerImg + item.image}
            alt=""
          />

          <div className="absolute w-max z-[1] top-[40%] xl:top-[40%] lg:top-[50%] md:top-[45%] left-[50%] xl:left-[80%] lg:left-[80%] md:left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <h1 className="text-md xl:text-5xl lg:text-4xl md:text-3xl font-medium text-black text-3xl ">
              shopping everyday{" "}
            </h1>
            <div className="flex justify-end mt-5">
              <div
                className="w-[25%]"
                style={{ border: "2px solid black" }}
              ></div>
            </div>
            <div className="text-right">
              <button className=" md:px-10 px-5 md:py-3 py-2 mt-4 bg-black  hover:bg-gray-300 text-white font-semibold text-sm">
                subscribe{" "}
                <AiOutlineArrowRight className="text-white inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {banner.slice(1, 2).map((item: any, index: number) => (
        <div className="relative group mt-5" key={index}>
          <img
            className="h-auto w-[100%]"
            src={bannerImg + item.image}
            alt=""
          />
          <div className="absolute w-max z-[1] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <h1 className="text-md xl:text-8xl lg:text-8xl md:text-5xl font-medium text-black text-5xl twentytwoFont">
              {" "}
              shopping everyday{" "}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoTwentyTwo;
