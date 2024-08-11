"use client";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { RiShoppingBagLine } from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Search from "./search";
import SideMenu from "../header-three/side-menu";

const HeaderThirtyNine = () => {
  const { design, headerSetting, menu, userData } = useTheme();

  const [searchTxt, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuBar, setMenuBar] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  //   const cartList = useSelector((state) => state.cart.cartList);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    setSearch("");
    setOpen(false);
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const changeNavbar = () => {
    if (window.scrollY >= 120) {
      setMenuBar(true);
    } else {
      setMenuBar(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');

      .all-hover:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .bg-color {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
  
      .menu-hover:hover {
        color:  ${design?.header_color};
       
    }
    .border-cat {
      border: 2px solid ${design?.header_color};
    }
    .border-hover-menu:hover{
      border-bottom: 1px solid ${design?.text_color};
    }
  
    .font-thirty-nine {
        font-family: 'Open Sans', sans-serif;
    }
  
    h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Open Sans', sans-serif;
    }
  
      `;

  return (
    <div
      className={`${
        menuBar ? "h-16" : "h-20"
      } fixed z-[5] duration-500 top-0 left-0 flex items-center bg-[#127266] text-white w-full`}
    >
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <style>{styleCss}</style>
      <div className="flex items-center justify-between sm:container px-5 w-full">
        <div className={`${menuBar ? "h-16" : "h-20"} w-[200px] duration-500`}>
          {headerSetting?.logo === null ? (
            <Link href="/">
              <p className="text-xl uppercase">{headerSetting?.website_name}</p>
            </Link>
          ) : (
            <Link href="/">
              <img
                className="h-full"
                src={imgUrl + headerSetting.logo}
                alt="logo"
              />
            </Link>
          )}
        </div>
        <div className={`lg:block hidden`}>
          <div className="flex justify-start xl:gap-10 gap-4 uppercase text-[14px] py-4">
            {menu?.map((menu: any) => (
              <ul key={menu.id}>
                <Link href={menu.url}>
                  <li className="">{menu.name}</li>
                </Link>
              </ul>
            ))}
          </div>
          <div
            className={`bg-[#127266] text-white w-full fixed z-[2] ${
              open ? "top-0" : "-top-[100%]"
            } duration-1000 left-0 ${
              menuBar ? "h-16" : "h-20"
            } flex justify-center`}
          >
            <div className="lg:flex items-center hidden relative w-96">
              <input
                autoFocus
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className={`outline-none w-full focus:outline-none focus:ring-0 focus:border-gray-400 h-8 bg-transparent placeholder:text-[${design?.text_color}] border-0 border-b border-gray-400 text-sm`}
              />
              <div className="">
                <AiOutlineClose
                  onClick={handleClose}
                  className="text-sm -ml-4 lg:cursor-pointer"
                />
              </div>
              {/* <IoSearchOutline className='text-sm -ml-4' /> */}
              <div className="absolute z-[15] top-14 -right-48 w-[800px]">
                {searchTxt && (
                  <Search search={searchTxt} setSearch={setSearch} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-between items-center gap-10 lg:flex hidden">
          <div className="lg:block hidden">
            <IoSearchOutline
              onClick={() => setOpen(true)}
              className="text-xl lg:cursor-pointer"
            />
          </div>

          <div className="lg:block hidden">
            {/* Authenticate routes dropdown  */}
            {user?.verify ? (
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      {userData?.image || userData?.social_img ? (
                        <img
                          src={
                            userData?.image
                              ? profileImg + userData?.image
                              : userData?.social_img
                          }
                          alt="user"
                          className="object-fit"
                        />
                      ) : (
                        <img
                          src="https://ebitans.com/Image/theme/default-user-image.png"
                          alt="user"
                          className="object-fit"
                        />
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
                    {user?.verify && (
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
                                "block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer"
                              )}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link href="/login">
                <p className="">Sign In</p>
              </Link>
            )}
          </div>

          <div
            onClick={() => setCartOpen(!cartOpen)}
            className="relative lg:block hidden"
          >
            <RiShoppingBagLine className="text-3xl font-thin" />
            <p
              style={{
                background: design?.header_color,
                color: design?.text_color,
              }}
              className=" text-sm absolute top-3 -right-2 rounded-full w-fit px-1.5 h-fit"
            >
              {/* {cartList.length} */}
            </p>
          </div>
        </div>
        <div onClick={() => setOpenMenu(!openMenu)} className="lg:hidden block">
          <HiMenu className="text-2xl" />
        </div>
      </div>

      {/* tablet and mobile view  */}
      {/* screen touch menu close  */}
      {/* {open && <div onClick={() => setOpenMenu(false)} className='bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer'></div>} */}

      <div className="block lg:hidden">
        <ul
          className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
            openMenu ? "left-0" : "left-[-160%]"
          } `}
        >
          <div className="flex justify-between px-6 py-4 lg:hidden">
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
                    className="h-10"
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <XMarkIcon
              onClick={() => setOpenMenu(!openMenu)}
              className="h-7 bg-black"
            />
          </div>

          <div className="px-6">
            <SideMenu setOpen={setOpenMenu} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeaderThirtyNine;
