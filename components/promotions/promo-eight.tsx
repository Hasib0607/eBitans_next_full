import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoEight = ({ banner }: any) => {
  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      <div className="">
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-8 px-6'> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {banner?.slice(0, 3).map((banner: any) => (
            <div key={banner.id} className="w-full h-full overflow-hidden">
              <img
                className="h-auto min-w-full object-cover object-center hover:scale-[1.03] transition-all duration-200 ease-in"
                src={bannerImg + banner.image}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoEight;
