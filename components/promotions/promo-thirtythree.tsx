import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoThirtyThree = ({ banner }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5 bg-white">
      <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
        {banner.slice(0, 3).map((ban: any) => (
          <div key={ban?.id} className="relative overflow-hidden">
            <a href={`${ban?.link}`} target="_blank" rel="noopener noreferrer">
              <img
                alt="gallery"
                className="w-full object-cover object-center block h-auto hover:opacity-90 lg:cursor-pointer ease-in-out duration-700"
                src={bannerImg + ban.image}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoThirtyThree;
