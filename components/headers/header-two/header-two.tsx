"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiMenu } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import SideCategory from "./side-category";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Search from "./search";
import { BottomCart } from "../card-popup-three";

const HeaderTwo = () => {
  const { headerSetting, design, menu, userData } = useTheme();

  const [searchTxt, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
  };

  // const cartList = useSelector((state: any) => state.cart.cartList);

  const { user } = useSelector((state: any) => state.auth);

  const styleCss = `
  .header-menu .active{
      color:#f1593a;
      font-weight: 700;
     }
  `;

  return (
    <div className="sm:container px-5">
      <style>{styleCss}</style>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className="flex justify-between py-4 items-center">
        <div className="flex space-x-5 items-center">
          <div>
            <HiMenu
              onClick={() => setOpen(!open)}
              className="text-4xl menu-hover lg:cursor-pointer border-2 rounded"
            />
          </div>
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
                  className="h-[45px] w-auto overflow-hidden"
                  src={imgUrl + headerSetting.logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="lg:flex hidden space-x-5">
          {menu?.map((item: any) => (
            <div key={item.id} className="header-menu">
              <Link
                href={item.url || '/'}
                className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center relative">
            <p
              className="lg:cursor-pointer absolute right-2"
              onClick={() => setSearchInput(!searchInput)}
            >
              <BsSearch className="text-2xl lg:block hidden menu-hover" />
            </p>
            {searchInput && (
              <div className="absolute -top-6">
                <input
                  value={searchTxt}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="xl:w-60  absolute -left-60 lg:w-60 border-gray-300 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black"
                  placeholder="Search your products "
                />
                <XMarkIcon className="absolute z-10 menu-hover" />
                <p
                  style={{ color: design?.header_color }}
                  className="absolute z-10 -left-6 top-3"
                  onClick={handleClose}
                >
                  <AiOutlineClose className="text-xl lg:cursor-pointer" />
                </p>
              </div>
            )}
            <div className="lg:w-[800px] -left-[820px] absolute -top-12  z-50">
              {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
            </div>
          </div>
          <div
            onClick={() => setCartOpen(!cartOpen)}
            className="lg:flex hidden items-center"
          >
            <p className={`pr-1 lg:cursor-pointer menu-hover`}>
              <CgShoppingBag className="text-3xl" />
            </p>
            {/* <p
              style={{
                color: design?.header_color,
                background: design?.text_color,
              }}
              className="text-sm text-white mt-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
            >
              {cartList.length}
            </p> */}
          </div>
          <div>
            <Menu as="div" className="relative text-left">
              <Menu.Button className="items-center">
                {user?.verify ? (
                  <img
                    src={
                      userData?.image
                        ? profileImg + userData?.image
                        : userData?.social_img
                        ? profileImg + userData?.social_img
                        : "https://ebitans.com/Image/theme/default-user-image.png"
                    }
                    alt=""
                    className="object-fit h-8 w-8 rounded-full overflow-hidden"
                  />
                ) : (
                  <p className=" lg:cursor-pointer menu-hover">
                    <FaUser className="text-2xl" />
                  </p>
                )}
              </Menu.Button>

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
          </div>
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
          className={`bg-white fixed md:w-128 w-96 lg:[400px] top-0 overflow-y-auto bottom-0 -ml-32 pb-5 lg:px-10 duration-1000 flex flex-col justify-between z-50 lg:cursor-pointer ${
            open ? "left-0" : "left-[-120%]"
          }`}
        >
          <div>
            <div className="flex py-4 z-50 justify-between items-center  pl-10 lg:pl-10 pr-5 border-b-2 border-gray-100 pb-8 ml-28">
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
                  className="h-5 menu-hover basis-2/4"
                />
              </div>
            </div>
            <div className="mt-5 ml-36 z-50 lg:block hidden">
              <SideCategory />
            </div>
            <div className="lg:hidden flex flex-col space-y-3 ml-36 z-50">
              {/* <SideMenu setOpen={setOpen} />   */}
            </div>
            {/* <div className="lg:hidden flex flex-col space-y-3 mt-5 ml-36 z-50" >
              {
                menu?.map((item) =>
                  <div key={item.id} >
                    <NavLink to={item.url}><p className='menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium'>{item.name}</p></NavLink>
                  </div>
                )
              }
            </div> */}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderTwo;
