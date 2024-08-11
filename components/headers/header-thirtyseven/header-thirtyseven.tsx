"use client";
import React, { Fragment, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
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

const HeaderThirtySeven = () => {
  const { headerSetting, userData, category, design } = useTheme();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClose = () => {
    setSearch("");
  };

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY >= 80) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  // CSS START FROM HERE

  const styleCss = `
    @font-face {
        font-family: 'Trebuchet':
        src: local('Trebuchet'),
             url('../../../../fonts/trebuc.ttf') format('ttf'),
    }

    .font-thirty-seven {
        font-family: Trebuchet,sans-serif;
    }
    .navbarThirtyEight.openMenu {
        display: block;
        position: fixed;
        background: white;
        width: 100%;
        z-index: 5;
        top:0;
        opacity: 100 !important;
        animation: fadeIn 0.6s ease-in both;
      }
        
    h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: Trebuchet,sans-serif;;
    }
    .header-thirty-seven {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${design?.header_color};
        border-radius: 0px;
      }
      @media only screen and (min-width: 0px) and (max-width: 976px) {
        .navbarThirtyEight.openMenu {
            display: none;
          }
      }
     `;

  return (
    <>
      <div className="header-thirty-seven h-20 flex items-center">
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
                    className="lg:h-[45px] h-8 w-auto overflow-hidden"
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
          </div>
          <div onClick={() => setOpen(!open)} className="lg:hidden block">
            <HiMenu className="text-3xl text-white" />
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
              className="lg:cursor-pointer px-2 font-thin py-[12px] -ml-10"
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
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center gap-3 text-white text-xs w-full">
                  <Link href="/login">
                    <FaUser className="text-2xl" />
                  </Link>
                  <div className="w-full">
                    <Link href="/login">
                      <h3 className="text-base">Account</h3>
                    </Link>
                    <div className="flex items-center gap-1 w-max">
                      <Link href="/sign-up">
                        <p>Register or </p>
                      </Link>
                      <Link href="/login">
                        <p>Login</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={` ${
          openMenu ? "navbarThirtyEight openMenu" : "navbarThirtyEight"
        } bg-white text-black lg:flex items-center hidden shadow-[0px_1px_10px_1px_rgba(0,0,0,0.1)] z-[1] relative`}
      >
        <div className="sm:container px-5 flex justify-center gap-x-5">
          {category.slice(0, 7).map((item: any) => (
            <div key={item.id} className="relative">
              <div className="group relative flex items-center justify-between ">
                <Link href={"/category/" + item?.id}>
                  <h1
                    className={` flex items-center group font-semibold text-sm py-4`}
                  >
                    {item.name}
                  </h1>
                </Link>
                <div className="group-hover:block hidden z-50 w-max py-1 border-t-[3px] border-red-700 bg-white text-black lg:cursor-pointer absolute top-[90%] left-0 ">
                  {item?.cat?.map((subItem: any) => (
                    <div
                      key={subItem.id}
                      className={`px-4 text-sm py-1 hover:bg-red-400 hover:text-white`}
                    >
                      <Link href={"/category/" + subItem?.id}>
                        <h1 className="w-max">{subItem.name} </h1>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

export default HeaderThirtySeven;
