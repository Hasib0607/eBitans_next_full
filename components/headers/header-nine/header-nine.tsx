"use client";
import React, { useEffect, useState } from "react";
import "./header-nine.css";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSetting } from "react-icons/ai";
import useTheme from "@/hooks/use-theme";
import HeaderMenu from "./header-menu";
import Category from "./category";
import StickyNav from "./sticky-nav";
import { ArrowLeftIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import SideMenu from "../header-three/side-menu";

const HeaderNine = () => {
  const { design, headerSetting } = useTheme();

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY >= 120) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  return (
    <div>
      <HeaderMenu />
      <div className="lg:block hidden w-full">
        <div
          style={{
            background: design?.header_color,
            color: design?.text_color,
          }}
          className="block justify-between text-sm px-7"
        >
          <div className="sm:container px-5">
            <ul className="lg:block flex-row items-center hidden gap-7 xl:gap-5 text-sm font-bold list-none lg:cursor-pointer md:flex ">
              <Category />
            </ul>
          </div>
        </div>
      </div>

      {/* sticky navbar  */}

      <div
        className={`hidden ${
          openMenu ? "changeNavbarNine openMenu" : "changeNavbarNine"
        }`}
      >
        <StickyNav />
      </div>

      {/* tablet and mobile view  */}

      <div className="block sm:container px-5 py-2 lg:hidden">
        <div className="flex justify-between items-center">
          <div className="lg:cursor-pointer" onClick={() => setOpen(!open)}>
            <TableCellsIcon className="h-6" />
          </div>
          <div>
            <Link href="/">
              <img
                className="h-[45px] w-auto overflow-hidden"
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
                    <AiOutlineSetting className="text-3xl mr-2" />
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

      {/* screen touch menu close  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      <ul
        className={`
        lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[300px] top-0 overflow-y-auto bottom-0 pb-5
        duration-1000 z-10 lg:cursor-pointer ${open ? "left-0" : "left-[-160%]"}
            `}
      >
        <div className="px-10 text-center cursor-auto pt-5">
          <p className="pb-8">Welcome you to {headerSetting?.website_name}</p>
          {/* <div className='flex items-center justify-center gap-2 pb-8'>
            <span>{location}</span>
            <p className=''> Store Locator</p>
          </div> */}
        </div>
        <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden">
          <h3>MENU</h3>
          <ArrowLeftIcon onClick={() => setOpen(!open)} className="h-7" />
        </div>
        <div className="px-6">
          <SideMenu setOpen={setOpen} />
        </div>
      </ul>
    </div>
  );
};

export default HeaderNine;
