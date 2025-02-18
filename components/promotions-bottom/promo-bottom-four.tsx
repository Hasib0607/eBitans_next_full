import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";
import MobileAppIcon from "./mobile-app-icon";

const PromoBottomFour = ({ banner }: any) => {
  return (
    <>
      {banner[3] && (
        <div className="sm:container px-5 sm:py-10 py-5">
          <div className="relative group">
            <img
              src={bannerImg + banner[3]?.image}
              alt=""
              className="min-w-full object-cover h-auto object-center rounded-md"
            />
            {banner[3]?.link && (
              <a
                href={banner[3]?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute z-[1] left-1/2 -translate-x-1/2 bottom-[10%] font-bold bg-black text-white px-10 py-2 text-sm rounded-sm border-2 duration-500 border-black hover:bg-white hover:text-black w-max"
              >
                Go To Collection
              </a>
            )}
          </div>
          <MobileAppIcon />
        </div>
      )}
    </>
  );
};

export default PromoBottomFour;
