import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";
import MobileAppIcon from "./mobile-app-icon";

const PromoBottomThirtySeven = ({ banner }: any) => {
  return (
    <>
      {banner[2] && (
        <div className="bg-white">
          <div className="sm:container px-5 sm:py-10 py-5">
            <div className="grid sm:grid-cols-2 gap-6">
              {banner.slice(2, 4).map((ban: any) => (
                <div key={ban?.id} className="relative overflow-hidden">
                  <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                    <img
                      alt="gallery"
                      className="min-w-full h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                      src={bannerImg + ban?.image}
                    />
                  </a>
                </div>
              ))}
            </div>
            <MobileAppIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default PromoBottomThirtySeven;
