"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiUser } from "react-icons/hi";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { AiFillShopping, AiOutlineMenu } from "react-icons/ai";
import { TbSearch } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useTheme from "@/hooks/use-theme";
import Search from "./search";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Category from "./category";

const HeaderEighteen = () => {
  const { headerSetting, design, category } = useTheme();

  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const [cat, setCat] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const { user } = useSelector((state: any) => state.auth);

  const changeNavbar = () => {
    if (window.scrollY >= 120) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const styleCss = `

    @import url('https://fonts.googleapis.com/css2?family=Saira&display=swap');

  
    .navbarSixteen.openMenu {
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
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
     }
    .text-color {
        color:  ${design?.header_color};
     }
    .text-hover:hover {
        color:  ${design?.header_color};
     }

     .icon-color {
        color:  ${design?.text_color};
     }
     

     .font-eighteen {
        font-family: 'Saira', sans-serif;
       }
       h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
        font-family: 'Saira', sans-serif;
       }
 
    `;

  return (
    <div>
      <div className={`${openMenu && "navbarSixteen openMenu "}`}>
        <div
          className={`grid sm:container px-5 items-center ${
            openMenu
              ? "lg:pt-0 lg:grid-cols-5 grid-cols-3 lg:py-0 py-4"
              : "grid-cols-3 lg:pt-8 py-4 lg:py-0 "
          }`}
        >
          <style>{styleCss}</style>
          <div
            className={`w-full bg-white fixed top-0 left-0 h-[150px] z-[15] duration-500 ${
              searchInput === true ? "mt-0" : "-mt-[150px]"
            }`}
          >
            <div className=" container xl:px-20 px-5 w-full relative">
              <div className="flex justify-between pt-8 pb-4">
                <h1 className="text-sm font-medium ">
                  What are you Looking for?
                </h1>
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
                  value={searchTxt}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="w-full border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 p-0 pb-2 text-2xl text-black"
                  placeholder="SEARCH PRODUCTS "
                />

                <IoIosSearch className="text-3xl absolute top-0 right-0 lg:cursor-pointer text-gray-500" />
              </div>
              <div className="w-full flex justify-center">
                {searchTxt && (
                  <Search search={searchTxt} setSearch={setSearch} />
                )}
              </div>
            </div>
          </div>
          <div
            className={`col-span-1 justify-self-start ${
              openMenu && "lg:hidden block"
            }`}
          >
            <div
              onClick={() => setOpen(!open)}
              className="lg:cursor-pointer lg:hidden block"
            >
              <AiOutlineMenu
                className={`text-2xl ${
                  openMenu ? "icon-color" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          <div
            className={`col-span-1  ${
              openMenu
                ? "lg:justify-self-start justify-self-center"
                : "justify-self-center"
            }`}
          >
            <div className="">
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
          </div>

          <div
            className={`${
              openMenu ? "col-span-3 lg:-ml-20" : "col-span-3 order-last"
            } justify-self-center lg:block hidden`}
          >
            <Category openMenu={openMenu} />
          </div>
          <div
            className={`col-span-1 justify-self-end flex gap-5 items-center`}
          >
            <div onClick={() => setSearchInput(!searchInput)}>
              <TbSearch
                className={`text-xl lg:cursor-pointer mt-1 ${
                  openMenu ? "icon-color" : "text-hover text-gray-500"
                }`}
              />
            </div>
            <div className="relative">
              <AiFillShopping
                className={`text-xl lg:cursor-pointer ${
                  openMenu ? "icon-color" : "text-hover text-gray-500"
                }`}
              />
              {/* <div className='absolute h-6 w-6 rounded-full bg-gray-500 flex items-center justify-center top-4 -right-2'>
                        <p className='text-red-100 text-sm'>{cartList.length}</p>
                    </div> */}
            </div>
            <div>
              {/* My account dropdown menu start */}
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full ">
                    <HiUser
                      className={`text-xl mt-2 ${
                        openMenu ? "icon-color" : "text-hover text-gray-500"
                      }`}
                    />
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
                  <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            My account
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/checkout"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Checkout
                          </Link>
                        )}
                      </Menu.Item>
                      {user?.verify ? (
                        <Menu.Item>
                          {({ active }) => (
                            <div>
                              <Link
                                href="/login"
                                // onClick={() => dispatch(logout())}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            </div>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Sign in
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* My account dropdown menu finished */}
            </div>
          </div>
        </div>
      </div>
      {/* tablet and mobile view  */}

      <div className={`px-4`}>
        <div
          className={`pt-5 overflow-hidden top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-20 lg:cursor-pointer ${
            open ? "left-0 " : "left-[-140%] "
          }`}
        >
          <div className="pb-7 pt-3 px-6">
            <div
              onClick={() => setOpen(!open)}
              className="flex gap-1 items-center border-b-[2px] pb-2 text-color"
            >
              <VscClose className="text-lg inline-block" />
              <p className="text-sm text-hover">Close</p>
            </div>
            <div className="mt-3">
              {category?.map((item: any) => (
                <SingleCat
                  key={item?.id}
                  item={item}
                  sub={sub}
                  setSub={setSub}
                  cat={cat}
                  setCat={setCat}
                />
              ))}
            </div>
          </div>

          <div className="">
            {category?.map((item: any) => (
              <div key={item?.id}>
                {item.name === cat && item.cat !== null ? (
                  <div
                    className={`pt-5 top-0 bg-white duration-500 absolute md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-30 lg:cursor-pointer ${
                      sub ? "right-0" : "right-[-140%] "
                    }`}
                  >
                    <div className="pb-7 pt-3 px-6">
                      <div
                        onClick={() => setSub(!sub)}
                        className="flex gap-1 items-center border-b-[2px] pb-2 text-color"
                      >
                        <VscClose className="text-lg inline-block" />
                        <p className="text-sm text-hover">Back</p>
                      </div>
                      <div className="mt-3">
                        <div className="flex flex-col gap-5">
                          <Link href={"/category/" + item.id}>
                            <h1 className="text-xl text-hover">{item?.name}</h1>
                          </Link>
                          {item.cat.map((sub: any, idx: number) => (
                            <Link href={"/category/" + sub?.id} key={idx}>
                              <p className="text-hover">{sub.name}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  " "
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderEighteen;

const SingleCat = ({ item, setSub, sub, cat, setCat }: any) => {
  return (
    <>
      <div className="w-full flex py-1">
        {item.cat === null ? (
          <Link
            href={"/category/" + item.id}
            onClick={() => {
              cat !== item.name && setCat(item.name);
              setSub(!sub);
            }}
            className="flex-1 text-lg font-thin text-gray-500 text-hover"
          >
            {" "}
            <p>{item.name}</p>
          </Link>
        ) : (
          <p
            className="flex-1 text-lg font-thin text-gray-500 text-hover"
            onClick={() => {
              cat !== item.name && setCat(item.name);
              setSub(!sub);
            }}
          >
            {item.name}
          </p>
        )}
        {item?.cat ? (
          <div className="px-4 h-full">
            <MdOutlineKeyboardArrowRight
              onClick={() => {
                cat !== item.name && setCat(item.name);
                setSub(!sub);
              }}
              className="h-4 w-4 text-gray-800 text-hover"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};
