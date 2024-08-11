"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import Search from "../header-ten/search";
import { imgUrl } from "@/site-settings/siteUrl";
import { headerBg } from "@/site-settings/color";
import useTheme from "@/hooks/use-theme";

const HeaderElevenHeaderMenu = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { headerSetting, design } = useTheme();
  const [searchTxt, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => {
    setSearch("");
  };

  const bgColor = design?.header_color;

  //   const cartList = useSelector((state) => state.cart.cartList);

  //   const logOut = () => {
  //     dispatch(logout());
  //   };
  return (
    <div>
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className=" flex justify-between items-center bg-white sm:container px-5 my-2">
        <div>
          <Link href="/">
            {!headerSetting?.logo ? (
              <p>{headerSetting?.website_name}</p>
            ) : (
              <img
                className="h-[45px] w-auto overflow-hidden"
                src={imgUrl + headerSetting?.logo}
                alt="logo"
              />
            )}
          </Link>
        </div>

        <div className="lg:basis-3/6 w-full h-12">
          <div className=" relative overflow-hidden">
            <div>
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Enter your search key ..."
                className="bg-white h-11 w-full  outline-none focus:outline-none focus:border-gray-200 search-border focus:ring-0 z-50"
              />
            </div>
            <div
              style={{ height: "70px" }}
              className="searchHover lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-3"
            >
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

          <div className="relative">
            {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
          </div>
        </div>

        <div className="flex items-center relative gap-4">
          <div
            onClick={() => setCartOpen(!cartOpen)}
            className="relative group flex gap-1 items-center"
          >
            <div className="flex items-center">
              <p className={`pr-1 lg:cursor-pointer`}>
                <HiOutlineShoppingBag className="text-3xl font-thin" />{" "}
              </p>
              {/* <p
                style={{ background: bgColor, color: design?.text_color }}
                className="bg-[#c0b07d] text-sm text-white mb-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
              >
                {cartList.length}
              </p> */}
            </div>
            <div>
              <p
                className={`text-sm lg:cursor-pointer mt-1 hover:text-[${headerBg}]`}
              >
                Cart
              </p>
            </div>
          </div>

          <div className="relative group flex gap-1 items-center ml-3">
            <div className="flex items-center">
              <p className={`pr-1 lg:cursor-pointer`}>
                <MdOutlineManageAccounts className="text-3xl font-thin" />{" "}
              </p>
            </div>
            <div>
              <p
                className={`text-sm lg:cursor-pointer mt-1 hover:text-[${headerBg}]`}
              >
                Account
              </p>
            </div>

            <div className="absolute z-50 group-hover:block hidden shadow-md rounded-lg bg-white w-[150px] top-[30px] left-[-80%] lg:cursor-pointer">
              {isLoggedIn === true ? (
                <div className="relative ">
                  <div className="px-6 py-4">
                    <Link href="/profile">
                      {" "}
                      <div className="flex gap-2 mb-2">
                        <RiAccountPinCircleFill className="text-2xl font-thin" />
                        <h1>Profile </h1>
                      </div>
                    </Link>
                    <div
                    //  onClick={() => logOut()}
                    >
                      <div className="flex gap-2">
                        <BiLogOut className="text-2xl font-thin" />
                        <h1 style={{ color: design?.text_color }}>Logout </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative ">
                  <div className="px-6 py-4">
                    <Link href="/login">
                      {" "}
                      <div className="flex gap-2 mb-2">
                        <MdOutlineManageAccounts className="text-2xl font-thin" />
                        <h1>Login </h1>
                      </div>
                    </Link>
                    <Link href="/sign-up">
                      <div className="flex gap-2">
                        <MdOutlineAccountCircle className="text-2xl font-thin" />
                        <h1>Register </h1>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='w-128 absolute top-20 right-60'>
                {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
            </div> */}
    </div>
  );
};

export default HeaderElevenHeaderMenu;
