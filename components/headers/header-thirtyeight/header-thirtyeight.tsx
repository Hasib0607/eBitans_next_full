"use client";
import React, { Fragment, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenu, HiOutlineShoppingBag } from "react-icons/hi";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Search from "./search";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SideMenu from "../header-three/side-menu";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderThirtyEight = () => {
  const { headerSetting, userData, category, design } = useTheme();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  //   const cartList = useSelector((state) => state.cart.cartList);

  const [open, setOpen] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => {
    setSearch("");
  };

  // CSS START FROM HERE

  const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
        .font-thirty-seven {
            font-family: 'Poppins', sans-serif;
        }
        
        h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
            font-family: 'Poppins', sans-serif;
        }
        .header-thirty-seven {
            color:  ${design?.text_color};
            background: ${design?.header_color};
        }
     `;

  return (
    <>
      <div className="bg-white h-20 flex items-center">
        <style>{styleCss}</style>
        {/* cart open  */}
        <BottomCart open={cartOpen} setOpen={setCartOpen} />

        <div className="sm:container px-5 flex justify-between items-center gap-x-5 w-full">
          <div className="lg:mr-20">
            <div className="w-max">
              {headerSetting?.logo === null ? (
                <Link href="/">
                  <p className="text-xl uppercase">
                    {headerSetting?.website_name}
                  </p>
                </Link>
              ) : (
                <Link href="/">
                  <img
                    className="h-[70px] w-auto overflow-hidden"
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
          </div>
          <div onClick={() => setOpen(!open)} className="lg:hidden block">
            <HiMenu className="text-3xl" />
          </div>
          <div className="w-full lg:flex items-center hidden relative">
            <input
              value={searchTxt}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Products"
              className="w-full border border-gray-400 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
            />
            <div
              onClick={handleClose}
              className="lg:cursor-pointer header-thirty-seven px-10 font-thin py-[12px] -ml-1"
            >
              {searchTxt.length === 0 ? (
                <BsSearch className="text-xl" />
              ) : (
                <AiOutlineClose className="text-xl lg:cursor-pointer" />
              )}
            </div>
            <div className={`absolute z-[15] top-14 left-0 w-full`}>
              {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
            </div>
          </div>
          <div className="hidden lg:flex gap-5 items-center w-max ml-28">
            <div>
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
                                  "block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer"
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
                  <FaUserCircle className="text-4xl" />
                </Link>
              )}
            </div>
            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="flex items-center lg:cursor-pointer"
            >
              <p className={`lg:cursor-pointer`}>
                <HiOutlineShoppingBag className="text-4xl font-thin menu-hover" />
              </p>
              <p className="header-thirty-seven text-sm rounded-full w-fit px-1.5 h-fit">
                {/* {cartList.length} */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white h-10 lg:flex items-center hidden">
        <div className="sm:container px-5 flex justify-center gap-x-5">
          {category?.slice(0, 7).map((cat: any) => (
            <Link key={cat.id} href={"/category/" + cat?.id}>
              <ul className="" key={cat?.id}>
                <li className="text-sm font-medium">{cat?.name}</li>
              </ul>
            </Link>
          ))}
        </div>
      </div>
      {/* screen touch menu close  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[4] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      <div className="block lg:hidden">
        <ul
          className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
            open ? "left-0" : "left-[-160%]"
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
            <XMarkIcon onClick={() => setOpen(!open)} className="h-7" />
          </div>

          <div className="px-6">
            <SideMenu setOpen={setOpen} />
          </div>
        </ul>
      </div>
    </>
  );
};

export default HeaderThirtyEight;
