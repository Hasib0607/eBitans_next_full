"use client";
import React, { useState, Fragment, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Search from "./search";

const HeaderTwentyFour = () => {
  const { design, headerSetting, menu, userData } = useTheme();

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // const [searchInput, setSearchInput] = useState(false)

  // const cartList = useSelector((state) => state.cart.cartList);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  // console.log(user);

  const handleClose = () => {
    setSearch("");
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  // sticky navbar
  useEffect(() => {
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
    .navbarTwentyFour.openMenu {
        position: fixed;
        background: #F2E1D9;
        opacity:1;
        width: 100%;
        z-index: 10;
        top:0;
        animation: fadeIn 0.2s ease-in both;

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
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <style>{styleCss}</style>
      <div
        className={`flex items-center justify-between bg-[#F2E1D9] h-20  ${
          openMenu ? "navbarTwentyFour openMenu" : ""
        }`}
      >
        <div className="sm:container px-5 flex items-center justify-between">
          <div
            className={`lg:absolute top-0 left-0 z-[3] bg-color p-2 lg:p-5 ${
              openMenu ? "h-20 w-auto" : "xl:w-auto xl:h-28 w-auto h-20"
            }`}
          >
            {headerSetting?.logo === null ? (
              <Link href="/">
                <p className="text-xl uppercase">
                  {headerSetting?.website_name}
                </p>
              </Link>
            ) : (
              <Link href="/">
                <img
                  className="h-full w-full"
                  src={imgUrl + headerSetting?.logo}
                  alt=""
                />
              </Link>
            )}
          </div>
          <div className={`lg:ml-24 lg:block hidden w-full`}>
            <div className="flex justify-center xl:gap-10 gap-4 uppercase text-[14px] py-4">
              {menu?.slice(0, 7).map((menu: any) => (
                <ul key={menu.id}>
                  <Link href={menu.url}>
                    <li className="">{menu.name}</li>
                  </Link>
                </ul>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-5 ">
            <div className="lg:flex items-center hidden relative">
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className={`outline-none focus:outline-none focus:ring-0 focus:border-gray-400 h-8 bg-transparent placeholder:text-[${design?.text_color}] border-0 border-b border-gray-400 text-sm`}
              />
              <div className="">
                {searchTxt.length === 0 ? (
                  <IoSearchOutline className="text-sm -ml-4" />
                ) : (
                  <AiOutlineClose
                    onClick={handleClose}
                    className="text-sm -ml-4 lg:cursor-pointer"
                  />
                )}
              </div>
              {/* <IoSearchOutline className='text-sm -ml-4' /> */}
              <div className="absolute z-[15] top-14 xl:right-0 -right-24 w-[800px]">
                {searchTxt && (
                  <Search search={searchTxt} setSearch={setSearch} />
                )}
              </div>
            </div>

            <div>
              {/* Authenticate routes dropdown  */}
              {user?.verify ? (
                <Menu as="div" className="ml-3 relative">
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
                  <p className="">Sign In</p>
                </Link>
              )}
            </div>

            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="flex flex-col justify-center items-center relative lg:cursor-pointer"
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
        </div>
      </div>
      <div className="sm:container px-5 w-full z-[4] ">
        <div
          className={`bg-gray-600 lg:hidden mx-auto px-2  duration-500 menu-twelve overflow-hidden ${
            open ? "max-h-64" : "max-h-14 "
          }`}
        >
          <div
            onClick={() => setOpen(!open)}
            className="flex lg:cursor-pointer bg-gray-900 px-2 py-1 rounded-md text-white gap-1 items-center mt-2.5 text-lg w-max float-right"
          >
            <h1>MENU</h1>
            <IoMdMenu className="text2xl" />
          </div>
          <div className="pb-5 pt-20 pl-4 text-white">
            {menu?.slice(0, 7).map((menu: any) => (
              <ul key={menu.id}>
                <Link href={menu.url}>
                  <li className="">{menu.name}</li>
                </Link>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTwentyFour;
