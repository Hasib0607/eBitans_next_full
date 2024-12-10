"use client";
import { imgUrl } from "@/site-settings/siteUrl";
import { TableCellsIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import SideMenu from "../header-three/side-menu";
import HeaderElevenCategory from "./header-fortyone-category";
import HeaderElevenHeaderMenu from "./header-fortyone-headermenu";
import "./header-fortyone.css";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderFortyOne = ({ headerSetting }: any) => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const changeNavbar = () => {
    if (window.scrollY >= 140) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const handleClick = () => {
    if (window !== undefined) {
      window.localStorage.removeItem("persist:root");

      window.location.href = "/";
    }
  };

  return (
    <div className="pb-0">
      <div className="lg:block hidden ">
        <HeaderElevenHeaderMenu />
      </div>
      <div className="bg-white border lg:block hidden w-full ">
        <div className={`${openMenu && "navbarEleven openMenuEleven"} py-2`}>
          <HeaderElevenCategory />
        </div>
      </div>

      {/* sticky navbar  */}

      {/* tablet and mobile view  */}

      <div
        className={`px-5 py-2 lg:py-0 lg:hidden ${
          openMenu && "navbarEleven openMenuEleven"
        }`}
      >
        <div className="flex justify-between items-center mb-1 lg:hidden">
          <div onClick={() => setOpen(!open)}>
            <GiHamburgerMenu className="h-6" />
          </div>

          <div className="">
            <div className="ml-8">
              {headerSetting?.logo === null ? (
                <Link href="/">
                  <p className="text-xl uppercase">
                    {headerSetting?.website_name}
                  </p>
                </Link>
              ) : (
                <Link href="/">
                  <img
                    className="h-10"
                    src={imgUrl + headerSetting?.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* screen touch menu close  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      <div className="block px-4 lg:hidden">
        <ul
          className={`
                lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0  pb-5
                duration-1000 z-50 lg:cursor-pointer ${
                  open ? "left-0" : "left-[-120%]"
                }
                `}
        >
          <div className="flex py-4 z-50 justify-between items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ">
            <div>
              <Link href="/">
                <img
                  className="h-8"
                  src={imgUrl + headerSetting?.logo}
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <XMarkIcon
                onClick={() => setOpen(!open)}
                className="h-5 basis-2/4"
              />
            </div>
          </div>
          <div className="z-50 px-10">
            <SideMenu setOpen={setOpen} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderFortyOne;
