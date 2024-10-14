"use client";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import logo from "../..//assetsimg/headerLogo.png";
import bg from "../..//assetsimg/headerBg.jpg";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import {
  PhoneIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const HeaderSticky = () => {
  const { menu } = useTheme();
  return (
    <>
      <Popover
        style={{
          background: `url(${bg.src}) fixed center`,
          position: "relative",
        }}
        className="relative shadow-lg mb-2"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group  rounded-md inline-flex items-center text-base font-medium hover:text-orange-400 gap-1"
                      )}
                    >
                      <div className="">
                        <img src={logo.src} alt="" width={100} />
                      </div>
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
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-max sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {menu.map((item: any) => (
                              <Link
                                key={item.id}
                                href={item.url}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                {/* <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> */}
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  {/* <p className="mt-1 text-sm text-gray-500">{item.description}</p> */}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <TableCellsIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group
              as="nav"
              className="hidden lg:flex flex-wrap xl:space-x-10 space-x-3"
            >
              <Link
                href="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                New Arrival
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Women's Wear
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Men's Wear
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                kid's Wear
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Festival
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Exclusive
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sale
              </Link>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 group gap-1">
              <PhoneIcon className="ml-2 h-5 w-5 group-hover:text-orange-400" />
              <Link
                href="/"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-orange-400"
              >
                Hotline <span className="text-orange-400"> 1900 - 888</span>
              </Link>
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
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
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
                    {menu.map((item: any) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        {/* <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> */}
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div>
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link
                      href="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default HeaderSticky;
