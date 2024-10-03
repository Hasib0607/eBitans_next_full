import React from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";

import "./promo-three.css";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoThree = ({ banner }: any) => {
  return (
    <div className="sm:py-10 py-5 sm:container px-5 xl:-mt-24">
      <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 ">
        {banner.slice(0, 3).map((ban: any, index: any) => (
          <a
            href={ban?.link}
            target="_blank"
            key={index}
            rel="noopener noreferrer"
          >
            <div
              key={ban.id}
              className="relative overflow-hidden shine-three shine-three-one"
            >
              {ban?.link && (
                <div className="flex lg:px-5 font-bold px-2 lg:py-2 py-1 text-white text-base w-max z-[1] absolute xl:bottom-20 lg:bottom-32 bottom-10 lg:cursor-pointer xl:left-[60px] lg:left-32 md:left-[120px] left-[60px] bg-transparent menu-hover duration-500 items-center space-x-1">
                  <h1 className="">SHOP NOW</h1>
                  <IoMdArrowDroprightCircle className="text-sm" />
                </div>
              )}
              <img
                alt="gallery"
                className="w-full object-cover object-center h-auto lg:cursor-pointer ease-in-out duration-700"
                src={bannerImg + ban.image}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PromoThree;
