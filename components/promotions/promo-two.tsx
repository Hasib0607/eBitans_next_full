import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoTwo = ({ banner }: any) => {
  return (
    <>
      <div className="sm:container px-5 sm:py-10 py-5">
        {banner?.slice(0, 1).map((b: any) => (
          <div key={b.id} className="relative overflow-hidden">
            <a href={b?.link} target="_blank" rel="noopener noreferrer">
              <img
                className="min-w-full object-cover min-h-20 max-h-60 hover:scale-105 ease-in-out duration-1000"
                src={bannerImg + b?.image}
                alt=""
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default PromoTwo;
