"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { useSelector, useDispatch } from "react-redux";
import MultiStep from "./multistep";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import {
  PhoneIcon,
  XMarkIcon,
  TableCellsIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";

export default function HeaderMid() {
  const { menu, headerSetting, category, design } = useTheme();
  const { logo, phone } = headerSetting;

  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  //   const logOut = () => {
  //     dispatch(logout());
  //   };

  const classes = `
   .group:hover .phn{
        color:${design?.header_color}
    }`;

  return (
    <Popover className="relative shadow-lg md:mb-1 md:pb-2">
      <div className="sm:container px-5 mx-auto">
        <div className="flex justify-between items-center  md:py-1 pb-4 md:justify-start ">
          <div className="md:flex hidden justify-start lg:w-0 lg:flex-1">
            <MultiStep category={category}>
              <div
                className={
                  "text-gray-900   rounded-md inline-flex items-center text-base font-medium group-hover:text-orange-400 gap-1"
                }
              >
                <TableCellsIcon
                  className={
                    "text-gray-400 ml-2 h-5 w-5 group-hover:text-orange-400"
                  }
                  aria-hidden="true"
                />
                <span>Categories</span>
              </div>
            </MultiStep>
          </div>
          {headerSetting?.logo ? (
            <div className="col-span-1 flex md:hidden justify-center  items-center">
              <div className=" h-[45px] w-auto overflow-hidden">
                <Link href="/">
                  {" "}
                  <img
                    src={imgUrl + headerSetting?.logo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className="col-span-1 flex md:hidden justify-center  items-center">
              <div className=" h-[45px] w-auto overflow-hidden">
                <Link href="/"> {headerSetting?.website_name}</Link>
              </div>
            </div>
          )}

          <div className=" md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-inset focus:ring-0">
              <span className="sr-only">Open menu</span>
              <Bars4Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden lg:flex flex-wrap xl:space-x-10 space-x-3"
          >
            {menu?.map((item: any) => (
              <SingleMenuItem key={item.id} item={item} category={category} />
            ))}

            {/* <MultiStep category={category} /> */}
          </Popover.Group>

          <style>{classes}</style>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 group gap-1">
            <PhoneIcon className="ml-2 h-5 w-5 phn" />
            {headerSetting?.phone && (
              <a
                href={`tel:${phone}`}
                className="whitespace-nowrap text-base font-medium text-gray-500 phn"
              >
                Hotline <span className="text-orange-400 phn">{phone}</span>
              </a>
            )}
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
            <div className="pt-5 pb-6 px-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/">
                    {" "}
                    <img
                      className="h-8 w-auto"
                      src={imgUrl + logo}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none  focus:ring-inset focus:ring-0">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {menu?.map((item: any) => (
                    <Link
                      href={"/" + item.url}
                      key={item.id}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <Popover.Button className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </Popover.Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              {user?.verify ? (
                <div
                  //   onClick={() => logOut()}
                  style={{
                    backgroundColor: design?.header_color,
                    color: design?.text_color,
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white "
                >
                  <Popover.Button>Logout</Popover.Button>
                </div>
              ) : (
                <div>
                  <Link
                    href="/sign-up"
                    style={{
                      backgroundColor: design?.header_color,
                      color: design?.text_color,
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white "
                  >
                    <Popover.Button>Sign up</Popover.Button>
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link
                      href="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      <Popover.Button>Sign in</Popover.Button>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const SingleMenuItem = ({ item, category }: any) => {
  const { design } = useTheme();
  const styles = `.hoverText:hover{color:${design?.header_color}}`;

  return (
    <>
      <style>{styles}</style>
      {item?.url === "category" ? (
        <MultiStep category={category}>
          <Link
            href={`/${item.url}`}
            className="text-base font-medium text-gray-500 hoverText"
          >
            {item.name}
          </Link>
        </MultiStep>
      ) : (
        <Link
          href={`/${item.url}`}
          className="text-base font-medium text-gray-500 hoverText"
        >
          {item.name}
        </Link>
      )}
    </>
  );
};
