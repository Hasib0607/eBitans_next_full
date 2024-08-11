import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoBottomThirtySix = ({ banner }: any) => {
  return (
    <>
      {banner[3] && (
        <div className="sm:container px-5 sm:py-10 py-5">
          <div className="relative overflow-hidden">
            <img
              alt="gallery"
              className="w-full object-cover object-center block h-auto"
              src={bannerImg + banner[3].image}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PromoBottomThirtySix;
