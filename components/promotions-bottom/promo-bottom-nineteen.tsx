import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

const PromoBottomNineteen = ({ banner }: any) => {
  return (
    <div className="">
      {banner.slice(2, 3).map((item: any) => (
        <div key={item?.id} className="relative group">
          <img
            className="max-h-[430px] min-w-[100%] object-cover"
            src={bannerImg + item.image}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default PromoBottomNineteen;
