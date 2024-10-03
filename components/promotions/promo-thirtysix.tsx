import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoThirtySix = ({ banner, design }: any) => {
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
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {banner.slice(0, 3).map((ban: any) => (
            <div key={ban?.id} className="relative overflow-hidden">
              <img
                alt="gallery"
                className="w-full object-cover object-center block h-auto"
                src={bannerImg + ban?.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoThirtySix;
