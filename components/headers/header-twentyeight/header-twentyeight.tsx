"use client";
import React, { Fragment, useState } from "react";
import { AiFillLinkedin, AiOutlineClose } from "react-icons/ai";
import { FaFacebook, FaPhoneSquareAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { BiUser } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrInstagram, GrYoutube } from "react-icons/gr";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Search from "./search";
import { ArrowLeftIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import SideMenu from "../header-three/side-menu";

const HeaderTwentyEight = () => {
  const { design, headerSetting, category, userData } = useTheme();

  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  //   const cartList = useSelector((state) => state.cart.cartList);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    setSearch("");
  };

  const changeNavbar = () => {
    if (window.scrollY >= 120) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600&display=swap');

    .navbarTwentyOne.openMenu {
        position: fixed;
        background: ${design?.header_color};
        color:  ${design?.text_color};
        opacity:1;
        width: 100%;
        z-index: 10;
        top:0;
        animation: fadeIn 0.2s ease-in both;

      }
    .cat-hover-thirty:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .menu-hover:hover {
        color:  ${design?.header_color};
    }
    .font-thirty {
       font-family: 'Noto Serif Bengali', serif;
    }
    h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
        font-family: 'Noto Serif Bengali', serif;
    }
 
    `;

  return (
    <div>
      <style>{styleCss}</style>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className="">
        {/* header top  */}
        <div className="bg-[#131522] text-white border-b">
          <div className="md:flex hidden justify-between items-center sm:container px-5 py-3">
            <div>
              <p className="text-sm font-medium">
                Welcome to {headerSetting?.website_name}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p>
                <FaPhoneSquareAlt className="inline text-xl" />{" "}
                {headerSetting?.phone}
              </p>
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
        </div>

        {/* header middle  */}
        <div className="bg-[#131522] text-white py-3">
          <div className="flex justify-between items-center sm:container px-5">
            <div className={``}>
              {headerSetting?.logo === null ? (
                <Link href="/">
                  <p className="text-xl uppercase">
                    {headerSetting?.website_name}
                  </p>
                </Link>
              ) : (
                <Link href="/">
                  <img
                    className="h-auto w-40 overflow-hidden"
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className="md:flex hidden bg-white items-center justify-between w-full border lg:mx-20 md:mx-3 relative rounded-full">
              <p
                onClick={() => setOpenCat(!openCat)}
                className="w-60 rounded-l-full bg-white text-black border-r cat-hover-thirty text-center py-2.5 px-2 md:lg:cursor-pointer font-medium"
              >
                ক্যাটেগরীজ
                <MdKeyboardArrowDown className="text-xl inline " />
              </p>
              <input
                type="text"
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="সার্চ করুন"
                className="w-full rounded-full text-black border-0 focus:outline-none focus:border-0 focus:ring-0"
              />
              <div onClick={handleClose} className="absolute top-2 right-2">
                {searchTxt.length !== 0 && (
                  <AiOutlineClose className="text-xl text-black" />
                )}
              </div>
              {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}

              {openCat && (
                <div className="flex flex-col absolute left-0 top-[44px] border-b bg-gray-50 w-[190px] rounded-lg text-black z-[5]">
                  {category?.map((cat: any) => (
                    <Link href={"/category/" + cat?.id} key={cat.id}>
                      <ul
                        className="border-b py-4 pl-4 cat-hover-thirty"
                        key={cat?.id}
                      >
                        <li className="text-sm font-medium">{cat?.name}</li>
                      </ul>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <a href={`tel:+88${headerSetting?.phone}`}>
                    <span>{headerSetting?.phone}</span>
                  </a>
                </div>
                <div
                  onClick={() => setCartOpen(!cartOpen)}
                  className="flex flex-col justify-center items-center relative lg:cursor-pointer"
                >
                  <RiShoppingBagLine className="text-2xl" />
                  <p
                    style={{
                      background: design?.header_color,
                      color: design?.text_color,
                    }}
                    className=" text-xs absolute -top-3 -right-3 rounded-full w-fit px-[5px] h-fit"
                  >
                    {/* {cartList.length} */}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                {/* Authenticate routes dropdown  */}
                {user?.verify ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
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
                    <p className="pr-1 lg:cursor-pointer">
                      <BiUser className="text-2xl" />
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* header bottom */}
        <div
          className="lg:cursor-pointer flex lg:hidden gap-x-1 justify-center items-center pb-5"
          onClick={() => setOpen(!open)}
        >
          <TableCellsIcon className="h-6" />
          <p>Menu</p>
        </div>

        <div
          style={{
            background: design?.header_color,
            color: design?.text_color,
          }}
          className={`${openMenu && "navbarTwentyOne openMenu"}`}
        >
          <div
            className={`lg:flex hidden justify-center sm:container px-5 gap-4 w-full`}
          >
            {category?.slice(0, 5).map((cat: any) => (
              <ul className="group relative px-5" key={cat?.id}>
                <Link
                  href={"/category/" + cat?.id}
                  className="flex items-center"
                >
                  <li className="text-lg font-medium py-2">{cat?.name}</li>
                  {cat?.cat != null && (
                    <MdKeyboardArrowDown
                      className={`text-lg group-hover:rotate-180 transition-all duration-500 ease-linear lg:cursor-pointer`}
                    />
                  )}
                </Link>
                {cat?.cat != null && (
                  <div className="lg:absolute z-[2] bg-white shadow-xl py-2 text-gray-500 w-[250px] top-[100%] group-hover:block hidden">
                    {cat?.cat?.map((subItem: any) => (
                      <div key={subItem.id}>
                        <div className="relative ">
                          <div className="px-6 py-1">
                            <Link href={"/category/" + subItem?.id}>
                              <h1 className={`menu-hover`}>{subItem.name} </h1>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ul>
            ))}
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

      <ul
        className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-20 lg:cursor-pointer ${
          open ? "left-0" : "left-[-160%]"
        }`}
      >
        <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden ">
          <h3>MENU</h3>
          <ArrowLeftIcon onClick={() => setOpen(!open)} className="h-7" />
        </div>
        <div className="px-6">
          <SideMenu setOpen={setOpen} />
        </div>
      </ul>
    </div>
  );
};

export default HeaderTwentyEight;
