"use client";
import useTheme from "@/hooks/use-theme";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

const SideCategory = () => {
  const { category, subcategory, design } = useTheme();
  const [heading, setHeading] = useState("");

  const styleCss = `
    .menu-hover:hover {
        color:  ${design?.header_color};
    }
    .submenu-hover:hover {
        color:  ${design?.header_color};
        margin-left:10px;
        
    }
`;

  return (
    <nav>
      <style>{styleCss}</style>
      <ul className="flex flex-col gap-3">
        {category.map((item: any) => (
          <div key={item.id} className="relative">
            <li
              onClick={() => {
                heading !== item.name ? setHeading(item.name) : setHeading("");
              }}
              className="group menu-hover relative flex items-center justify-between "
            >
              <Link href={"/category/" + item?.id}>
                <h1
                  className={` flex uppercase items-center group font-medium text-base`}
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
                      } h-4 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-5 top-2 `}
                    />
                  )}
                </div>
              ))}
            </li>

            <li className="z-50 bg-white w-full lg:cursor-pointer">
              {subcategory.map((subItem: any) => (
                <div key={subItem.id} className="relative">
                  {item.id === Number(subItem.parent) && (
                    <div
                      className={`pl-5 text-base submenu-hover py-1 duration-500  ${
                        heading === item.name ? "block" : "hidden"
                      }`}
                    >
                      <Link href={"/category/" + subItem?.id}>
                        <h1>{subItem.name} </h1>
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

export default SideCategory;
