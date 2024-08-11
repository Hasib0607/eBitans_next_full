import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoOne = ({ banner }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <a href={banner[0]?.link} target="_blank" rel="noopener noreferrer">
        <img
          src={bannerImg + banner[0]?.image}
          alt=""
          className="min-w-full object-cover h-auto object-center"
        />
      </a>
    </div>
  );
};

export default PromoOne;
