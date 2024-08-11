"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CgShoppingBag } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Search from "./search";
import userImg from "@/assets/img/user.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SideMenu from "../header-three/side-menu";

const HeaderTwentyThree = () => {
  const { design, headerSetting, menu, userData } = useTheme();

  const [searchTxt, setSearch] = useState("");
  // const [searchInput, setSearchInput] = useState(false)
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  // cart list and total price
  // const cartList = useSelector((state) => state.cart.cartList);

  // header search close
  const handleClose = () => {
    // setSearchInput(false)
    setSearch("");
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    // sticky navbar
    const changeNavbar = () => {
      if (window.scrollY >= 120) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  // css class
  const styleCss = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    .navbarTwentyOne.openMenu {
        position: fixed;
        background: ${design?.header_color};
        opacity:1;
        width: 100%;
        z-index: 10;
        top:0;
        animation: fadeIn 0.2s ease-in both;

      }
    .navbarSixteen.openMenu:hover {
        opacity: 1;
      }
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

  
    .font-twenty-three {
      font-family: 'Poppins', sans-serif;
    }

    h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
      font-family: 'Poppins', sans-serif;
    }
  

    `;

  return (
    <div>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <style>{styleCss}</style>
      <div
        className={`sm:container px-5 flex justify-between items-center sm:pt-5 pt-2 pb-2`}
      >
        {/* middle section  */}
        <div className="flex lg:items-end items-center">
          <div onClick={() => setOpen(!open)} className="lg:hidden block">
            <HiMenu className="text-3xl" />
          </div>
          <div className="hidden lg:block">
            {headerSetting?.logo === null ? (
              <Link href="/">
                <p className="text-xl uppercase">
                  {headerSetting?.website_name}
                </p>
              </Link>
            ) : (
              <Link href="/">
                <img
                  className="h-[80px] w-auto overflow-hidden"
                  src={imgUrl + headerSetting?.logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="lg:hidden block">
          {headerSetting?.logo === null ? (
            <Link href="/">
              <p className="text-xl uppercase">{headerSetting?.website_name}</p>
            </Link>
          ) : (
            <Link href="/">
              <img
                className="h-[45px] w-auto overflow-hidden"
                src={imgUrl + headerSetting?.logo}
                alt="logo"
              />
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-y-5 items-end">
          {/* search product implement  */}
          <div className="lg:block hidden">
            <div className="flex relative">
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="outline-none focus:outline-none focus:ring-0 focus:border-gray-400 h-8 bg-gray-100 border-0 border-b border-gray-400 text-sm"
              />
              <div className="absolute top-2.5 right-2">
                {searchTxt.length === 0 ? (
                  <IoSearchOutline className="text-sm" />
                ) : (
                  <AiOutlineClose
                    onClick={handleClose}
                    className="text-sm lg:cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="absolute z-[1] top-14 right-24 max-w-[1000px]">
              {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
            </div>
          </div>

          <div className="flex items-center gap-x-2 text-sm font-medium text-gray-700">
            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="lg:flex hidden items-center gap-2 lg:cursor-pointer"
            >
              <CgShoppingBag className="text-xl" />
              <p>Shopping Cart</p>
              <p
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
                className=" text-sm rounded-full bg-opacity-50 w-6 h-6 flex justify-center items-center"
              >
                {/* {cartList.length} */}
              </p>
            </div>
            <div>
              {/* Authenticate routes dropdown  */}
              {user?.verify ? (
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
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
                            src={userImg.src}
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
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link href="/login">
                  <p className="lg:block hidden">Sign In or Sign Up</p>
                  <FiUser className="lg:hidden block text-2xl font-semibold text-[#212121] " />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* menu section  */}
      <div
        className={`${
          openMenu && "navbarTwentyOne openMenu"
        } bg-color lg:block hidden`}
      >
        <div className="flex gap-10 uppercase text-[14px] sm:container px-5 py-4">
          {menu?.map((menu: any) => (
            <ul key={menu.id}>
              <Link href={menu.url}>
                <li className="duration-500 border border-transparent border-hover-menu">
                  {menu.name}
                </li>
              </Link>
            </ul>
          ))}
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
          className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
            open ? "left-0" : "left-[-160%]"
          }`}
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
    </div>
  );
};

export default HeaderTwentyThree;
