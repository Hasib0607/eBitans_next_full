import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

const PromoTwentyOne = ({ banner }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="">
        <div className="grid md:grid-cols-2 gap-6">
          {banner.slice(0, 2).map((ban: any) => (
            <div key={ban.id} className="relative overflow-hidden rounded-lg">
              {ban?.link && (
                <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex font-twelve lg:px-5 px-2 lg:py-2 py-1 text-black lg:text-lg text-xs shop-link w-max z-[5] absolute xl:bottom-12 menu-hover bottom-10 lg:cursor-pointer left-[40px] duration-500 items-center space-x-1">
                    <h1 className="">
                      Buy now <BiRightArrowAlt className="inline" />
                    </h1>
                  </div>
                </a>
              )}
              <img
                alt="gallery"
                className="min-w-full overflow-hidden object-cover object-center h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                src={bannerImg + ban.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoTwentyOne;
