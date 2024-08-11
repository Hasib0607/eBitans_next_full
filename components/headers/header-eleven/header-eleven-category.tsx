"use client";
import React, { useState } from "react";
import { FiHeadphones } from "react-icons/fi";
import { BsGrid } from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { iconImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const HeaderElevenCategory = () => {
  const { category, design, menu, headerSetting } = useTheme();
  const [visible, setVisible] = useState(true);
  const visibleBtn = () => {
    setVisible(!visible);
  };
  const bgColor = design?.header_color;

  const styleCss = `
    .menu-hover:hover {
      color:  ${bgColor};
  }
    .search-border {
      border: 2px solid ${bgColor};
  }
    .search-border:focus {
      border: 2px solid ${bgColor};
  }
 
    `;

  return (
    <nav className="sm:container px-5">
      <style>{styleCss}</style>
      <div className="">
        <div className="flex items-center xl:gap-10 justify-between">
          <div
            className="relative group  h-[50px]  flex items-center py-4 px-8 lg:cursor-pointer justify-between rounded-lg"
            onClick={visibleBtn}
            style={{
              background: design?.header_color,
              color: design?.text_color,
            }}
          >
            <div className="flex items-center font-bold text-sm gap-x-1">
              <BsGrid className="inline" />
              <h1>Browse All Categories</h1>
              <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer inline " />
            </div>
            <div
              className="absolute  z-20 group-hover:block  shadow-md rounded-lg bg-white w-[550px] top-[75px] left-0 lg:cursor-pointer"
              style={{ display: visible === true ? "none" : "block" }}
            >
              <div className="relative z-50">
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  {category?.map((data: any) => (
                    <Link href={"/category/" + data?.id} key={data?.id}>
                      <div className="flex border rounded-md hover:shadow-md gap-8 items-center py-2 px-2">
                        <img
                          src={iconImg + data?.icon}
                          className="h-12"
                          alt=""
                        />
                        <h1 className="text-black">{data?.name}</h1>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:flex lg:flex-row gap-5 xl:gap-10 lg:justify-center item-center">
            {menu?.map((menuData: any) => {
              return (
                <Link
                  key={menuData?.id}
                  href={menuData?.url}
                  //   style={({ isActive }: any): any =>
                  //     isActive
                  //       ? {
                  //           color: `${design?.header_color}`,
                  //         }
                  //       : { color: `black` }
                  //   }
                  className="font-bold text-sm "
                >
                  <h1
                    className={`flex group justify-between items-center group font-bold text-sm `}
                  >
                    {menuData?.name}
                  </h1>
                </Link>
              );
            })}
          </div>
          <a href={"tel:+88" + headerSetting?.phone}>
            <div className="flex items-center gap-2">
              <FiHeadphones className="text-4xl" />
              <h1 className="text-xl">{headerSetting?.phone}</h1>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default HeaderElevenCategory;
