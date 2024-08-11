"use client";
import useTheme from "@/hooks/use-theme";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Category = () => {
  const { category, subcategory, design, menu } = useTheme();

  const bgColor = design?.header_color;

  const [isHovering, setIsHovering] = useState<any>(-1);
  const [hoverMenu, setHoverMenu] = useState<any>(false);

  const handleMouseEnterMenu = (k: any) => {
    setHoverMenu(k);
  };

  const handleMouseEnterSub = (j: any) => {
    setIsHovering(j);
  };

  const handleMouseLeave = () => {
    setIsHovering(-1);
    setHoverMenu(-1);
  };

  return (
    <nav>
      <ul className="lg:flex lg:flex-row lg:gap-10 lg:justify-center  ">
        <li className="pb-0 font-bold flex items-center text-sm justify-between">
          <Link href="/" className="">
            <h1>Home</h1>
          </Link>
        </li>
        {category.slice(0, 6).map((item: any, i: any) => (
          <div key={item.id} className="group relative">
            <li className="py-7">
              <Link href={"/category/" + item?.id}>
                <h1
                  className={`flex group justify-between items-center group font-bold text-sm `}
                >
                  {item.name}
                </h1>
              </Link>
              {subcategory.map(
                (dataId: any) =>
                  item.id === Number(dataId.parent) && (
                    <ChevronDownIcon
                      key={dataId.id}
                      className="h-4 group-hover:rotate-180 transition-all duration-500  ease-linear lg:cursor-pointer absolute top-8 -right-5 "
                    />
                  )
              )}
            </li>

            <li className="absolute z-50 bg-gray-200 w-[250px] ">
              {subcategory.map((subItem: any, j: any) => (
                <div key={subItem.id}>
                  <div className="relative group-hover:block hidden">
                    {item.id === Number(subItem.parent) && (
                      <div className="-mt-3 px-6 py-4 text-md pt-8">
                        <Link href={"/category/" + subItem?.id}>
                          <h1
                            style={{
                              color: isHovering === j ? bgColor : "",
                            }}
                            onMouseEnter={() => handleMouseEnterSub(j)}
                            onMouseLeave={handleMouseLeave}
                            className="text-[#7a7a7a]"
                          >
                            {subItem.name}{" "}
                          </h1>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </li>
          </div>
        ))}

        <li className=" pb-0 group relative font-bold flex items-center text-sm justify-between">
          <Link href="/" className="">
            <h1>
              Pages{" "}
              <span>
                <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer absolute top-8 -right-5 " />
              </span>
            </h1>
          </Link>
          <div className="absolute z-50 group-hover:block hidden bg-gray-200 w-[250px] top-[75px] left-[-50%] lg:cursor-pointer">
            {menu.map((menuItem: any, k: any) => (
              <div key={menuItem.id} className="relative ">
                <div className="px-6 py-4 text-[#7a7a7a]">
                  <Link href={menuItem?.url}>
                    <h1
                      style={{
                        color: hoverMenu === k ? bgColor : "",
                      }}
                      onMouseEnter={() => handleMouseEnterMenu(k)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {menuItem.name}{" "}
                    </h1>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Category;
