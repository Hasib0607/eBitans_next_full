"use client";
import useTheme from "@/hooks/use-theme";
import { iconImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import { useState } from "react";
import { BsGrid } from "react-icons/bs";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";

const HeaderFortyOneCategory = () => {
  const { category, design, menu, headerSetting } = useTheme();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [select, setSelect] = useState<any>("");

  const bgColor = design?.header_color;

  // Dynamic CSS styles for hover effects and borders
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
    .active-menu {
      color: ${design?.header_color}; /* Active link color */
    }
  `;

  return (
    <div className="relative">
      <style>{styleCss}</style>

      {/* Header Section */}
      <nav
        className="flex items-center justify-between px-8 py-2"
        style={{color: design?.text_color }}
      >
        {/* Header content */}
        <div className="flex items-center gap-5" style={{color: design?.header_color }}>
          <BsGrid className="text-xl" />
          <h1 className="font-bold text-sm">Shop By Category</h1>
        </div>

        {/* Menu links */}
        <div className="lg:flex lg:flex-row gap-5 xl:gap-10 lg:justify-center item-center">
          {menu?.map((menuData: any, index: number) => (
            <Link
              key={menuData?.id}
              href={"/" + menuData?.url}
              className={`font-bold text-sm ${activeMenuIndex === index ? "active-menu" : ""}`}
              onClick={() => setActiveMenuIndex(index)} // Update active menu index on click
            >
              <h1 className="flex group justify-between items-center font-bold text-sm">
                {menuData?.name}
              </h1>
            </Link>
          ))}
        </div>

        {/* Phone contact */}
        <a href={"tel:+88" + headerSetting?.phone}>
          <div className="flex items-center gap-2">
            <IoIosCall className="text-4xl" />
            <h1 className="text-xl">{headerSetting?.phone}</h1>
          </div>
        </a>
      </nav>

      {/* Categories Section */}
      <div className="absolute top-[4px] left-0 mt-16 bg-white shadow-lg h-[100vh] pb-16 w-96">
        <div className="flex flex-col py-4 px-4 h-[100%] overflow-y-auto">
          {category?.map((item: any) => (
            <CategoryWithSubCat
              key={item?.id}
              item={item}
              setSelect={setSelect}
              select={select}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderFortyOneCategory;


const CategoryWithSubCat = ({ item, select, setSelect }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <div className="w-full border-b">
        <div className="flex gap-8 items-center py-2 px-2">
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item?.id}
            className={`flex-1 flex items-center gap-2 text-lg ${
              select === item.id ? "text-red-500" : "text-gray-900"
            }`}
          >
            {/* Align icon and name in a row */}
            <img src={iconImg + item?.icon} className="h-8 w-8" alt="" />
            <p className="ml-5">{item.name}</p>
          </Link>
          {item?.cat ? (
            <div className="px-4 h-full">
              {show ? (
                <RiArrowDownSLine
                  onClick={() => setShow(!show)}
                  className="h-4 w-4 lg:cursor-pointer text-gray-800"
                />
              ) : (
                <RiArrowRightSLine
                  onClick={() => setShow(!show)}
                  className="h-4 w-4 lg:cursor-pointer text-gray-800"
                />
              )}
            </div>
          ) : null}
        </div>
        {show && (
          <>
            <div className="">
              {item?.cat?.map((sub: any, idx: any) => (
                <div className="border-b" key={idx}>
                  <Link
                    onClick={() => setSelect(sub.id)}
                    href={"/category/" + sub?.id}
                  >
                    <p
                      className={`py-1 px-4 pl-8 ${
                        select === sub.id ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {sub?.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
