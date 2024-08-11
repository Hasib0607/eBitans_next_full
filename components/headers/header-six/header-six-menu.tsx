"use client";
import React, { Fragment, useState } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";
import "./header-six.css";
import { FaFacebook } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogoWhatsapp } from "react-icons/io5";
import { GrInstagram, GrYoutube } from "react-icons/gr";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import SideMenu from "../header-three/side-menu";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderSixMenu = () => {
  const { menu, design, headerSetting } = useTheme();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();

  //   const cartList = useSelector((state) => state.cart.cartList);
  const { user } = useSelector((state: any) => state.auth);

  const bgColor = design?.header_color;
  // const textColor = design?.text_color;

  const styleCss = `
    .menu-hover:hover {
      color:  ${bgColor};
  }
    `;

  return (
    <div>
      <style>{styleCss}</style>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className="flex flex-row gap-6 sm:container px-5 py-3 items-center justify-between">
        <div
          onClick={() => setOpen(!open)}
          className="lg:hidden lg:cursor-pointer menu-hover"
        >
          <HiMenu className="text-4xl" />
        </div>
        <div className="lg:basis-1/4">
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
        <div className="lg:basis-3/4 flex justify-between items-center">
          <div>
            <ul className="lg:flex lg:flex-row lg:gap-8 lg:justify-center hidden ">
              {menu.map((item: any) => (
                <div key={item.id} className="">
                  <li>
                    <Link href={item?.url}>
                      <h1 className="flex uppercase justify-between items-center group font-semibold text-sm menu-hover">
                        {item.name}
                      </h1>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex lg:gap-6 gap-2 text-gray-500 mr-3">
            <div>
              {/* My account dropdown menu start */}
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="inline-flex mt-1 items-center justify-center w-full">
                    <p className="pr-1 lg:cursor-pointer lg:hidden menu-hover">
                      <UserCircleIcon className="h-8" />
                    </p>
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

            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="flex flex-col justify-center items-center relative menu-hover"
            >
              <Link href="">
                <CgShoppingBag className="text-3xl font-thin" />
                {/* <p
                  style={{
                    background: design?.header_color,
                    color: design?.text_color,
                  }}
                  className=" text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                >
                  {cartList.length}
                </p> */}
                <p className="lg:block hidden">Cart</p>
              </Link>
            </div>
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

      <div className="block lg:hidden">
        <ul
          className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 duration-1000 z-10 lg:cursor-pointer ${
            open ? "left-0" : "left-[-160%]"
          } `}
        >
          <div
            style={{
              background: design?.header_color,
              color: design?.text_color,
            }}
            className="px-10 text-center cursor-auto "
          >
            <div style={{ color: design?.text_color }} className=" py-3">
              <p>Welcome to {design?.name}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              {headerSetting?.facebook_link && (
                <a
                  href={headerSetting?.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-lg " />
                </a>
              )}

              {headerSetting?.whatsapp_phone && (
                <a
                  href={
                    "https://api.whatsapp.com/send?phone=" +
                    headerSetting?.whatsapp_phone
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoWhatsapp className="text-lg " />
                </a>
              )}

              {headerSetting?.instagram_link && (
                <a
                  href={headerSetting?.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GrInstagram className="text-lg " />
                </a>
              )}

              {headerSetting?.youtube_link && (
                <a
                  href={headerSetting?.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GrYoutube className="text-lg " />
                </a>
              )}
              {headerSetting?.lined_in_link && (
                <a
                  href={headerSetting?.lined_in_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin className="text-lg " />
                </a>
              )}
            </div>
          </div>
          <div
            style={{
              background: design?.header_color,
              color: design?.text_color,
            }}
            className="flex justify-between px-6 py-4 lg:hidden "
          >
            <h3>MENU</h3>
            <ArrowLeftIcon onClick={() => setOpen(!open)} className="h-7" />
          </div>

          <div className="px-6">
            <SideMenu setOpen={setOpen} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderSixMenu;
