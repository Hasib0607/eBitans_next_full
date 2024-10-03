"use client";
import useTheme from "@/hooks/use-theme";
import { iconImg } from "@/site-settings/siteUrl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { FiHeadphones } from "react-icons/fi";

const HeaderElevenCategory = () => {
  const { category, design, menu, headerSetting } = useTheme();
  const [visible, setVisible] = useState(false); // Initialize dropdown as hidden
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null); // Add a ref for the button

  // Toggle the visibility of the dropdown
  const visibleBtn = () => {
    setVisible(!visible);
  };

  // Handle clicks outside the dropdown and button to close the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside the dropdown and button
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setVisible(false); // Close the dropdown if the click is outside
    }
  };

  // Add event listener for clicks outside when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  `;

  return (
    <nav className="sm:container px-5">
      <style>{styleCss}</style>
      <div>
        <div className="flex items-center xl:gap-10 justify-between">
          {/* Dropdown button */}
          <div
            ref={buttonRef} // Attach ref to the button
            className="relative group h-[50px] flex items-center py-4 px-8 lg:cursor-pointer justify-between rounded-lg"
            onClick={visibleBtn} // Toggle visibility on click
            style={{
              background: design?.header_color,
              color: design?.text_color,
            }}
          >
            <div className="flex items-center font-bold text-sm gap-x-1">
              <BsGrid className="inline" />
              <h1>Browse All Categories</h1>
              <ChevronDownIcon
                className={`h-4 transition-all duration-500 ease-linear ${
                  visible ? "rotate-180" : "rotate-0"
                } inline`}
              />
            </div>

            {/* Dropdown menu */}
            <div
              ref={dropdownRef} // Attach ref to the dropdown for click detection
              className="absolute z-20 shadow-md rounded-lg bg-white w-[550px] top-[75px] left-0"
              style={{ display: visible ? "block" : "none" }} // Toggle visibility based on state
            >
              <div className="relative z-50">
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  {/* Dynamically render category links */}
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

          {/* Menu links */}
          <div className="lg:flex lg:flex-row gap-5 xl:gap-10 lg:justify-center item-center">
            {menu?.map((menuData: any) => {
              return (
                <Link
                  key={menuData?.id}
                  href={"/" + menuData?.url}
                  className="font-bold text-sm "
                >
                  <h1 className="flex group justify-between items-center font-bold text-sm">
                    {menuData?.name}
                  </h1>
                </Link>
              );
            })}
          </div>

          {/* Phone contact */}
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
