"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { RiCloseCircleLine, RiMenu2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiUser } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Search from "./search";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import SideMenu from "./side-menu";

const HeaderFourteen = () => {
  const { headerSetting, design, userData } = useTheme();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  // const cartList = useSelector((state) => state.cart.cartList);

  const { user } = useSelector((state: any) => state.auth);

  const changeNavbar = () => {
    if (window.scrollY >= 90) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const styleCss = `
  
    .navbarSixteen.openMenu {
        display: block;
        position: fixed;
        background: ${design?.header_color};
        opacity:0.8;
        width: 100%;
        z-index: 5;
        padding-top: 10px;
        padding-bottom: 10px;
        top:0;
        animation: fadeIn 0.2s ease-in both;
      }
    .navbarSixteen.openMenu:hover {
        opacity: 1;
      }
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
     }
    .text-color {
        color:  ${design?.header_color};
     }
     .text-hover:hover {
        color: ${design?.header_color}; 
      }
    `;

  return (
    <div
      className={` w-full  ${
        searchInput === true
          ? "mt-[620px] block duration-500"
          : "top-0 absolute"
      }`}
    >
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <style>{styleCss}</style>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="h-screen left-0 fixed top-0 w-screen z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      {searchInput && (
        <div className="fixed top-0 z-20 w-full bg-white h-[600px] overflow-y-auto">
          <div>
            <h1 className="text-[32px] font-medium text-center pt-10">
              Start typing and hit enter
            </h1>
          </div>
          <div className="w-full mt-20 text-center">
            <input
              value={searchTxt}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-[50%] border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 "
              placeholder="Search anything "
            />
            <p
              style={{ color: design?.header_color }}
              className="absolute z-10 right-5 top-10"
              onClick={handleClose}
            >
              <RiCloseCircleLine className="text-3xl lg:cursor-pointer" />
            </p>
          </div>
          <div className="w-full flex justify-center">
            {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
          </div>
        </div>
      )}

      <div className="">
        <div className={`${openMenu ? "navbarSixteen openMenu py-1" : "py-6"}`}>
          <div className={`sm:container px-5 relative bg-transparent z-[4] `}>
            <div className={`flex justify-between items-center`}>
              <div className="flex items-center gap-4">
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

              <div className="flex gap-5 justify-center items-center">
                <div onClick={() => setSearchInput(!searchInput)}>
                  <FaSearch
                    className={`text-3xl lg:cursor-pointer text-black ${
                      openMenu ? " " : "text-hover"
                    }`}
                  />
                </div>

                {/* My account dropdown menu start */}
                <Menu as="div" className="relative inline-block text-left ">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full ">
                      {user?.verify ? (
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={
                              userData?.image
                                ? profileImg + userData?.image
                                : "https://ebitans.com/Image/theme/default-user-image.png"
                            }
                            alt=""
                            className="object-fit"
                          />
                        </span>
                      ) : (
                        <HiUser
                          className={`text-3xl text-black ${
                            openMenu ? " " : "text-hover"
                          }`}
                        />
                      )}
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

                <div
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative sm:block hidden"
                >
                  <GiShoppingBag
                    className={`text-3xl lg:cursor-pointer text-black ${
                      openMenu ? " " : "text-hover"
                    }`}
                  />
                  <div className="absolute h-6 w-6 rounded-full bg-color flex items-center justify-center top-4 -right-2">
                    {/* <p className="text-white text-sm">{cartList.length}</p> */}
                  </div>
                </div>
                <div
                  onClick={() => setOpen(!open)}
                  className="lg:cursor-pointer col-span-3 md:col-span-1"
                >
                  <RiMenu2Line
                    className={`text-4xl text-black ${
                      openMenu ? " " : "text-hover"
                    }`}
                  />
                </div>
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

        <ul
          className={`
                            bg-white fixed sm:w-[350px] md:w-[400px] w-[280px] top-0 overflow-y-auto bottom-0  pb-5
                            duration-1000 z-20 lg:cursor-pointer ${
                              open ? "left-0" : "left-[-180%]"
                            }
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

export default HeaderFourteen;
