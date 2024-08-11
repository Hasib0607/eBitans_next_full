import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import React from "react";

const Card62 = ({ item }: any) => {
  return (
    <div className="group overlay-group relative">
      <Link href={`/category/${item.id}`}>
        <div className="">
          <div className="relative">
            <div className="relative z-[1] overflow-hidden w-full h-full px-6 border border-black shadow-[5px_5px_1px_1px_black]">
              <img
                src={catImg + item?.banner}
                alt=""
                className="h-auto min-w-full object-center object-cover"
              />
            </div>
          </div>

          <div className="font-medium text-center mt-5">
            <h1 className="text-black text-lg md:text-2xl capitalize">
              {item?.name}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card62;
