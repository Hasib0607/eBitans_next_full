"use client";
import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import { IoSearchCircleOutline } from "react-icons/io5";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SearchBox from "./searchbox";

const HeaderDown = () => {
  const { headerSetting, userData } = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  // const logOut = () => {
  //   dispatch(logout());
  // };
  return (
    <div>
      <div className=" sm:container px-5 mx-auto my-1">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <div className="col-span-1 px-2 flex md:justify-center justify-between items-center"></div>
          <div className="col-span-1 hidden md:flex justify-center justify-self-center items-center ">
            <div className="w-full h-full">
              {headerSetting?.logo !== null ? (
                <Link href="/">
                  <img
                    src={imgUrl + headerSetting?.logo}
                    alt=""
                    className="w-auto max-h-[80px] object-cover"
                  />
                </Link>
              ) : (
                <Link href="/">
                  <p className="text-xl uppercase">
                    {headerSetting?.website_name}
                  </p>
                </Link>
              )}
            </div>
          </div>
          <div className="col-span-1 hidden md:flex order-1 md:order-last justify-end items-center mr-2">
            <Search />
            {/* Profile dropdown */}
            {user?.verify && (
              <Menu as="div" className="ml-3 relative">
                <div className="flex items-center">
                  <Menu.Button className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                    <span className="sr-only">Open user menu</span>
                    <img
                      src={
                        userData?.image
                          ? profileImg + userData?.image
                          : userData?.social_img
                          ? profileImg + userData?.social_img
                          : "https://ebitans.com/Image/theme/default-user-image.png"
                      }
                      alt=""
                      className="object-fit"
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 flex flex-col">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={
                            "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          }
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile/order"
                          className={
                            "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          }
                        >
                          Order
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          // onClick={() => logOut()}
                          className={
                            "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          }
                        >
                          Sign out
                        </p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDown;

export const Search = () => {
  const [show, setshow] = useState(false);
  const [text, setText] = useState<any>(null);

  return (
    <>
      {text && (
        <div
          className="absolute top-0 z-0 w-screen h-screen"
          onClick={() => setText("")}
        ></div>
      )}
      <div className="relative w-full ">
        {show && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
              name={"search"}
              autoComplete="given-name"
              placeholder={"Search for items"}
              defaultValue={text}
              className={`mt-1 focus:outline-0 focus:ring-0 focus:border-0 block w-full shadow-sm text-xs sm:text-sm border-gray-300 rounded-md border py-1 sm:py-3 pl-10 placeholder:text-gray-500 bg-gray-50`}
            />

            <IoSearchCircleOutline className="w-5 h-5 sm:w-6 sm:h-6 absolute left-1 sm:left-2 top-1 sm:top-4 bottom-0 font-semibold text-xs lg:cursor-pointer" />
            <XMarkIcon
              onClick={() => {
                setText("");
                setshow(!show);
              }}
              className=" absolute right-1 sm:right-2 top-1 sm:top-4 bottom-0 font-semibold text-xs w-5 h-5 sm:w-6 sm:h-6 lg:cursor-pointer"
            />
          </motion.div>
        )}
        {text && <SearchBox search={text} setSearch={setText} />}
      </div>
      {!show && (
        <IoSearchCircleOutline
          onClick={() => setshow(!show)}
          className="h-5 w-5 sm:h-7 sm:w-7 lg:cursor-pointer"
        />
      )}
    </>
  );
};
