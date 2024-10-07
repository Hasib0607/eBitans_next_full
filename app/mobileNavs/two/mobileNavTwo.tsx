"use client";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { useState, FC } from "react";
import Link from "next/link"; // Use Next.js Link for routing
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "@/components/shopping-cart/cart-popup-three";
import { motion, AnimatePresence } from "framer-motion";
import Search from "@/components/headers/header-four/search";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { iconImg } from "@/site-settings/siteUrl";

const MobileNavTwo = () => {
  const [active, setActive] = useState("home");
  const { design, category } = useTheme();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [searchshow, setSearchshow] = useState(false);

  const cartList = useSelector((state: any) => state.cart.cartList);

  const styles = `
    .hoverIcon{
        color:${design?.header_color};
    }
    .cart-color {
        background: ${design?.header_color};
        color: ${design?.text_color};
    }
    `;

  const topBorder = `h-[4px] rounded-b-lg opacity-0 invisible`;
  const topBorderActive = `opacity-100 visible transition-all duration-300 ease-linear`;

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}
      <div className="lg:hidden h-[48px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 flex justify-around items-center fixed bottom-0 left-0 right-0 z-10">
        <style>{styles}</style>
        <div className="group">
          <div
            style={{ backgroundColor: design?.header_color }}
            className={active === "category" ? topBorderActive : topBorder}
          ></div>
          <div
            onClick={() => {
              setOpen(!open);
              setActive("category");
            }}
            className={
              "rounded-full px-3 py-2 transition-all duration-300 ease-linear"
            }
          >
            <div className={active === "category" ? "hoverIcon" : ""}>
              {gridIcon}
            </div>
          </div>
        </div>
        <div className="group">
          <div
            style={{ backgroundColor: design?.header_color }}
            className={active === "search" ? topBorderActive : topBorder}
          ></div>
          <div
            onClick={() => {
              setSearchshow(!searchshow);
              setActive("search");
              setOpen(false);
            }}
            className={
              "rounded-full px-3 py-2 transition-all duration-300 ease-linear"
            }
          >
            <div className={active === "search" ? "hoverIcon" : ""}>
              {searchIcon}
            </div>
          </div>
        </div>
        <div className="group">
          <div
            style={{ backgroundColor: design?.header_color }}
            className={active === "home" ? topBorderActive : topBorder}
          ></div>
          <Link href="/" passHref>
            <div
              onClick={() => setActive("home")}
              className="rounded-full px-3 py-2 transition-all duration-300 ease-linear"
            >
              <HomeIcon
                width={25}
                className={active === "home" ? "hoverIcon" : ""}
              />
            </div>
          </Link>
        </div>
        <div className="group">
          <div
            style={{ backgroundColor: design?.header_color }}
            className={active === "cart" ? topBorderActive : topBorder}
          ></div>
          <div
            onClick={() => {
              setCart(!cart);
              setActive("cart");
              setOpen(false);
            }}
            className={
              "rounded-full relative px-3 py-2 transition-all duration-300 ease-linear"
            }
          >
            <ShoppingCartIcon
              width={25}
              className={active === "cart" ? "hoverIcon" : ""}
            />
            {cartList.length > 0 && (
              <div className="absolute h-4 w-4 rounded-full cart-color flex items-center justify-center top-0 right-2">
                <p className="text-xs">{cartList.length}</p>
              </div>
            )}
            <BottomCart open={cart} setOpen={setCart} />
          </div>
        </div>
        <div className="group">
          <div
            style={{ backgroundColor: design?.header_color }}
            className={active === "user" ? topBorderActive : topBorder}
          ></div>
          <Link href="/profile" passHref>
            <div
              onClick={() => {
                setActive("user");
                setOpen(false);
              }}
              className="rounded-full px-3 py-2 transition-all duration-300 ease-linear"
            >
              <UserIcon
                width={25}
                className={active === "user" ? "hoverIcon" : ""}
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Tablet and mobile view */}
      <div className={`px-4 z-[7]`}>
        <ul
          className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${open ? "left-0 " : "left-[-140%] "}`}
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

export default MobileNavTwo;

interface SearchDivProps {
  setSearchshow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow }) => {
  const [searchTxt, setSearchTxt] = useState("");
  return (
    <>
      <div
        onClick={() => setSearchshow(false)}
        className="fixed top-0 bottom-0 left-0 right-0 text-right"
      ></div>
      <motion.div
        initial={{ y: -42, opacity: 0 }}
        animate={{ y: 42, opacity: 1 }}
        exit={{ y: 74, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.8 }}
        className="w-full h-8 fixed px-2 -top-9 left-0 right-0 z-[4]"
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
          className="h-4 w-4 absolute top-4 right-4 font-bold z-10"
        >
          {cancelIcon}
        </div>
        {searchTxt && <Search search={searchTxt} setSearch={setSearchTxt} />}
      </motion.div>
    </>
  );
};

interface SubItem {
  id: number;
  name: string;
  icon: string; // Ensure this matches your data
}

interface Item {
  id: number;
  name: string;
  icon: string; // Ensure this matches your data
  cat?: SubItem[]; // This property is optional
}

interface SingleCatProps {
  item: Item;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SingleCat: FC<SingleCatProps> = ({ item, open, setOpen }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="w-full flex py-3 lg:cursor-pointer">
        <Link href={`/category/${item.id}`} passHref>
          <div
            onClick={() => setOpen(!open)}
            className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
          >
            <img src={iconImg + item.icon} alt="" className="h-5" />
            <p>{item.name}</p>
          </div>
        </Link>
        {item.cat ? (
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
        ) : null}
      </div>

      {show && (
        <div className="ml-8">
          {item.cat?.map((sub: any) => (
            <div key={sub.id} className="py-2">
              <Link href={`/category/${sub.id}`} passHref>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-x-2 pb-2"
                >
                  <img src={iconImg + sub.icon} alt="" className="h-5" />
                  <p className="text-sm text-gray-500">{sub.name}</p>
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
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
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
      fill-rule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clip-rule="evenodd"
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
      fill-rule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clip-rule="evenodd"
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
      fill-rule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clip-rule="evenodd"
    ></path>
  </svg>
);