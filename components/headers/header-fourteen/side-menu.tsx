"use client";
import useTheme from "@/hooks/use-theme";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import SideCategory from "./side-category";

const SideMenu = ({ setOpen }: any) => {
  const { menu, design } = useTheme();
  const [heading, setHeading] = useState("");

  const styleCss = `
    .text-hover:hover {
      color: ${design?.header_color}; 
    }
  
  }
  `;

  return (
    <div>
      <style>{styleCss}</style>
      <div>
        <ul className="flex flex-col ">
          {menu?.map((item: any) => (
            <div
              onClick={() => setOpen(false)}
              key={item.id}
              className="py-3 border-b-[1px] relative"
            >
              <li
                className=""
                onClick={() => {
                  heading !== item.name
                    ? setHeading(item.name)
                    : setHeading("");
                }}
              >
                <Link href={item?.url}>
                  <h1 className=" w-max uppercase font-semibold text-lg text-hover">
                    {item.name}
                  </h1>
                </Link>
              </li>
              {item.url === "category" && (
                <ChevronDownIcon
                  onClick={() => {
                    heading !== item.name
                      ? setHeading(item.name)
                      : setHeading("");
                  }}
                  className={`${
                    heading === item.name ? "rotate-180" : "rotate-0"
                  } h-5 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-4 top-4 `}
                />
              )}
              <div className={`${heading === item.name ? "block" : "hidden"}`}>
                {item.url === "category" ? <SideCategory /> : ""}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
