"use client";
import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { Fragment } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useTheme from "@/hooks/use-theme";
import {
  ArrowLeftIcon,
  Bars4Icon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import HeaderMenu from "./headermenu";
import StickyNav from "./sticky-nav";
import { imgUrl } from "@/site-settings/siteUrl";
import { headerBg } from "@/site-settings/color";
import SideMenu from "../header-three/side-menu";
import "./header-five.css";
import { location } from "@/assets/svg";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderFive = () => {
  const { design, headerSetting } = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const styleCss = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  .menu-hover:hover {
    color:  ${design.header_color};
  }
  .active-menu {
    color: ${design.header_color};
  }
  .sticky-menu {
    background: ${design.header_color};
    color: ${design.text_color};
  }
  h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
    font-family: 'Montserrat', sans-serif;
  }

  `;

  const bgColor = design?.header_color;

  // const cartList = useSelector((state: any) => state.cart.cartList);

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY >= 90) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <style>{styleCss}</style>
      <div className="lg:block hidden w-full sm:container px-5 ">
        <div
          style={{
            background: design?.header_color,
            color: design?.text_color,
          }}
          className="flex justify-between py-4 text-sm px-7"
        >
          <div>
            <p>Welcome you to {headerSetting?.website_name}</p>
          </div>
          <div className="">
            <ul className="flex flex-row gap-5 list-none">
              <div className="flex items-center space-x-1">
                {headerSetting?.facebook_link && (
                  <a
                    href={headerSetting?.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white p-1 transition-all duration-300 ease-linear lg:cursor-pointer"
                  >
                    <FaFacebookF className="text-[10px] text-black" />
                  </a>
                )}
                {headerSetting?.instagram_link && (
                  <a
                    href={headerSetting?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white p-1 transition-all duration-300 ease-linear lg:cursor-pointer"
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
                    className="rounded-full bg-white p-1 transition-all duration-300 ease-linear lg:cursor-pointer"
                  >
                    <AiOutlineYoutube className="text-[10px] text-black" />
                  </a>
                )}
                {headerSetting?.lined_in_link && (
                  <a
                    href={headerSetting?.lined_in_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white p-1 transition-all duration-300 ease-linear lg:cursor-pointer"
                  >
                    <AiFillLinkedin className="text-[10px] text-black" />
                  </a>
                )}
              </div>
              {headerSetting?.address && (
                <li className="flex items-center">
                  <span style={{ color: design?.text_color }} className="pr-2">
                    {location}
                  </span>
                  {headerSetting?.address}
                </li>
              )}
              <li>|</li>

              {/* My account dropdown menu start */}
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full ">
                    My Account
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1"
                      aria-hidden="true"
                    />
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
            </ul>
          </div>
        </div>

        {/* header category  */}
        <HeaderMenu />
      </div>

      {/* sticky navbar  */}
      <div
        className={`hidden ${
          openMenu ? "changeNavbar openMenu" : "changeNavbar"
        } `}
      >
        <StickyNav openMenu={openMenu} />
      </div>

      {/* tablet and mobile view  */}

      <div className="block px-4 py-6 lg:hidden">
        <div className="flex justify-between mb-6 py">
          <div className="lg:cursor-pointer" onClick={() => setOpen(!open)}>
            <Bars4Icon className="h-6" />
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
                className="text-sm absolute bottom-1 flex justify-center right-0 items-center rounded-full w-fit px-1.5 h-fit"
              >
                {cartList.length}
              </p> */}
            </div>
          </div>
        </div>
        {/* <div className='relative flex items-center '>
          <input type="text" value={searchTxt} onChange={(e) => setSearch(e.target.value)} className='w-full border-gray-200 opacity-50 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black' placeholder='Search our catalog' />
          {searchTxt.length === 0 ? <SearchIcon className=' right-6 absolute lg:cursor-pointer h-7' /> : <AiOutlineClose onClick={handleClose} className=' right-6 absolute lg:cursor-pointer h-7' />}
          {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
        </div> */}
      </div>

      <div>
        {/* screen touch menu close  */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
          ></div>
        )}

        <ul
          className={`
        lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[280px] top-0 overflow-y-auto bottom-0  pb-5
        duration-1000 z-20 lg:cursor-pointer ${open ? "left-0" : "left-[-180%]"}
            `}
        >
          <div className="px-10 text-center cursor-auto pt-3">
            <p>Welcome you to {headerSetting.website_name}</p>
            <div className="flex items-center justify-center gap-2 pb-8 pt-2">
              <p className="">
                {" "}
                <span className="inline-block">
                  <GoLocation />
                </span>{" "}
                {headerSetting.address}
              </p>
            </div>
          </div>
          <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden">
            <h3>MENU</h3>
            <ArrowLeftIcon onClick={() => setOpen(!open)} className="h-7" />
          </div>
          <div className="px-6">
            <SideMenu open={open} setOpen={setOpen} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderFive;
