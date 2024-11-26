"use client";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { useState, FC } from "react";
import Link from "next/link";
import { BottomCart } from "@/components/shopping-cart/cart-popup-three";
import { motion, AnimatePresence } from "framer-motion";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import useTheme from "@/hooks/use-theme";
import { useSelector } from "react-redux";
import Search from "@/components/headers/header-seven/search";
import { iconImg } from "@/site-settings/siteUrl";

const MobileNavFour = () => {
  const { category, design } = useTheme();
  const [cart, setCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchshow, setSearchshow] = useState(false);

  const cartList = useSelector((state: any) => state.cart.cartList);

  const styleCss = `
      .cart-color {
          background: ${design?.header_color};
          color: ${design?.text_color};
      }
    `;

  return (
    <>
      <style>{styleCss}</style>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-6 lg:cursor-pointer"
        ></div>
      )}
      <div className="lg:hidden h-[65px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 grid grid-cols-5 px-1 items-center fixed bottom-0 left-0 right-0 z-10 py-2">
        <div
          onClick={() => {
            setOpen(!open);
            setSearchshow(false);
          }}
          className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
        >
          <div className="sm:h-5 h-4">{gridIcon}</div>
          <h3 className="font-semibold sm:text-base text-xs mt-2">Category</h3>
        </div>
        <div
          onClick={() => {
            setSearchshow(!searchshow);
            setOpen(false);
          }}
          className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
        >
          <div className="sm:h-5 h-4">{searchIcon}</div>
          <h3 className="font-semibold sm:text-base text-xs mt-2">Search</h3>
        </div>
        <Link href="/" passHref>
          <div
            onClick={() => setOpen(false)}
            className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
          >
            <HomeIcon className="sm:h-5 h-6" />
            <h3 className="font-semibold sm:text-base text-xs">Home</h3>
          </div>
        </Link>
        <div
          onClick={() => {
            setCart(!cart);
            setOpen(false);
          }}
          className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
        >
          <div className="relative">
            <ShoppingCartIcon className="sm:h-5 h-6" />
            <h3 className="font-semibold sm:text-base text-xs">Cart</h3>
            {cartList.length > 0 && (
              <div className="sm:h-6 h-4 w-4 sm:w-6 absolute top-0 -right-2 rounded-full cart-color flex items-center justify-center">
                <p className="sm:text-sm text-xs">{cartList.length}</p>
              </div>
            )}
          </div>
          <BottomCart open={cart} setOpen={setCart} />
        </div>
        <Link href="/profile" passHref>
          <div
            onClick={() => setOpen(false)}
            className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
          >
            <UserIcon className="sm:h-5 h-6" />
            <h3 className="font-semibold sm:text-base text-xs">User</h3>
          </div>
        </Link>
      </div>

      <div className={`px-4 z-[7]`}>
        <ul
          className={`pt-5 fixed md:w-96 w-64 sm:w-80 overflow-y-auto top-0 min-h-[100vh] pb-5 z-[7] bg-white duration-500 ${
            open ? "left-0 " : "left-[-140%] "
          }`}
        >
          <div className="pb-7 pt-3 px-6">
            <div className="text-xl border-b-[2px] pb-5 text-center text-color flex justify-between items-center">
              <p>Category</p>
              <div onClick={() => setOpen(!open)} className="h-8">
                {cancelIcon}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[90%]">
              {category?.map((item: any) => (
                <SingleCat
                  key={item?.id}
                  item={item}
                  open={open}
                  setOpen={setOpen}
                />
              ))}
            </div>
          </div>
        </ul>
      </div>

      <AnimatePresence>
        {searchshow && <SearchDiv setSearchshow={setSearchshow} />}
      </AnimatePresence>
    </>
  );
};

export default MobileNavFour;

interface SearchDivProps {
  setSearchshow: (show: boolean) => void;
}

const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow }) => {
  const [searchTxt, setSearchTxt] = useState("");
  return (
    <>
      <div
        onClick={() => setSearchshow(false)}
        className="fixed inset-0 text-right"
      ></div>
      <motion.div
        initial={{ y: -42, opacity: 0 }}
        animate={{ y: 42, opacity: 1 }}
        exit={{ y: 74, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.8 }}
        className="w-full h-8 fixed px-2 -top-9 left-0 right-0 z-[11]"
      >
        <input
          type="text"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
          className="w-full py-3 rounded-md px-10 border-0 outline-0 focus:outline-0 focus:border focus:border-gray-300 z-10 focus:ring-0"
          placeholder="Search"
        />
        <div className="h-5 w-5 absolute top-4 left-4 font-bold z-10">
          {searchIcon}
        </div>
        <div
          onClick={() => {
            setSearchTxt("");
            setSearchshow(false);
          }}
          className="h-4 w-4 absolute top-4 right-4 font-bold z-[4]"
        >
          {cancelIcon}
        </div>
        <div className="w-[95%] absolute top-10 left-1/2 -translate-x-1/2 ">
          {searchTxt && <Search search={searchTxt} setSearch={setSearchTxt} />}
        </div>
      </motion.div>
    </>
  );
};

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  cat?: CategoryItem[]; // Optional subcategories
}

// Define the props interface for SingleCat
interface SingleCatProps {
  item: CategoryItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SingleCat: React.FC<SingleCatProps> = ({ item, open, setOpen }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex py-3 lg:cursor-pointer">
        <Link href={`/category/${item.id}`} passHref>
          <div
            onClick={() => setOpen(!open)}
            className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
          >
            <img src={`${iconImg}${item?.icon}`} alt="" className="h-5" />
            <p>{item.name}</p>
          </div>
        </Link>
        {item?.cat && (
          <div className="px-4 h-full">
            {show ? (
              <MinusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800"
              />
            ) : (
              <PlusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800"
              />
            )}
          </div>
        )}
      </div>

      {show && (
        <div className="ml-8">
          {item?.cat?.map((sub) => (
            <div className="py-2" key={sub?.id}>
              <Link href={`/category/${sub.id}`} passHref>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-x-2 pb-2"
                >
                  <img src={`${iconImg}${sub?.icon}`} alt="" className="h-5" />
                  <p className="text-sm text-gray-500">{sub?.name}</p>
                </div>
              </Link>
              <div className="pr-4">
                <div className="h-[1px] bg-gray-200 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const gridIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    width="25"
  >
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
  </svg>
);

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentcolor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const cancelIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);
const cancelIcon2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="size-6"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const cartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    width="25"
  >
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
  </svg>
);

const homeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    width="25"
    className="hoverIcon"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    width="25"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    ></path>
  </svg>
);
