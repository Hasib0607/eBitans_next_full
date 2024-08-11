"use client";
import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Search from "./search";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function HeaderMenu() {
  const { headerSetting, design } = useTheme();
  const dispatch = useDispatch();
  const [searchTxt, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => {
    setSearch("");
  };

  const styleCss = `
    .searchHover:hover{
        background: ${design?.header_color};
        color: ${design?.text_color}
    }
    `;

  const bgColor = design?.header_color;

  // const cartList = useSelector((state) => state.cart.cartList)

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <style>{styleCss}</style>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className="justify-between items-center bg-white py-2 sm:container px-5 hidden lg:flex">
        <div>
          {headerSetting?.logo === null ? (
            <Link href="/">
              <p className="text-xl uppercase">{headerSetting?.website_name}</p>
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

        <div className="lg:basis-3/6 w-full">
          <div className=" relative overflow-hidden">
            <div>
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Enter your search key ..."
                className="bg-gray-100 w-full py-3 outline-none focus:outline-none focus:border-gray-200 border-gray-200 focus:ring-0 z-50"
                style={{ height: "50px" }}
              />
            </div>
            <div
              style={{ height: "50px" }}
              className="searchHover lg:cursor-pointer absolute right-0 top-0 pt-4 px-4 font-thin "
            >
              {searchTxt.length === 0 ? (
                <BsSearch className="text-xl" />
              ) : (
                <AiOutlineClose
                  onClick={handleClose}
                  className="text-xl lg:cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="relative">
            {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
          </div>
        </div>

        <div className="flex items-center relative gap-3">
          <div className="flex gap-2 items-center">
            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="flex items-center"
            >
              <p className={`pr-1 lg:cursor-pointer`}>
                <HiOutlineShoppingBag className="text-3xl font-thin" />
              </p>
              {/* <p
                style={{ background: bgColor, color: design?.text_color }}
                className=" text-sm mt-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
              >
                {cartList.length}
              </p> */}
            </div>
            <div>
              {/* My account dropdown menu start */}
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full ">
                    <AiOutlineSetting className="text-3xl mt-2" />
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
                            href="/profile/order"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Track order
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMenu;
