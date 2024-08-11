import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoThirtyFive = ({ banner, design }: any) => {
  const styleCss = `
    .promo-bg {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 1px solid ${design?.text_color};
    }
    .shadow-banner{
        box-shadow: 5px 5px black,5px 5px 0 2px white;
    }
      `;

  return (
    <div className="">
      <style>{styleCss}</style>
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="">
          {banner.slice(0, 1).map((ban: any) => (
            <div key={ban?.id} className="relative overflow-hidden">
              <img
                alt="gallery"
                className="w-full object-cover object-center block h-auto"
                src={bannerImg + ban?.image}
              />
              <div className="absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white text-white flex flex-col items-center justify-center inset-0  lg:p-0 shadow-banner w-[90%] md:w-[60%] md:h-[60%] h-[70%]">
                <p className="text-sm lg:text-2xl md:text-lg font-bold text-center">
                  Shop The Best Collections
                </p>
                <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                  <button className="md:text-lg text-sm mt-2 md:mt-5 md:px-5 px-3 py-1 md:py-2 promo-bg shadow-[3px_3px_1px_1px_black] md:shadow-[5px_5px_1px_1px_black] hover:shadow-none duration-500">
                    Shop now
                  </button>
                </a>
              </div>
              <div className="bg-black absolute top-0 left-0 w-full h-full z-[1] bg-opacity-60"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoThirtyFive;
