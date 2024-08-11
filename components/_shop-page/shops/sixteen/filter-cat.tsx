"use client";
import useTheme from "@/hooks/use-theme";
import { iconImg } from "@/site-settings/siteUrl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

const FilterCat = () => {
  const { category, subcategory } = useTheme();
  const [heading, setHeading] = useState("");

  return (
    <nav>
      <ul className="flex flex-col gap-8 pt-32 z-[4]">
        {category.map((item: any) => (
          <div key={item.id} className="relative">
            <li
              onClick={() => {
                heading !== item.name ? setHeading(item.name) : setHeading("");
              }}
              className="group relative flex items-center justify-between "
            >
              <Link
                className="flex gap-3 items-center"
                href={"/category/" + item?.id}
              >
                <img className="h-5" src={iconImg + item.icon} alt="" />
                <h1
                  className={`menu-hover flex items-center group hover:font-bold sm:text-lg text-xs`}
                >
                  {item.name}
                </h1>
              </Link>
              {subcategory.map((dataId: any) => (
                <div key={dataId.id}>
                  {item.id === Number(dataId.parent) && (
                    <ChevronDownIcon
                      className={`${
                        heading === item.name ? "rotate-180" : "rotate-0"
                      } h-4 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-4 top-1 `}
                    />
                  )}
                </div>
              ))}
            </li>

            <li className="z-[4] bg-white w-full lg:cursor-pointer">
              {subcategory.map((subItem: any) => (
                <div key={subItem.id} className="relative">
                  {item.id === Number(subItem.parent) && (
                    <div
                      className={` pl-5 py-3  ${
                        heading === item.name ? "block" : "hidden"
                      }`}
                    >
                      <Link href={"/category/" + subItem?.id}>
                        <h1 className="menu-hover capitalize hover:font-bold text-sm">
                          {subItem.name}{" "}
                        </h1>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default FilterCat;
