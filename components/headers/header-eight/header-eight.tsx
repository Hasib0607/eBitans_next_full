"use client";
import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import useTheme from "@/hooks/use-theme";
import Search from "./search";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import {
  ChevronDownIcon,
  TableCellsIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { IoSearchCircleOutline } from "react-icons/io5";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderEight() {
  const { menu, headerSetting, design } = useTheme();
  const dispatch = useDispatch();

  const [searchTxt, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(false);

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
  };

  const { user } = useSelector((state: any) => state.auth);

  const handleClick = () => {
    if (window !== undefined) {
      window.localStorage.removeItem("persist:root");

      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="sm:container px-5">
        <div
          className={`w-full bg-white fixed top-0 left-0 h-[150px] z-[15] duration-500 ${
            searchInput === true ? "mt-0" : "-mt-[150px]"
          }`}
        >
          <div className="sm:container px-5 w-full relative">
            <div className="flex justify-between pt-8 pb-4">
              <h1 className="text-sm font-medium ">
                What are you Looking for?
              </h1>
              <p
                style={{ color: design?.header_color }}
                className=""
                onClick={handleClose}
              >
                <IoIosClose className="text-3xl lg:cursor-pointer" />
              </p>
            </div>
            <div className="w-full text-center relative">
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="w-full border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 p-0 pb-2 text-2xl text-black"
                placeholder="SEARCH PRODUCTS "
              />

              <IoIosSearch className="text-3xl absolute top-0 right-0 lg:cursor-pointer text-gray-500" />
            </div>
            <div className="w-full flex justify-center">
              {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 py-3 items-center">
          <div className="">
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
          <div>
            <div className="float-right text-sm lg:flex-grow">
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
                            Order
                          </Link>
                        )}
                      </Menu.Item>
                      {user?.verify ? (
                        <Menu.Item>
                          {({ active }) => (
                            <div>
                              <Link
                                href="/login"
                                onClick={() => handleClick()}
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
      <div className="min-h-full bg-gray-800">
        <div className="sm:container px-5">
          <Disclosure as="nav" className="bg-gray-800 py-4">
            {({ open }) => (
              <>
                <div className="mx-auto">
                  <div className="flex items-center justify-between h-10">
                    <div className="">
                      <div className="hidden md:block">
                        <div className="flex gap-4">
                          {menu?.map((item: any, idx: any) =>
                            item?.url === "category" ? (
                              <Cat item={item} key={idx} />
                            ) : (
                              <SingleMenu key={item?.id} item={item} />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-end items-center">
                        <button
                          type="button"
                          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                        >
                          <span className="sr-only">View notifications</span>
                          <IoSearchCircleOutline
                            onClick={() => setSearchInput(!searchInput)}
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mr-2 md:hidden order-first">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <TableCellsIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {menu?.map((item: any) => (
                      <Disclosure.Button
                        key={item.id}
                        as="a"
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item?.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      <Sticky
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        headerSetting={headerSetting}
      />
    </>
  );
}

const Sticky = ({ setSearchInput, searchInput, headerSetting }: any) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { menu } = useTheme();

  const changeNavbar = () => {
    if (window.scrollY >= 150) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);
  return (
    openMenu && (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "linear" }}
        className=" bg-gray-800 fixed top-0 left-0 right-0"
        style={{
          zIndex: 11
        }}
      >
        <div className="sm:container px-5">
          <Disclosure as="nav" className="bg-gray-800 ">
            {({ open }) => (
              <>
                <div className="mx-auto">
                  <div className="flex items-center justify-between h-16">
                    <div className="">
                      {headerSetting?.logo === null ? (
                        <Link href="/">
                          <p className="text-xl uppercase">
                            {headerSetting?.website_name}
                          </p>
                        </Link>
                      ) : (
                        <Link href="/">
                          <img
                            className="h-12 w-auto overflow-hidden"
                            src={imgUrl + headerSetting.logo}
                            alt="logo"
                          />
                        </Link>
                      )}
                    </div>
                    <div className="">
                      <div className="hidden md:block">
                        <div className="flex flex-wrap">
                          {menu?.map((item: any) =>
                            item?.url === "category" ? (
                              <Cat key={item.id} item={item} />
                            ) : (
                              <SingleMenu key={item?.id} item={item} />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="flex justify-end items-center">
                        <button
                          type="button"
                          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                        >
                          <span className="sr-only">View notifications</span>
                          <IoSearchCircleOutline
                            onClick={() => setSearchInput(!searchInput)}
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <TableCellsIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {menu?.map((item: any) => (
                      <Disclosure.Button
                        key={item?.id}
                        as="a"
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item?.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </motion.div>
    )
  );
};

const SingleMenu = ({ item }: any) => {
  return (
    <div className="py-3 flex ">
      <Link
        href={"/" + item?.url}
        className={classNames(
          item.current
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "py-2 rounded-md text-sm font-medium px-3"
        )}
      >
        {item?.name}
      </Link>
    </div>
  );
};

const Cat = ({ item }: any) => {
  const [show, setShow] = useState(false);
  const { category } = useTheme();

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={"py-3 relative flex"}
      aria-current={item.current ? "page" : undefined}
    >
      <Link
        href={item?.url}
        className={classNames(
          item.current
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "py-2 px-3 rounded-md text-sm font-medium"
        )}
      >
        {item?.name}
      </Link>
      {show && (
        <div className="absolute top-12 z-10 left-0 max-h-fit bg-black text-black min-w-[200px] py-2 flex flex-col space-y-2">
          {category.map((item: any) => (
            <Link
              key={item?.id}
              href={"/category/" + item?.id}
              className="py-2 px-3 hover:bg-gray-700 min-w-fit block mx-2 text-white rounded-xl "
            >
              {item?.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
