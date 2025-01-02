"use client";
import useTheme from "@/hooks/use-theme";
import { imgUrl, profileImg } from "@/site-settings/siteUrl";
import Taka from "@/utils/taka";
import { Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { FiBarChart } from "react-icons/fi";
import { HiMenu, HiShoppingCart } from "react-icons/hi";
import { ImUser } from "react-icons/im";
import { TbPhoneCall } from "react-icons/tb";
import { TiArrowSortedUp } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { BottomCart } from "../card-popup-three";
import SideMenu from "../header-three/side-menu";
import defaultUserImage from "@/assets/default-user-image.png";
import Search from "./search";

const HeaderFortyTwo = ({ headerSetting }: any) => {
  const { category, design, subcategory, menu, userData } = useTheme();

  const [openCat, setOpenCat] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [heading, setHeading] = useState("");
  const [active, setActive] = useState(true);
  const [border, setBorder] = useState(true);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const cartList = useSelector((state: any) => state.cart.cartList);
  const priceList = cartList?.map((p: any) => p.qty * p.price);
  const total = priceList.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    0
  );

  const handleClose = () => {
    setSearch("");
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

  const handleClick = () => {
    if (window !== undefined) {
      window.localStorage.removeItem("persist:root");

      window.location.href = "/";
    }
  };

  // CSS START FROM HERE

  const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap');
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

      .bg-color-in-header {
          color:  ${design?.header_color};
          background: ${design?.text_color};
      }
    
      
      .font-twenty-one {
        font-family: 'Work Sans', sans-serif;
      }
    
      h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Work Sans', sans-serif;
      }
        `;

  return (
    <div className="">
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <style>{styleCss}</style>

      {/* top menu  */}
      <div className="flex justify-between items-center sm:container px-5 py-3">
        <div className="flex items-center justify-between gap-x-5 w-full">
          <div onClick={() => setOpen(!open)} className="lg:hidden block">
            {/* hamburgur */}
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
                  className="h-10"
                  src={imgUrl + headerSetting?.logo}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className="lg:block hidden w-full rounded-md">
            <div className="w-full relative">
              <div className="relative overflow-hidden rounded-md">
                <div>
                  <input
                    value={searchTxt}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Enter your search key ..."
                    className="w-full py-2 pl-3 outline-none focus:outline-none rounded-md focus:border-gray-200 border focus:ring-0"
                  />
                </div>
                <div
                  onClick={handleClose}
                  className="bg-color all-hover text-white lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-3"
                >
                  {searchTxt.length === 0 ? (
                    <BsSearch className="text-xl" />
                  ) : (
                    <AiOutlineClose className="text-xl lg:cursor-pointer" />
                  )}
                </div>
              </div>
              <div
                className={`absolute z-[15] top-14 left-0 w-full ${
                  openMenu ? "hidden" : "block"
                }`}
              >
                {searchTxt && (
                  <Search search={searchTxt} setSearch={setSearch} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex hidden items-center justify-end gap-x-3 w-full">
          <div className="xl:flex hidden items-center gap-1 bg-color py-2 px-4 rounded-md font-bold">
            <TbPhoneCall className="text-green-500" />
            <p>{headerSetting?.phone}</p>
          </div>
          <div className="lg:flex hidden items-center gap-3">
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
                          src={defaultUserImage.src}
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
                              onClick={() => handleClick()}
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
              <Menu as="div" className="ml-3 relative lg:block hidden">
                <div>
                  <Menu.Button className="bg-gray-800 flex font-bold rounded-full focus:outline-none ">
                    <div className="flex items-center bg-color py-2 px-4 rounded-md">
                      <ImUser className="text-xl text-orange-800" />
                      <FaBars className="font-semibold text-orange-800 mr-1 lg:block hidden" />
                      <p>My Account</p>
                    </div>
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
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
          <div
            onClick={() => setCartOpen(!cartOpen)}
            className="lg:flex hidden items-center gap-3 lg:cursor-pointer"
          >
            <p>
              {cartList?.length} item(s) - <Taka />
              {total}
            </p>
            <div className="bg-color py-2 px-2 rounded-md">
              <HiShoppingCart className="text-xl" />
            </div>
          </div>
        </div>
      </div>
      {/* category show in small device */}
      <div
        className="lg:hidden block bg-color"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="sm:container py-3 px-5 flex justify-center w-max  overflow-x-auto whitespace-nowrap text-white">
          {category?.slice(0, 5).map((cat: any, index: number) => (
            <div key={cat.id} className="flex items-center">
              <Link href={"/category/" + cat?.id}>
                <ul className="">
                  <li className="font-medium uppercase">{cat?.name}</li>
                </ul>
              </Link>
              {index < category.slice(0, 5).length - 1 && (
                <span className="mx-2 text-white">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* category section  */}
      <div
        className={`${
          openMenu && "navbarTwentyOne openMenu"
        } bg-color items-center lg:flex hidden`}
      >
        <div className="sm:container px-5 flex justify-between items-center">
          <div
            className={`${
              openMenu ? "justify-between" : ""
            } flex gap-10 items-center`}
          >
            <div className={`lg:block  hidden relative`}>
              <div
                onClick={() => setOpenCat(!openCat)}
                className={`bg-color-in-header text-[14px] flex justify-between lg:cursor-pointer pl-3 pr-12 gap-2 py-2 items-center z-[12] relative w-max`}
              >
                <div>
                  <FiBarChart className="text-[28px] text-white rotate-90" />
                </div>
                <div>
                  <h1 className="font-medium text-white text-sm">
                    All Categories
                  </h1>
                </div>
              </div>
              {openCat && (
                <div className="absolute bg-red-500 h-4 w-4 left-5 top-[50px] z-[9] rotate-45"></div>
              )}
              <div
                className={` z-10 w-60 absolute bg-white text-black left-0 top-[55px]`}
              >
                <ul
                  onMouseLeave={() => setHeading("")}
                  className={`flex flex-col font-twelve menu-twelve ${
                    openCat ? "max-h-[1000px] " : "max-h-[0] "
                  } ${active ? "overflow-hidden" : ""} ${
                    border ? "border-0" : "border-cat"
                  }`}
                >
                  {category?.map((item: any) => (
                    <div key={item.id} className="">
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
                            className={`group px-3 py-2 font-twelve text-[13px] hover:font-bold`}
                          >
                            {item.name}
                          </h1>
                        </Link>
                        {subcategory.map((dataId: any) => (
                          <div key={dataId.id}>
                            {item.id === Number(dataId.parent) && (
                              <TiArrowSortedUp
                                className={`h-4 rotate-90 text-gray-500 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-5 top-3 `}
                              />
                            )}
                          </div>
                        ))}
                      </li>

                      <div
                        className={`z-50 bg-gray-100 py-2 lg:cursor-pointer absolute left-[100%] top-0 h-full flex flex-col`}
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
                                  <h1 className="hover:ml-2 border-b duration-300 font-medium">
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
            <div className={`flex gap-5 uppercase text-sm`}>
              {menu?.slice(0, 6)?.map(
                (menu: any) =>
                  menu.status == 1 && (
                    <ul key={menu.id}>
                      <Link
                        href={
                          menu?.custom_link ||
                          (menu?.url ? `/${menu?.url}` : "/")
                        }
                      >
                        <li className="duration-500 px-3 py-1.5 hover:text-yellow-200 rounded-full">
                          {menu.name}
                        </li>
                      </Link>
                    </ul>
                  )
              )}
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
        {/* menu */}
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
                    src={imgUrl + headerSetting?.logo}
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

export default HeaderFortyTwo;