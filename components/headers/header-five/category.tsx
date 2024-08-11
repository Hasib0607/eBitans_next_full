"use client";
import useTheme from "@/hooks/use-theme";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Category = ({ openMenu }: any) => {
  const { category, design, menu } = useTheme();

  const [active, setActive] = useState();

  const bgColor = design?.header_color;

  const styleCss = `
    .menu-hover:hover {
      color:  ${bgColor};
  }
    .active-menu {
      color:  ${bgColor};
  }
    .text-menu {
      color:  ${design?.text_color};
  }
 
    `;

  return (
    <nav>
      <style>{styleCss}</style>
      <ul className="flex lg:flex-row lg:gap-1 lg:justify-center flex-col gap-3 mt-4 lg:mt-0">
        {category.slice(0, 4).map((item: any) => (
          <div key={item.id} className="group relative">
            <Link
              className="menu-hover"
              onClick={() => setActive(item.id)}
              href={"/category/" + item?.id}
            >
              <li
                className={`lg:py-7 px-4 ${openMenu ? "text-menu" : ""} ${
                  active === item.id ? "active-menu" : ""
                } `}
              >
                <h1
                  className={`pb-0  group justify-between items-center group uppercase text-sm  `}
                >
                  {item.name}
                </h1>
                {item.cat != null && (
                  <ChevronDownIcon
                    className={` h-4 group-hover:rotate-180 transition-all duration-500  ease-linear lg:cursor-pointer absolute lg:top-7 top-2 right-0`}
                  />
                )}
              </li>
            </Link>

            {item.cat != null && (
              <div className="lg:absolute z-50 bg-white py-2 text-gray-500 w-[250px] top-[76px] group-hover:block hidden">
                {item?.cat?.map((subItem: any) => (
                  <div key={subItem.id}>
                    <div className="relative ">
                      <div className="px-6 py-1">
                        <Link
                          onClick={() => setActive(subItem.id)}
                          href={"/category/" + subItem?.id}
                        >
                          <h1
                            className={`${
                              active === subItem.id ? "active-menu" : ""
                            } menu-hover `}
                          >
                            {subItem.name}{" "}
                          </h1>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <li className="lg:relative group lg:py-2 lg:flex items-center justify-between">
          <div
            className={` ${
              openMenu ? "" : "menu-hover"
            } text-sm px-4 uppercase relative lg:cursor-pointer`}
          >
            <h1>
              Pages{" "}
              <span>
                <ChevronDownIcon
                  className={` absolute lg:top-0 top-2 right-0  h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer inline`}
                />
              </span>
            </h1>
          </div>
          <div className="lg:absolute z-50 group-hover:block hidden bg-white text-gray-500 w-[250px] top-[76px] left-[-50%] lg:cursor-pointer">
            {menu.map((menuItem: any) => (
              <div key={menuItem.id} className="relative">
                <div className="px-6 py-1 menu-hover">
                  <Link
                    onClick={() => setActive(menuItem.id)}
                    href={menuItem?.url}
                  >
                    <h1
                      className={`${
                        active === menuItem.id ? "active-menu" : ""
                      } `}
                    >
                      {menuItem.name === "Home" ? " " : menuItem.name}{" "}
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
