"use client";
import React, { useState, Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { RiCloseCircleLine, RiMenu2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Search from "./search";
import useTheme from "@/hooks/use-theme";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderTwentyTwo = () => {
  const { headerSetting, design, menu, userData } = useTheme();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const [searchInput, setSearchInput] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
  };

  // const cartList = useSelector((state) => state.cart.cartList);

  const changeNavbar = () => {
    if (window.scrollY >= 90) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const styleCss = `
  
    .navbarSixteen.openMenu {
        display: block;
        position: fixed;
        background: ${design?.header_color};
        opacity:0.8;
        width: 100%;
        z-index: 5;
        padding-top: 10px;
        padding-bottom: 10px;
        top:0;
        animation: fadeIn 0.2s ease-in both;

      }
    .navbarSixteen.openMenu:hover {
        opacity: 1;
      }
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
     }
    .text-color {
        color:  ${design?.header_color};
     }
     .text-hover:hover {
        color: ${design?.header_color};
        
      }
 
    `;

  return (
    <>
      <div className="py-3 px-6 block lg:hidden">
        {/* cart open  */}
        <BottomCart open={cartOpen} setOpen={setCartOpen} />
        <div className="flex justify-between item-center">
          <div
            onClick={() => setOpen(!open)}
            className="lg:cursor-pointer col-span-3 md:col-span-1"
          >
            <RiMenu2Line
              className={`text-lg mt-2 text-black ${
                openMenu ? " " : "text-hover"
              }`}
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
                  className="h-10"
                  src={imgUrl + headerSetting.logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div onClick={() => setCartOpen(!cartOpen)} className="relative ">
            <GiShoppingBag
              className={`text-3xl lg:cursor-pointer text-black ${
                openMenu ? " " : "text-hover"
              }`}
            />
            <div className="absolute h-6 w-6 rounded-full bg-color flex items-center justify-center top-4 -right-2">
              {/* <p className="text-white text-sm">{cartList.length}</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full hidden lg:block `}>
        <style>{styleCss}</style>
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="h-screen left-0 fixed top-0 w-screen z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
          ></div>
        )}

        {searchInput && (
          <div className="fixed top-0 z-20 w-full bg-white h-[600px] overflow-y-auto">
            <div>
              <h1 className="text-[32px] font-medium text-center pt-10">
                Start typing and hit enter
              </h1>
            </div>
            <div className="w-full mt-20 text-center">
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="w-[50%] border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 "
                placeholder="Search anything "
              />
              <p
                style={{ color: design?.header_color }}
                className="absolute z-10 right-5 top-10"
                onClick={handleClose}
              >
                <RiCloseCircleLine className="text-3xl lg:cursor-pointer" />
              </p>
            </div>
            <div className="w-full flex justify-center">
              {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
            </div>
          </div>
        )}

        <div>
          <div className="">
            <div
              className={`py-6 ${
                searchInput === true
                  ? "mt-[620px] block duration-500"
                  : "top-0 absolute"
              } bg-transparent z-[4] ${
                openMenu && "navbarSixteen openMenu"
              }  w-full`}
            >
              <div className="flex justify-between items-center sm:container px-5 w-full">
                <div className="flex items-center gap-4 ">
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

                <div className="flex gap-5 justify-center items-center ">
                  <ul className=" lg:flex pt-2 ml-0 xl:ml-24 lg:ml-0  lg:flex-row lg:gap-10 lg:justify-center hidden md:flex  item-center">
                    {menu?.map((menuData: any, idx: any) =>
                      menuData?.url === "category" ? (
                        <Cat item={menuData} key={idx} />
                      ) : (
                        <Link
                          href={menuData?.url}
                          // style={({ isActive }) =>
                          //   isActive
                          //     ? {
                          //         color: `red`,
                          //       }
                          //     : { color: "black" }
                          // }
                          className=" font-bold text-sm "
                          key={idx}
                        >
                          <h1
                            className={`flex group justify-between py-2 items-center group font-bold text-sm ml-4`}
                          >
                            {menuData?.name}
                          </h1>
                        </Link>
                      )
                    )}
                  </ul>
                  <div
                    onClick={() => setCartOpen(!cartOpen)}
                    className="relative "
                  >
                    <GiShoppingBag
                      className={`text-3xl lg:cursor-pointer text-black ${
                        openMenu ? " " : "text-hover"
                      }`}
                    />
                    <div className="absolute h-6 w-6 rounded-full bg-color flex items-center justify-center top-4 -right-2">
                      {/* <p className="text-white text-sm">{cartList.length}</p> */}
                    </div>
                  </div>
                  <div onClick={() => setSearchInput(!searchInput)}>
                    <FaSearch
                      className={`text-md mt-2 lg:cursor-pointer text-black ${
                        openMenu ? " " : "text-hover"
                      }`}
                    />
                  </div>

                  {/* My account dropdown menu start */}
                  {/* Authenticate routes dropdown  */}
                  {user?.verify ? (
                    <Menu as="div" className="ml-3 relative lg:block hidden">
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
                                    "block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer"
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
                      <FiUser className="text-3xl font-semibold text-[#212121] lg:block hidden" />
                    </Link>
                  )}
                  {/* My account dropdown menu finished */}

                  <div
                    onClick={() => setOpen(!open)}
                    className="lg:cursor-pointer col-span-3 md:col-span-1"
                  >
                    <RiMenu2Line
                      className={`text-md mt-2 text-black ${
                        openMenu ? " " : "text-hover"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tablet and mobile view  */}

          <div className={`px-4 z-[7]`}>
            <ul
              className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-48 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${
                open ? "left-0 " : "left-[-140%] "
              }`}
            >
              <div className="pb-7 pt-3 px-6">
                <div className=" text-xl border-b-[2px] pb-5 text-center text-color">
                  Menu
                </div>
                <div className="flex flex-col space-y-3 mt-5 z-50">
                  <style>{styleCss}</style>
                  {menu?.map((item: any) => (
                    <div key={item.id}>
                      <Link onClick={() => setOpen(false)} href={item.url}>
                        <p className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium">
                          {item.name}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTwentyTwo;

const Cat = ({ item }: any) => {
  const { category } = useTheme();

  return (
    <div
      // onMouseEnter={() => setShow(true)}
      // onMouseLeave={() => setShow(true)}
      className="relative group"
      aria-current={item.current ? "page" : undefined}
    >
      <Link href={item?.url} className={classNames()}>
        <h1 className=" font-bold text-sm py-2">{item?.name}</h1>
      </Link>
      <div className="absolute top-10 z-10 left-0 max-h-fit bg-white  min-w-[200px] hidden group-hover:flex  flex-col space-y-2">
        {category.map((item: any) => (
          <Link
            key={item.id}
            href={"/category/" + item?.id}
            className=" px-3 py-3  hover:bg-gray-200 min-w-fit  mx-2 text-black rounded-xl "
          >
            {item?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
