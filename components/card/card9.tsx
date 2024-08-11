import React from "react";
import "./card9.css";

import { HiOutlineLink } from "react-icons/hi";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";

const Card9 = ({ item }: any) => {
  return (
    <Link href={`/category/${item.id}`}>
      {" "}
      <div className="group relative rounded-lg overflow-hidden bg-gray-200 w-full p-2 sm:py-6">
        <div className=" bg-gray-800 transition-all duration-500 ease-linear absolute bg-opacity-0 group-hover:bg-opacity-50 left-0 top-0 w-full h-full"></div>
        <div className="">
          <div className="h-full w-full">
            <div className="flex justify-center h-12 sm:max-h-[100px] sm:max-w-[100px] mx-auto">
              <img
                className="h-auto w-auto"
                src={iconImg + item?.icon}
                alt="Mountain"
              />
            </div>
          </div>
          <div className="h-full w-full flex font-seven font-semibold justify-center text-center mt-3 capitalize sm:text-base text-xs ">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
              {item?.name}
            </p>
          </div>
        </div>
        <div className=" text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-50 transition-all duration-300 ease-linear">
          <HiOutlineLink className="text-4xl" />
        </div>
      </div>
    </Link>
  );
};

export default Card9;
