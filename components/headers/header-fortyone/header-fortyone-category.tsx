"use client";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import { useState } from "react";
import { BsGrid } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import CategoryWithSubCat from "./category-with-subcat";

const HeaderFortyOneCategory = () => {
  const { category, design, menu, headerSetting } = useTheme();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [select, setSelect] = useState<any>("");
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null); // Track expanded category

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
        style={{ color: design?.text_color }}
      >
        {/* Header content */}
        <div
          className="flex items-center gap-5"
          style={{ color: design?.header_color }}
        >
          <BsGrid className="text-xl" />
          <h1 className="font-bold text-sm">Shop By Category</h1>
        </div>

        {/* Menu links */}
        <div className="lg:flex lg:flex-row gap-5 xl:gap-10 lg:justify-center item-center">
          {menu?.map((menuData: any, index: number) => (
            <Link
              key={menuData?.id}
              href={"/" + menuData?.url}
              className={`font-bold text-sm ${
                activeMenuIndex === index ? "active-menu" : ""
              }`}
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
        <div className="flex flex-col py-4 px-4 h-[100%] overflow-y-auto pt-0">
          {category?.map((item: any) => (
            <CategoryWithSubCat
              key={item?.id}
              item={item}
              setSelect={setSelect}
              select={select}
              expandedCategory={expandedCategory}
              setExpandedCategory={setExpandedCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderFortyOneCategory;
