"use client";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { CgShoppingBag } from "react-icons/cg";
import useTheme from "@/hooks/use-theme";
import {
  PhoneIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { BottomCart } from "../card-popup-three";
import { imgUrl } from "@/site-settings/siteUrl";
import { IoSearchCircleOutline } from "react-icons/io5";
import Search from "../header-seven/search";

const HeaderTwentyFive = () => {
  return (
    <div className="fixed top-0 left-0 right-0" style={{ zIndex: 10 }}>
      <HeaderTop />
      <HeaderDown />
    </div>
  );
};

export default HeaderTwentyFive;

const HeaderTop = () => {
  const { headerSetting, design } = useTheme();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  return (
    <div
      style={{ background: design?.header_color, color: design?.text_color }}
      className={`w-full flex justify-between h-6 sm:px-10 px-5`}
    >
      <div className="flex items-center space-x-1">
        {headerSetting?.facebook_link && (
          <a
            href={headerSetting?.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
          >
            <FaFacebookF className="text-[10px] text-black" />
          </a>
        )}
        {headerSetting?.instagram_link && (
          <a
            href={headerSetting?.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
          >
            <AiOutlineInstagram className=" text-[10px] text-black" />
          </a>
        )}
        {headerSetting?.whatsapp_phone && (
          <a
            href={
              "https://api.whatsapp.com/send?phone=" +
              headerSetting?.whatsapp_phone
            }
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
          >
            <AiOutlineWhatsApp className=" text-[10px] text-black" />
          </a>
        )}
        {headerSetting?.youtube_link && (
          <a
            href={headerSetting?.youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
          >
            <AiOutlineYoutube className="text-[10px] text-black" />
          </a>
        )}
        {headerSetting?.lined_in_link && (
          <a
            href={headerSetting?.lined_in_link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
          >
            <AiFillLinkedin className="text-[10px] text-black" />
          </a>
        )}
      </div>
      <div className="space-x-4 flex pr-2 text-sm items-center font-medium ">
        <div className="items-center space-x-1 lg:flex hidden">
          <PhoneIcon className="h-4 w-4 group-hover:stroke-red-600  group-hover:text-red-600 transition-all duration-300 ease-linear" />

          <p className=" group-hover:text-red-600">{headerSetting?.phone}</p>
        </div>
        {/* login */}
        {!user?.verify && (
          <div className="">
            <Link href="/login" className=" hover:text-red-600">
              Login
            </Link>
          </div>
        )}
        {/* Signup */}
        {!user?.verify && (
          <div className="">
            <Link href={"/sign-up"} className=" hover:text-red-600">
              {" "}
              Sign Up
            </Link>
          </div>
        )}

        {user?.verify && (
          <Link href="/profile" className="">
            <p className=" hover:text-red-600">Profile</p>
          </Link>
        )}
        {user?.verify && (
          <div
            //   onClick={() => dispatch(logout())}

            className="lg:cursor-pointer"
          >
            <p className=" hover:text-red-600">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HeaderDown = () => {
  const { headerSetting, design, menu } = useTheme();
  const [searchTxt, setSearch] = useState("");
  // const [searchInput, setSearchInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // const dispatch = useDispatch()

  // function classNames(...classes) {
  //     return classes.filter(Boolean).join(' ')
  // }

  // const handleClose = () => {
  //     setSearchInput(false)
  //     setSearch('')
  // }

  //   const cartList = useSelector((state) => state.cart.cartList);
  return (
    <div className="mb-2">
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className="flex justify-between items-center lg:grid lg:grid-cols-12 shadow-lg bg-white sm:px-10 px-5 pt-2 pb-2 ">
        <div className="flex space-x-5 items-center col-span-3 ">
          <div
            className="border border-gray-300 p-1 lg:cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <TableCellsIcon className="h-5 w-5" />
          </div>
          <div className="lg:block hidden">
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
                  src={imgUrl + headerSetting.logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
        </div>

        <div className="col-span-7 md:col-span-6 relative lg:block hidden">
          <input
            placeholder={"Search a product..."}
            value={searchTxt}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-full w-full h-full focus:border focus:ring-0 focus:outline-0 focus:border-gray-100 px-4 transition-all duration-300 ease-linear bg-gray-100 text-xs flex items-center"
            type="text"
          />
          <div className="absolute right-2 top-0 bottom-0 flex items-center">
            <div
              style={{
                background: design?.header_color,
                color: design?.text_color,
              }}
              className="rounded-full p-1"
            >
              <IoSearchCircleOutline className="h-4 w-4" />
            </div>
          </div>
          <div className="lg:w-full left-0 absolute top-8 z-50">
            {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
          </div>
        </div>

        <div
          onClick={() => setCartOpen(!cartOpen)}
          className=" items-center md:col-span-3 col-span-2 justify-self-end lg:flex hidden"
        >
          <p
            style={{ color: design?.header_color }}
            className={`pr-1 lg:cursor-pointer menu-hover`}
          >
            <CgShoppingBag className="text-3xl" />
          </p>
          <p
            style={{
              color: design?.text_color,
              background: design?.header_color,
            }}
            className="text-sm  mt-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
          >
            {/* {cartList.length} */}
          </p>
        </div>
        <div className="lg:hidden">
          {headerSetting?.logo === null ? (
            <Link href="/">
              <p className="text-xl uppercase">{headerSetting?.website_name}</p>
            </Link>
          ) : (
            <Link href="/">
              <img
                className="h-10"
                src={imgUrl + headerSetting.logo}
                alt="logo"
              />
            </Link>
          )}
        </div>
      </div>
      {/* tablet and mobile view  */}
      {/* screen touch menu close  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      <div className="">
        <ul
          className={` bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
            open ? "left-0" : "left-[-160%]"
          }`}
        >
          <div className="flex justify-between px-6 py-4">
            <div>
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
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <XMarkIcon onClick={() => setOpen(!open)} className="h-7" />
          </div>

          <div className="px-6">
            <div className="flex flex-col space-y-3 mt-5 z-50">
              {menu?.map((item: any) => (
                <div key={item.id}>
                  <Link onClick={() => setOpen(false)} href={item.url}>
                    <p className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium">
                      {item.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
