import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoTwenty = ({ banner }: any) => {
  return (
    <div className="bg-white ">
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 justify-center sm:justify-between gap-4">
          {banner?.slice(0, 2).map((item: any) => (
            <div
              key={item?.id}
              className="h-auto min-w-full w-full overflow-hidden"
            >
              <a href={item?.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={bannerImg + item?.image}
                  alt=""
                  className="min-w-full h-auto object-cover hover:scale-[1.06] transition-all duration-300  ease-linear"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoTwenty;
