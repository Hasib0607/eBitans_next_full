"use client";
import React, { useState, Fragment, useEffect } from "react";
import { AiFillLinkedin, AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { GrInstagram, GrYoutube } from "react-icons/gr";
import { HiMenu } from "react-icons/hi";
import {
  IoIosArrowForward,
  IoIosClose,
  IoIosSearch,
  IoLogoWhatsapp,
} from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { BiBarChart } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { BottomCart } from "../card-popup-three";
import Search from "./search";
import Link from "next/link";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Taka from "@/utils/taka";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SideMenu from "../header-three/side-menu";
import useTheme from "@/hooks/use-theme";

const HeaderTwentyOne = () => {
  const {
    category,
    design,
    subcategory,
    headerSetting,
    menu,
    userData,
    store_id,
  } = useTheme();
  const [openCat, setOpenCat] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [searchTxtUp, setSearchUp] = useState("");
  const [heading, setHeading] = useState("");
  const [active, setActive] = useState(true);
  const [border, setBorder] = useState(true);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  // cart list and total price
  // const cartList = useSelector((state) => state.cart.cartList);
  // const priceList = cartList?.map((p) => p.qty * p.price);
  // const total = priceList.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue,
  //   0
  // );

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
    setSearchUp("");
  };

  // for category open
  if (openCat === true) {
    setTimeout(() => {
      setActive(false);
    }, 800);
  } else {
    setTimeout(() => {
      setActive(true);
    }, 0);
  }
  if (openCat === true) {
    setTimeout(() => {
      setBorder(false);
    }, 0);
  } else {
    setTimeout(() => {
      setBorder(true);
    }, 1000);
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    // sticky navbar
    const changeNavbar = () => {
      if (window.scrollY >= 120) {
        setOpenMenu(true);
        setOpenCat(false);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  // CSS START FROM HERE

  const styleCss = `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');
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
        border: 1px solid ${design?.text_color};
      }
    
      
      .font-twenty-one {
        font-family: 'Libre Franklin', sans-serif;
      }
    
      h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Libre Franklin', sans-serif;
      }
      
    
        `;

  return (
    <div className="">
      <style>{styleCss}</style>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      {/* sticky nav search  */}
      <div
        className={`w-full bg-white fixed top-0 left-0 h-[150px] z-[100] duration-500 ${
          searchInput === true ? "mt-0" : "-mt-[150px]"
        }`}
      >
        <div className=" sm:container px-5 xl:px-24 w-full relative">
          <div className="flex justify-between pt-8 pb-4">
            <h1 className="text-sm font-medium ">What are you Looking for?</h1>
            <p
              style={{ color: design?.header_color }}
              className=""
              onClick={handleClose}
            >
              <IoIosClose className="text-3xl lg:cursor-pointer" />
            </p>
          </div>
          <div className="w-full text-center relative">
            <input
              value={searchTxtUp}
              onChange={(e) => setSearchUp(e.target.value)}
              type="text"
              className="w-full border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 p-0 pb-2 text-2xl text-black"
              placeholder="SEARCH PRODUCTS "
            />
            <IoIosSearch className="text-3xl absolute top-0 right-0 lg:cursor-pointer text-gray-500" />
          </div>
          <div className="w-full flex justify-center ">
            {searchTxtUp && (
              <Search search={searchTxtUp} setSearch={setSearchUp} />
            )}
          </div>
        </div>
      </div>

      {/* top menu  */}
      <div className="">
        <div className="flex justify-between items-center sm:container px-5 py-3">
          <div>
            {headerSetting?.email && (
              <a href={`mailto:${headerSetting?.email}`}>
                <SiGmail className="text-red-400" />
              </a>
            )}
          </div>
          <div>
            <div className="flex justify-center items-center gap-4">
              {headerSetting?.facebook_link && (
                <a
                  href={headerSetting?.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-lg text-[#1873EB]" />
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
                  <IoLogoWhatsapp className="text-lg text-[#2BB741]" />
                </a>
              )}

              {headerSetting?.instagram_link && (
                <a
                  href={headerSetting?.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GrInstagram className="text-lg text-[#C93D81]" />
                </a>
              )}

              {headerSetting?.youtube_link && (
                <a
                  href={headerSetting?.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GrYoutube className="text-lg text-[#FF0000]" />
                </a>
              )}
              {headerSetting?.lined_in_link && (
                <a
                  href={headerSetting?.lined_in_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin className="text-lg text-[#0077B5]" />
                </a>
              )}
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* middle menu  */}

      <div
        className={`${
          (store_id === 3601 || store_id === 3904) && "bg-color"
        } pt-3`}
      >
        <div className="flex justify-between items-center sm:container px-5 pb-3">
          <div onClick={() => setOpen(!open)} className="lg:hidden block">
            <HiMenu className="text-3xl" />
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
                  className="h-16"
                  src={imgUrl + headerSetting.logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className="lg:block hidden">
            <div className="xl:w-[700px] lg:w-[600px] relative">
              <div className=" relative overflow-hidden pl-16">
                <div>
                  <input
                    value={searchTxt}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Enter your search key ..."
                    className="w-full py-3 outline-none focus:outline-none focus:border-gray-200 border-gray-200 focus:ring-0"
                  />
                </div>
                <div className="bg-black all-hover text-white lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-4">
                  {searchTxt.length === 0 ? (
                    <BsSearch className="text-xl" />
                  ) : (
                    <AiOutlineClose
                      onClick={handleClose}
                      className="text-xl lg:cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="absolute z-[15] top-14 left-0 pl-16 w-full">
                {searchTxt && (
                  <Search search={searchTxt} setSearch={setSearch} />
                )}
              </div>
            </div>
          </div>
          <div className="lg:flex items-center gap-3">
            {/* Authenticate routes dropdown  */}
            {user?.verify ? (
              <Menu as="div" className="ml-3 relative lg:block hidden">
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
                <FiUser className="text-3xl font-semibold lg:block hidden" />
              </Link>
            )}

            {store_id !== 6227 && (
              <>
                <div
                  onClick={() => setCartOpen(!cartOpen)}
                  className="flex flex-col justify-center items-center relative lg:cursor-pointer"
                >
                  <GiShoppingCart className="text-3xl font-thin" />
                  <p
                    style={{
                      background: design?.header_color,
                      color: design?.text_color,
                    }}
                    className=" text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                  >
                    {/* {cartList.length} */}
                  </p>
                </div>
                <div className="ml-2 lg:block hidden">
                  <p className={`text-sm`}>My Cart</p>
                  <p className={`text-sm font-bold `}>
                    {/* <Taka tk={parseInt(total)} /> */}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* bottom menu */}

      {/* category section  */}
      <div
        className={`${
          openMenu && "navbarTwentyOne openMenu py-3"
        } bg-color lg:block hidden`}
      >
        <div
          className={`${
            openMenu ? "justify-between" : ""
          } flex gap-10 items-center sm:container px-5`}
        >
          <div className={`lg:block  hidden relative`}>
            <div
              onClick={() => setOpenCat(!openCat)}
              className={`bg-black text-[14px] flex justify-between lg:cursor-pointer px-3 gap-2 py-4 items-center z-[12] relative w-60  ${
                openMenu ? "hidden" : "block"
              }`}
            >
              <div>
                <BiBarChart className="text-[28px] text-white rotate-90" />
              </div>
              <div>
                <h1 className="font-medium text-white">ALL CATEGORIES</h1>
              </div>
              <div>
                <RiArrowDownSLine className="text-[28px] text-white" />
              </div>
            </div>
            <div className={`${openMenu ? "block" : "hidden"}`}>
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

            <div
              className={` z-10 w-60 absolute bg-white text-black left-0 top-[72px]`}
            >
              <ul
                onMouseLeave={() => setHeading("")}
                className={`flex flex-col font-twelve menu-twelve ${
                  openCat ? "max-h-[1000px] " : "max-h-[0] "
                } ${active ? "overflow-hidden" : ""} ${
                  border ? "border-0" : "border-cat"
                }`}
              >
                {category.map((item: any) => (
                  <div key={item.id} className="relative">
                    <li
                      onClick={() => setOpenCat(!openCat)}
                      onMouseEnter={() => {
                        heading !== item.name
                          ? setHeading(item.name)
                          : setHeading("");
                      }}
                      className="group relative hover:bg-gray-100 w-full rounded"
                    >
                      <Link href={"/category/" + item?.id}>
                        <h1
                          className={`menu-hover group p-3 font-twelve text-[13px] hover:font-bold `}
                        >
                          {item.name}
                        </h1>
                      </Link>
                      {subcategory.map((dataId: any) => (
                        <div key={dataId.id}>
                          {item.id === Number(dataId.parent) && (
                            <IoIosArrowForward
                              className={`h-4 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-5 top-3 `}
                            />
                          )}
                        </div>
                      ))}
                    </li>

                    <div
                      className={`z-50 bg-white py-2 lg:cursor-pointer absolute -right-60 top-0 flex flex-col rounded-lg`}
                    >
                      {subcategory.map((subItem: any) => (
                        <div key={subItem.id} className={`relative`}>
                          {item.id === Number(subItem.parent) && (
                            <div
                              onClick={() => setOpenCat(!openCat)}
                              className={`min-w-[240px] px-3 text-[13px] font-twelve leading-loose capitalize ${
                                heading === item.name ? "lg:block" : "hidden"
                              }`}
                            >
                              <Link href={"/category/" + subItem?.id}>
                                <h1 className="hover:scale-105 menu-hover">
                                  {subItem.name}{" "}
                                </h1>
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/* menu section  */}
          <div className="flex gap-5 uppercase text-[14px] ">
            {menu?.map((menu: any) => (
              <ul key={menu.id}>
                <Link href={menu.url}>
                  <li className="duration-500 px-3 py-1.5 border border-transparent border-hover-menu rounded-full">
                    {menu.name}
                  </li>
                </Link>
              </ul>
            ))}
          </div>
          {/* design for sticky navbar  */}
          <div>
            <div
              className={`${openMenu ? "flex items-center gap-x-2" : "hidden"}`}
            >
              <div onClick={() => setSearchInput(!searchInput)}>
                <BsSearch className="text-xl lg:cursor-pointer" />
              </div>
              <div>
                {/* Authenticate routes dropdown  */}
                {user?.verify ? (
                  <Menu as="div" className="ml-3 relative lg:block hidden">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={profileImg + userData?.image}
                            alt=""
                            className="object-fit"
                          />
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
                                    "lg:cursor-pointer block px-4 py-2 text-sm text-gray-700"
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
                                  "lg:cursor-pointer block px-4 py-2 text-sm text-gray-700"
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
                    <FiUser className="text-3xl font-semibold lg:block hidden" />
                  </Link>
                )}
              </div>
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
    </div>
  );
};

export default HeaderTwentyOne;
