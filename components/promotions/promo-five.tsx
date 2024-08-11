import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoFive = ({ banner }: any) => {
  return (
    <div className="bg-white py-10">
      <div className="container px-5 bg-white">
        <div className="grid sm:grid-cols-2 gap-6">
          {banner.slice(0, 2).map((ban: any) => (
            <div key={ban.id} className="relative overflow-hidden">
              <img
                alt="gallery"
                className="min-h-[150px] min-w-full object-cover object-center hover:scale-105 ease-in-out duration-700"
                src={bannerImg + ban?.image}
              />
              <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                <div className="absolute menu-hover hover:underline hover:-translate-y-2 duration-300 hover:font-semibold bottom-10 left-10 uppercase text-sm font-medium text-white ">
                  Shop Now
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoFive;
