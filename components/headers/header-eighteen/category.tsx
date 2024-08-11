"use client";
import useTheme from "@/hooks/use-theme";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Category = ({ openMenu }: any) => {
  const { category, design, menu } = useTheme();

  const [active, setActive] = useState<any>();

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
      <ul className="flex lg:flex-row lg:gap-1 lg:justify-center flex-col  gap-3 mt-4 lg:mt-0">
        <li className="lg:py-2 uppercase flex items-center text-sm justify-between menu-hover ">
          <Link
            id="home"
            href="/"
            className={`px-4 ${active === "home" ? "active-menu" : ""} ${
              openMenu ? "text-menu" : ""
            }`}
            onClick={() => setActive("home")}
          >
            <h1>Home</h1>
          </Link>
        </li>
        {category.slice(0, 5).map((item: any) => (
          <div key={item.id} className="group relative">
            <li className={`lg:py-7 menu-hover  `}>
              <Link
                onClick={() => setActive(item.id)}
                href={"/category/" + item?.id}
              >
                <h1
                  className={`${
                    active === item.id ? "active-menu" : ""
                  } pb-0  group justify-between items-center group uppercase text-sm px-4 ${
                    openMenu ? "text-menu" : ""
                  } `}
                >
                  {item.name}
                </h1>
              </Link>
              {item.cat != null && (
                <ChevronDownIcon
                  className={` ${
                    openMenu ? "text-menu" : ""
                  } h-4 group-hover:rotate-180 transition-all duration-500  ease-linear lg:cursor-pointer absolute lg:top-7 top-2 right-0`}
                />
              )}
            </li>

            {item.cat != null && (
              <div className="lg:absolute z-50 bg-white py-2 text-gray-500 w-[250px] top-[74px] group-hover:block hidden">
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

        <li className="lg:relative group lg:py-2 lg:flex items-center justify-between  menu-hover">
          <div
            className={` ${
              openMenu ? "text-menu" : ""
            } text-sm px-4 uppercase relative lg:cursor-pointer`}
          >
            <h1>
              Pages{" "}
              <span>
                <ChevronDownIcon
                  className={` ${
                    openMenu ? "text-menu" : ""
                  } absolute lg:top-0 top-2 right-0  h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer inline`}
                />
              </span>
            </h1>
          </div>
          <div className="lg:absolute z-50 group-hover:block hidden bg-white py-2 text-gray-500 w-[250px] top-[74px] left-[-50%] lg:cursor-pointer">
            {menu.map((menuItem: any) => (
              <div key={menuItem.id} className="relative ">
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
                      {menuItem.name === "Home" ? null : menuItem.name}
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
