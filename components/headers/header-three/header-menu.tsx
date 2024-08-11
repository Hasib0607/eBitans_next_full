"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Category from "./category";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { headerBg } from "@/site-settings/color";
import Taka from "@/utils/taka";
import Search from "./search";

const HeaderMenu = () => {
  const { headerSetting, design } = useTheme();
  const [searchTxt, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(false);
  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverBag, setHoverBag] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => {
    setSearchInput(false);
    setSearch("");
  };

  const bgColor = design?.header_color;

  const cartList = useSelector((state: any) => state.cart.cartList);
  const priceList = cartList?.map((p: any) => p.qty * p.price);
  const total = priceList.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    0
  );

  return (
    <div className="relative">
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      <div className=" flex justify-between items-center">
        <div>
          {headerSetting?.logo === null ? (
            <Link href="/">
              <p className="text-xl uppercase">{headerSetting?.website_name}</p>
            </Link>
          ) : (
            <Link href="/">
              <img
                className="h-[45px] w-auto overflow-hidden"
                src={imgUrl + headerSetting.logo}
                alt="logo"
              />
            </Link>
          )}
        </div>

        <div>
          <div className="flex-row items-center hidden gap-7 xl:gap-5 text-sm font-bold list-none lg:cursor-pointer md:flex">
            <Category />
          </div>
        </div>
        <div className="flex items-center relative gap-3">
          <div className="flex items-center relative">
            <p
              style={{
                color: hoverSearch ? bgColor : "",
              }}
              onMouseEnter={() => setHoverSearch(true)}
              onMouseLeave={() => setHoverSearch(false)}
              className="lg:cursor-pointer absolute right-2"
              onClick={() => setSearchInput(!searchInput)}
            >
              <BsSearch className="text-2xl" />
            </p>
            {searchInput && (
              <div className="absolute -top-6 ">
                <input
                  value={searchTxt}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="xl:w-60  absolute -left-60 lg:w-60 border-gray-300 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black"
                  placeholder="Search your products "
                />
                <XMarkIcon className="absolute z-10" />
                <p
                  style={{ color: headerBg }}
                  className="absolute z-10 -left-6 top-3"
                  onClick={handleClose}
                >
                  <AiOutlineClose className="text-xl lg:cursor-pointer" />
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-1 items-center">
            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="flex items-center"
            >
              <p
                style={{
                  color: hoverBag ? bgColor : "",
                }}
                onMouseEnter={() => setHoverBag(true)}
                onMouseLeave={() => setHoverBag(false)}
                className={`pr-1 lg:cursor-pointer`}
              >
                <HiOutlineShoppingBag className="text-3xl font-thin" />
              </p>
              <p
                style={{ background: bgColor, color: design?.text_color }}
                className="bg-[#c0b07d] text-sm text-white mt-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
              >
                {cartList.length}
              </p>
            </div>
            <div>
              <p
                className={`text-lg font-bold lg:cursor-pointer mt-1 hover:text-[${headerBg}]`}
              >
                <Taka tk={total} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-128 absolute top-5 right-28">
        {searchTxt && <Search search={searchTxt} setSearch={setSearch} />}
      </div>
    </div>
  );
};

export default HeaderMenu;
