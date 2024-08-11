"use client";
import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useTheme from "@/hooks/use-theme";
import HeaderFifteenRight from "./header-fifteen-right";
import {
  MoonIcon,
  SunIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import { btnhover } from "@/site-settings/style";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderFifteen = () => {
  const [open, setOpen] = useState(false);
  const [searchTxt, setSearch] = useState<any>(null);
  const { headerSetting, menu, design } = useTheme();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { userData, setDarktheme, darktheme, darkThemeColor } = useTheme();

  return (
    <>
      <Popover
        className="fixed top-0 left-0 right-0 z-10 "
        style={{
          backgroundColor:
            darktheme === true
              ? darkThemeColor?.backgroundColor
              : design?.header_color,
        }}
      >
        {searchTxt && (
          <div
            className="absolute top-0 z-0  w-screen h-screen"
            onClick={() => setSearch("")}
          ></div>
        )}
        <div className="px-4 py-1 sm:py-0 sm:px-6 ">
          <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
            <div className="flex justify-start items-center lg:w-0 lg:flex-1">
              {/* Header Menu  */}

              <HeaderFifteenRight open={open} setOpen={setOpen} />

              <button
                onClick={() => setOpen(!open)}
                className={"hidden sm:flex items-center h-full"}
              >
                <TableCellsIcon
                  className={"mr-2 h-8 w-8 group-hover:text-gray-700"}
                  style={{
                    color:
                      darktheme === true
                        ? darkThemeColor?.textColor
                        : design?.text_color,
                  }}
                  aria-hidden="true"
                />
              </button>

              <Link href="/">
                <span className="sr-only">Workflow</span>
                {headerSetting?.logo ? (
                  <img
                    className="h-8 w-auto sm:h-10"
                    src={imgUrl + headerSetting?.logo}
                    alt=""
                  />
                ) : (
                  <h2
                    className="font-bold"
                    style={{ color: design?.text_color }}
                  >
                    addd{headerSetting?.website_name}
                  </h2>
                )}
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-900 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                <span className="sr-only">Open menu</span>
                <TableCellsIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-2">
              {darktheme === false ? (
                <div
                  className="lg:cursor-pointer"
                  onClick={() => setDarktheme(!darktheme)}
                >
                  <MoonIcon height={30} width={30} />
                </div>
              ) : (
                <div
                  className="lg:cursor-pointer"
                  onClick={() => setDarktheme(!darktheme)}
                >
                  <SunIcon
                    height={30}
                    width={30}
                    style={{
                      color:
                        darktheme === true
                          ? darkThemeColor?.textColor
                          : design?.text_color,
                    }}
                  />
                </div>
              )}

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      {user?.verify ? (
                        <img
                          src={profileImg + userData?.image}
                          alt=""
                          className="object-fit"
                        />
                      ) : (
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
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
                  <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {user?.verify ? (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="profile/order"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Order
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              //   onClick={() => dispatch(logout())}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Login
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src={imgUrl + headerSetting.logo}
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {menu?.map((item: any) => (
                      <a
                        key={item.id}
                        href={item.url}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <span className=" text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div>
                  {user?.verify ? (
                    <p
                      //   onClick={() => dispatch(logout())}
                      style={{
                        backgroundColor: design?.header_color,
                        color: design?.text_color,
                      }}
                      className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${btnhover}`}
                    >
                      Logout
                    </p>
                  ) : (
                    <Link
                      href="/sign-up"
                      style={{
                        backgroundColor: design?.header_color,
                        color: design?.text_color,
                      }}
                      className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${btnhover}`}
                    >
                      Sign up
                    </Link>
                  )}
                  {user?.verify ? null : (
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <Link
                        href="/login"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default HeaderFifteen;
