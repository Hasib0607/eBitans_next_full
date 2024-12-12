"use client";
import useTheme from "@/hooks/use-theme";
import { iconImg } from "@/site-settings/siteUrl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const SideCat = () => {
  const { category, subcategory } = useTheme();
  const [heading, setHeading] = useState("");

  return (
    <nav className="">
      <div className="flex flex-col gap-3 mt-16">
        {category?.map((item: any) => (
          <div key={item.id} className="relative z-[1]">
            <div
              onClick={() => {
                heading !== item.name ? setHeading(item.name) : setHeading("");
              }}
              className="group relative flex items-center justify-between "
            >
              <div className="flex items-center gap-x-2">
                <img
                  className="w-6 h-auto"
                  src={iconImg + item?.icon}
                  alt="catImage"
                />
                <Link href={"/category/" + item?.id}>
                  <h1
                    className={`menu-hover flex items-center group hover:font-bold text-sm`}
                  >
                    {item.name}
                  </h1>
                </Link>
              </div>
              {subcategory.map((dataId: any) => (
                <div key={dataId.id}>
                  {item.id === Number(dataId.parent) && (
                    <ChevronDownIcon
                      className={`${
                        heading === item.name ? "rotate-0" : "-rotate-90"
                      } h-4 absolute transition-all duration-500 ease-linear lg:cursor-pointer right-4 top-1 `}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="-z-[4] bg-white w-full lg:cursor-pointer">
              {subcategory.map((subItem: any) => (
                <div key={subItem.id} className="relative">
                  {item.id === Number(subItem.parent) && (
                    <div
                      className={` pl-5 py-1  ${
                        heading === item.name ? "block" : "hidden"
                      }`}
                    >
                      <Link href={"/category/" + subItem?.id}>
                        <h1 className="menu-hover capitalize hover:font-bold duration-300 text-xs">
                          {subItem.name}{" "}
                        </h1>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SideCat;
