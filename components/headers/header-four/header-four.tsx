"use client";
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import useTheme from "@/hooks/use-theme";
import Right from "./right";
import {
  Bars4Icon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import { IoSearchCircleOutline } from "react-icons/io5";
import Search from "./search";
import { red } from "@/site-settings/color";
import { btnhover } from "@/site-settings/style";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderFour() {
  const [open, setOpen] = useState(false);
  const [searchTxt, setSearch] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState<any>(null);
  const { headerSetting, menu, design, userData } = useTheme();
  const headermenu = menu.filter((i: any) => i.url !== "category");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

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

  const styleCss = `
  
      .navbarFour{
          position: fixed;
          width: 100%;
          z-index: 7;
          top:0;
          animation: fadeIn 0.2s ease-in both;
  
        }
    
   
      `;

  return (
    <Popover
      className={`${
        openMenu ? "navbarFour" : "sticky top-0 left-0 right-0 z-[7]"
      }`}
      style={{ backgroundColor: design?.header_color }}
    >
      <style>{styleCss}</style>
      {searchTxt && (
        <div
          className="absolute top-0 z-0  w-screen h-screen"
          onClick={() => setSearch("")}
        ></div>
      )}
      <div className="py-1 sm:py-0 sm:container px-5 shadow-2xl drop-shadow-2xl">
        <div className="flex justify-between items-center py-3 lg:justify-start lg:space-x-10">
          <div className="flex justify-start items-center lg:w-0 lg:flex-1">
            {/* Header Menu  */}
            <Right open={open} setOpen={setOpen} />
            <button
              onClick={() => setOpen(!open)}
              className={"hidden lg:flex items-center h-full"}
            >
              <Bars4Icon
                className={"mr-2 h-8 w-8 group-hover:text-gray-700"}
                style={{ color: design?.text_color }}
                aria-hidden="true"
              />
            </button>

            <Link href="/">
              <span className="sr-only">Workflow</span>
              {headerSetting?.logo ? (
                <img
                  className="h-[45px] w-auto overflow-hidden"
                  src={imgUrl + headerSetting?.logo}
                  alt=""
                />
              ) : (
                <h2 className="font-bold" style={{ color: design?.text_color }}>
                  {headerSetting?.website_name}
                </h2>
              )}
            </Link>
          </div>
          <div className="-mr-2 -my-2 lg:hidden">
            <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-900 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
              <span className="sr-only">Open menu</span>
              <Bars4Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden lg:flex fle flex-grow relative"
          >
            <input
              type="text"
              value={searchTxt ? searchTxt : ""}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 rounded-md px-10 border-0 outline-0 focus:outline-0 focus:border-0 z-10"
              placeholder="Search"
            />
            <IoSearchCircleOutline className="h-5 w-5 absolute top-3 left-2 font-bold z-10 lg:cursor-pointer" />
            <XMarkIcon
              onClick={() => setSearch(null)}
              className="h-4 w-4 absolute top-3 right-2 font-bold z-10 lg:cursor-pointer"
            />
            {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
          </Popover.Group>
          <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0 space-x-2">
            <Link
              href="/offer"
              style={{ backgroundColor: red }}
              className={
                "text-gray-100 group rounded-md  py-2 px-4 inline-flex items-center text-base font-medium hover:text-gray-300"
              }
            >
              <TableCellsIcon
                className={
                  "text-gray-100 mr-2 h-5 w-5 group-hover:text-gray-200"
                }
                aria-hidden="true"
              />
              <span>Offer</span>
            </Link>
            {/* Header Menu  */}

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={
                      "text-gray-100 group rounded-md bg-black py-2 px-4 inline-flex items-center text-base font-medium hover:text-gray-300"
                    }
                  >
                    <Bars4Icon
                      className={
                        "text-gray-100 mr-2 h-5 w-5 group-hover:text-gray-200"
                      }
                      aria-hidden="true"
                    />
                    <span>Menu</span>
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-max sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-3 bg-white px-2 py-4 sm:gap-8 sm:p-8">
                          {headermenu?.map((item: any) => (
                            <Link key={item?.id} href={item?.url}>
                              <Popover.Button className="-m-3 p-2 flex items-start rounded-lg hover:bg-gray-50">
                                {/* <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> */}
                                <div className="">
                                  <p className="text-base font-medium text-gray-900">
                                    {item?.name}
                                  </p>
                                  {/* <p className="mt-1 text-sm text-gray-500">{item.description}</p> */}
                                </div>
                              </Popover.Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                    {user?.verify ? (
                      <img
                        src={
                          userData?.image
                            ? profileImg + userData?.image
                            : "https://ebitans.com/Image/theme/default-user-image.png"
                        }
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
                            // onClick={() => dispatch(logout())}
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
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
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
                    <Link key={item.id} href={item.url}>
                      <Popover.Button className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 w-full">
                        <span className=" text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Popover.Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                {user?.verify ? (
                  <p
                    // onClick={() => dispatch(logout())}
                    style={{
                      backgroundColor: design?.header_color,
                      color: design?.text_color,
                    }}
                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${btnhover}`}
                  >
                    <Popover.Button>Logout</Popover.Button>
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
                    <Popover.Button>Sign up</Popover.Button>
                  </Link>
                )}
                {user?.verify ? null : (
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?
                    <Link
                      href="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      <Popover.Button>Sign in</Popover.Button>
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
