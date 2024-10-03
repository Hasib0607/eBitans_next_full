"use client";
import { imgUrl } from "@/site-settings/siteUrl";
import { Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const HeaderDefault = ({ headerSetting, menu, navigation }: any) => {
  return (
    <div className="relative bg-white sm:container px-5">
      <div className="mx-auto">
        <div className="relative z-10 pb-7 bg-white  lg:w-full">
          <Popover>
            <div className="relative pt-6">
              <nav
                className="relative flex items-center justify-between sm:h-10"
                aria-label="Global"
              >
                <div className="">
                  <Link href="/">
                    {headerSetting?.logo ? (
                      <Image
                        className="h-auto hidden lg:block w-48 text-white"
                        src={imgUrl + headerSetting?.logo}
                        alt="logo"
                      />
                    ) : (
                      <h1>{headerSetting?.website_name}</h1>
                    )}
                  </Link>
                </div>

                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  {menu.length
                    ? menu?.map((item: any) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          className="font-medium text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))
                    : navigation?.map((item: any) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="font-medium text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-3">
                  {/* <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Log in
                  </a> */}
                  <button className="py-2 px-4 bg-[#f1593A] text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Login
                  </button>
                  <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Register
                  </button>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <Link href="/">
                        {headerSetting?.logo ? (
                          <img
                            className="h-10 hidden lg:block absolute right-0 inset-y-0 w-48 text-white transform translate-x-1/2"
                            src={imgUrl + headerSetting?.logo}
                            alt="logo"
                          />
                        ) : (
                          <h1>{headerSetting?.name}</h1>
                        )}
                      </Link>
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item: any) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="/"
                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                  >
                    Log in
                  </a>
                  <a
                    href="/"
                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                  >
                    Register
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default HeaderDefault;
