import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";
import MobileAppIcon from "./mobile-app-icon";

const PromoBottomThirtyFive = ({ banner }: any) => {
  return (
    <>
      {banner[1] && (
        <div className="sm:container px-5 sm:py-10 py-5">
          <div className="">
            {banner.slice(1, 2).map((ban: any) => (
              <div key={ban?.id} className="relative overflow-hidden">
                <img
                  alt="gallery"
                  className="w-full object-cover object-center block h-auto"
                  src={bannerImg + ban?.image}
                />
              </div>
            ))}
          </div>
          <MobileAppIcon />
        </div>
      )}
    </>
  );
};

export default PromoBottomThirtyFive;
