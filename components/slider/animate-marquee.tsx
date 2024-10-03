import { brandImg } from "@/site-settings/siteUrl";
import React from "react";
import Marquee from "react-fast-marquee";

const AnimateMarquee = ({ brand }: any) => {
  return (
    <div className="py-3 bg-white">
      <Marquee>
        {brand?.map((item: any, index: any) => (
          <img
            key={index}
            src={brandImg + item?.image}
            alt=""
            className="h-40 px-10"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default AnimateMarquee;
