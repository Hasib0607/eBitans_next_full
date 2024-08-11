import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

const PromoTwentyThree = ({ banner }: any) => {
  return (
    <div className="bg-white py-10">
      <div className="">
        {banner.slice(0, 1).map((ban: any) => (
          <div key={ban.id} className="relative overflow-hidden ">
            <a href={ban?.link} target="_blank" rel="noopener noreferrer">
              <h1 className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 bottom-10 sm:right-[25%] sm:bottom-[30%] px-5 lg:py-2 py-2 btn-slider duration-300 lg:text-lg text-xs text-center w-max mx-auto lg:cursor-pointer uppercase font-medium">
                Shop Now <BiRightArrowAlt className="inline" />
              </h1>
            </a>
            <img
              alt="gallery"
              className="min-w-full h-auto"
              src={bannerImg + ban.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoTwentyThree;
