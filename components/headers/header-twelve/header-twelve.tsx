"use client";
import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import {
  AiFillLinkedin,
  AiOutlineClose,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { GrFacebookOption, GrInstagram, GrYoutube } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import useTheme from "@/hooks/use-theme";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  TableCellsIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  IoLocationOutline,
  IoLogoWhatsapp,
  IoSearchCircleOutline,
} from "react-icons/io5";
import { imgUrl } from "@/site-settings/siteUrl";
import HeaderCatTwelve from "./header-cat-twelve";
import StickyNav from "./sticky-nav";
import { headerBg } from "@/site-settings/color";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Search from "./search";
import { location } from "assets/svg";
import SideCategory from "./side-category";
import "./header-twelve.css";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderTwelve = () => {
  const { design, headerSetting, menu, store_id } = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTxt, setSearch] = useState("");

  const bgColor = design?.header_color;

  const handleClose = () => {
    setSearch("");
  };

  // const cartList = useSelector((state) => state.cart.cartList);

  const changeNavbar = () => {
    if (window.scrollY >= 120) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const { user } = useSelector((state: any) => state.auth);

  // CSS START FROM HERE

  const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');

    .all-hover:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .menu-hover:hover {
      color:  ${design?.header_color};
  }
  
  .font-twelve {
    font-family: 'Libre Franklin', sans-serif;
  }

  h1, p, span, button, li, ul {
    font-family: 'Libre Franklin', sans-serif;
  }
    `;

  return (
    <div className="bg-white">
      <style>{styleCss}</style>
      <div className="bg-gray-200 lg:block hidden">
        <div className="flex justify-between py-2 text-sm sm:container px-5">
          {/* My account dropdown menu start */}
          <Menu as="div" className="relative inline-block text-left ">
            <div>
              {user?.verify ? (
                <Menu.Button className="font-twelve inline-flex justify-center items-center w-full uppercase text-[11px] font-semibold text-[#767676]">
                  My Account
                  <ChevronDownIcon
                    className="h-4 ml-1 -mr-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              ) : (
                <Menu.Button className="font-twelve inline-flex justify-center items-center w-full uppercase text-[11px] font-semibold text-[#767676]">
                  Login
                  <ChevronDownIcon
                    className="h-4 ml-1 -mr-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              )}
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 font-twelve text-[#2c2c2c] text-[13px]">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-[#2c2c2c]",
                          "block px-4 py-2 "
                        )}
                      >
                        My account
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/checkout"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-[#2c2c2c]",
                          "block px-4 py-2"
                        )}
                      >
                        Checkout
                      </Link>
                    )}
                  </Menu.Item>
                  {user?.verify ? (
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <Link
                            href="/login"
                            // onClick={() => dispatch(logout())}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-[#2c2c2c]"
                            )}
                          >
                            Sign out
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/login"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-[#2c2c2c]",
                            "block px-4 py-2 "
                          )}
                        >
                          Sign in
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* My account dropdown menu finished */}
          <div className="">
            <ul className="flex flex-row gap-5 list-none font-twelve font-semibold text-[11px] uppercase text-[#767676]">
              <li>Welcome you to {headerSetting?.website_name}</li>
              {store_id !== 714 && <li>|</li>}
              {store_id !== 714 && (
                <li className="flex gap-1 items-center">
                  <span style={{ color: design?.text_color }}>
                    <IoLocationOutline className="text-[#767676] text-[16px]" />
                  </span>
                  {headerSetting?.address}
                </li>
              )}
              <li>|</li>
              <div className="flex flex-row gap-1 justify-center items-center text-[#767676] text-[16px]">
                {headerSetting?.facebook_link && (
                  <a
                    href={headerSetting?.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-lg " />
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
                  >
                    <IoLogoWhatsapp className="text-lg " />
                  </a>
                )}

                {headerSetting?.instagram_link && (
                  <a
                    href={headerSetting?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GrInstagram className="text-lg " />
                  </a>
                )}

                {headerSetting?.youtube_link && (
                  <a
                    href={headerSetting?.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GrYoutube className="text-lg " />
                  </a>
                )}
                {headerSetting?.lined_in_link && (
                  <a
                    href={headerSetting?.lined_in_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillLinkedin className="text-lg " />
                  </a>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className=" lg:flex hidden gap-60 sm:container px-5 items-center py-2">
        <div>
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
        <div className="flex gap-10 uppercase font-twelve text-[14px] text-gray-600">
          {menu?.map((menu: any) => (
            <ul key={menu.id}>
              <Link href={menu.url}>
                <li className="hover:scale-105 duration-100 menu-hover">
                  {menu.name}
                </li>
              </Link>
            </ul>
          ))}
        </div>
      </div>

      <div
        style={{ color: design?.text_color, background: design?.header_color }}
        className="lg:block hidden"
      >
        <HeaderCatTwelve />
      </div>

      {/* sticky navbar  */}
      <div
        className={`${
          openMenu ? "navbarTwelve openMenu" : "navbarTwelve hidden"
        }`}
      >
        <StickyNav />
      </div>

      {/* tablet and mobile view  */}

      <div className="block px-4 py-4 lg:hidden">
        <div className="flex justify-between mb-6 py">
          <div className="lg:cursor-pointer" onClick={() => setOpen(!open)}>
            <TableCellsIcon className="h-6" />
          </div>
          <div>
            <Link href="/">
              <img
                className="h-10"
                src={imgUrl + headerSetting?.logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex">
            <div>
              {/* My account dropdown menu start */}
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full ">
                    <p
                      style={{ color: headerBg }}
                      className="pr-1 lg:cursor-pointer"
                    >
                      <UserCircleIcon className="h-8" />
                    </p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            My account
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/checkout"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Checkout
                          </Link>
                        )}
                      </Menu.Item>
                      {user?.verify ? (
                        <Menu.Item>
                          {({ active }) => (
                            <div>
                              <Link
                                href="/login"
                                // onClick={() => dispatch(logout())}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            </div>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Sign in
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* My account dropdown menu finished */}
            </div>
            <div className="relative">
              <p>
                <HiOutlineShoppingBag className="text-3xl font-thin" />
              </p>
              {/* <p
                style={{ background: bgColor, color: design?.text_color }}
                className="text-sm text-white absolute bottom-1 flex justify-center right-0 items-center rounded-full w-fit px-1.5 h-fit"
              >
                {cartList.length}
              </p> */}
            </div>
          </div>
        </div>
        <div className="relative flex items-center ">
          <input
            type="text"
            value={searchTxt}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-gray-200 opacity-50 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black"
            placeholder="Search our catalog"
          />
          {searchTxt.length === 0 ? (
            <IoSearchCircleOutline className=" right-6 absolute lg:cursor-pointer h-7" />
          ) : (
            <AiOutlineClose
              onClick={handleClose}
              className=" right-6 absolute lg:cursor-pointer h-7"
            />
          )}
        </div>
        <div className=" left-[15px] right-[15px] absolute top-28  z-50">
          {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
        </div>
      </div>

      <ul
        className={`lg:hidden bg-white fixed md:w-128 w-96 top-0 overflow-y-auto bottom-0 -ml-32 pb-5 duration-1000 z-10 lg:cursor-pointer ${
          open ? "left-0" : "left-[-120%]"
        }
            `}
      >
        <div className="px-2 pt-3 text-center sm:cursor-auto ml-32 pb-8 font-twelve font-semibold text-[11px] uppercase text-[#767676]">
          <p>Welcome you to {headerSetting?.website_name}</p>
          <div className="flex items-center justify-center gap-2 my-2 ">
            <span>{location}</span>
            <p className=""> {headerSetting?.address}</p>
          </div>
          <div className="flex flex-row gap-1 justify-center items-center text-gray-500 ">
            <a
              href={headerSetting?.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrFacebookOption className="text-xl lg:cursor-pointer inline mr-2 menu-hover" />
            </a>
            <a
              href={headerSetting?.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineYoutube className=" text-xl lg:cursor-pointer inline mr-2 menu-hover" />
            </a>
            <a
              href={headerSetting?.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
            </a>
          </div>
        </div>
        <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden ml-32 font-twelve font-medium">
          <h3>MENU</h3>
          <ArrowLeftIcon onClick={() => setOpen(!open)} className="h-7" />
        </div>
        <div className="py-7 ml-32 px-6">
          <SideCategory open={open} setOpen={setOpen} />
        </div>
      </ul>

      {/* on screen touch menu hide  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}
    </div>
  );
};

export default HeaderTwelve;
