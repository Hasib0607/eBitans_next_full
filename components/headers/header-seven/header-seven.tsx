"use client";
import React, { Fragment, useEffect, useState } from "react";
import { CgMenuLeft, CgShoppingBag } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import useTheme from "@/hooks/use-theme";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Search from "./search";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import CategorySeven from "./category-seven";
import { BottomCart } from "../card-popup-three";
import SideMenu from "../header-three/side-menu";

const HeaderSeven = ({ headerSetting, design }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const { userData } = useTheme();
  const [open, setOpen] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const bgColor = design?.header_color;

  const handleClick = () => {
    if (window !== undefined) {
      window.localStorage.removeItem("persist:root");

      window.location.href = "/";
    }
  };

  useEffect(() => {
    // scroll navbar
    const changeNavbar = () => {
      if (window.scrollY >= 10) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  const handleClose = () => {
    setSearch("");
  };

  const cartList = useSelector((state: any) => state.cart.cartList);

  // CSS START FROM HERE

  const styleCss = `
     @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

     .navbarSeven.openMenu {
        display: block;
        // position: fixed;
        width: 100%;
        background: ${design?.header_color};
        z-index: 10;
        /* opacity: 0; */
        animation: fadeIn 0.6s ease-in both;
      }
     .bg-seven-header {
       color:  ${design?.text_color};
       background: ${design?.header_color};
    }
     .all-hover:hover {
       color:  ${design?.text_color};
       background: ${design?.header_color};
    }
        .menu-hover:hover {
        color:  ${design?.header_color};
    }

    .font-seven {
        font-family: 'Open Sans', sans-serif;
    }
    h1, p, span, button {
        font-family: 'Open Sans', sans-serif;
    }
     `;

  return (
    <div>
      <div className={`${openMenu && "navbarSeven openMenu"} bg-seven-header`}>
        <style>{styleCss}</style>
        <div className="flex flex-row justify-between items-center nav-menu sm:container px-5 lg:py-0 py-1">
          {searchInput && (
            <div
              onClick={() => {
                setSearchInput(false);
                setSearch("");
              }}
              className="h-screen left-0 fixed top-0 w-screen z-40"
            ></div>
          )}
          {searchInput && (
            <div className="absolute rounded-lg overflow-hidden z-50 left-[50%] bg-[rgba(255,255,255,.8)] top-3 translate-x-[-50%]">
              <BsSearch className="text-[16px] lg:cursor-pointer absolute top-5 left-3 text-black" />
              <input
                autoFocus
                type="text"
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your products"
                className="md:px-14 px-10 py-4 lg:w-[500px] xl:w-[800px] md:w-[350px] w-[400px] border-gray-200 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black "
              />
              <XMarkIcon
                onClick={() => {
                  setSearchInput(false);
                  handleClose();
                }}
                className="absolute top-5 lg:cursor-pointer h-5 right-3 text-black"
              />
            </div>
          )}
          <div className="lg:w-[500px] md:w-[350px] w-[400px] xl:w-[800px] absolute left-[50%] top-16 translate-x-[-50%] z-50 ">
            {searchTxt && (
              <Search
                search={searchTxt}
                setSearch={setSearch}
                setSearchInput={setSearchInput}
              />
            )}
          </div>
          <div className="flex items-center lg:gap-0  gap-5">
            <div>
              <CgMenuLeft
                onClick={() => setOpen(!open)}
                className="text-3xl hover:rotate-180 lg:cursor-pointer lg:hidden"
              />
            </div>
            <div>
              {headerSetting?.logo === null ? (
                <Link href="/">
                  <p className="text-xl uppercase">
                    {headerSetting?.website_name}
                  </p>
                </Link>
              ) : (
                <Link href="/">
                  <img
                    className="h-[45px] w-auto overflow-hidden sm:mr-20"
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className="lg:block hidden">
              <CategorySeven openMenu={openMenu} />
            </div>
          </div>

          <div>
            <div className="flex-row flex justify-center items-center gap-8 relative">
              <BsSearch
                onClick={() => setSearchInput(true)}
                className="text-xl lg:cursor-pointer lg:block hidden"
              />

              {/* Authenticate routes dropdown  */}
              {user?.verify ? (
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
                                href="/profile/order"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Order
                              </Link>
                            )}
                          </Menu.Item>
                          {/*  */}
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={handleClick}
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
              ) : (
                <Link href="/login">
                  <p className="text-[16px] font-semibold font-seven">
                    Sign In
                  </p>
                </Link>
              )}

              <div
                onClick={() => setCartOpen(!cartOpen)}
                className="lg:cursor-pointer"
              >
                <CgShoppingBag className="text-3xl font-thin" />
                <p
                  style={{ background: design?.text_color, color: bgColor }}
                  className=" text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                >
                  {cartList.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {searchInput && (
          <div className="absolute top-0 left-0 w-screen opacity-50 h-screen bg-[#444] z-30"></div>
        )}

        {/* cart open  */}
        <BottomCart open={cartOpen} setOpen={setCartOpen} />
      </div>
      {/* tablet and mobile view  */}
      {/* screen touch menu close  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      <div className="block px-4 lg:hidden">
        <ul
          className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0  pb-5 duration-1000 z-50 lg:cursor-pointer ${
            open ? "left-0" : "left-[-120%]"
          }`}
        >
          <div className="flex py-4 z-50 justify-between items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ">
            <div>
              <Link href="/">
                <img
                  className="h-8"
                  src={imgUrl + headerSetting?.logo}
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <XMarkIcon
                onClick={() => setOpen(!open)}
                className="h-5 basis-2/4"
              />
            </div>
          </div>
          <div className="z-50 px-10">
            <SideMenu setOpen={setOpen} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderSeven;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
