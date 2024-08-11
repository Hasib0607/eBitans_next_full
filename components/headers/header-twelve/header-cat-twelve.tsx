"use client";
import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import useTheme from "@/hooks/use-theme";
import { BottomCart } from "../card-popup-three";
import Link from "next/link";
import Search from "./search";

const HeaderCatTwelve = () => {
  const { category, design, subcategory } = useTheme();
  const [openCat, setOpenCat] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [heading, setHeading] = useState("");
  const [active, setActive] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  // const cartList = useSelector((state) => state.cart.cartList)

  const handleClose = () => {
    setSearch("");
  };

  if (openCat === true) {
    setTimeout(() => {
      setActive(false);
    }, 800);
  } else {
    setTimeout(() => {
      setActive(true);
    }, 0);
  }

  return (
    <div className="sm:container px-5 flex flex-row gap-6 items-center justify-between ">
      {/* cart open  */}
      <BottomCart open={cartOpen} setOpen={setCartOpen} />
      {searchTxt && (
        <div
          onClick={() => {
            setSearch("");
          }}
          className="h-screen left-0 fixed top-0 w-screen z-40"
        ></div>
      )}
      <div className="flex items-center gap-10">
        <div className="lg:block  hidden relative">
          <div
            onClick={() => setOpenCat(!openCat)}
            style={{
              color: design?.text_color,
              background: design?.header_color,
            }}
            className="font-twelve text-[14px] flex justify-between lg:cursor-pointer gap-4 py-4 items-center"
          >
            <div>
              <HiMenu className="font-twelve text-[18px]" />
            </div>
            <div>
              <h1 style={{ color: design?.text_color }}>ALL CATEGORIES</h1>
            </div>
            <div>
              <RiArrowDownSLine className="font-twelve text-[18px]" />
            </div>
          </div>

          <div
            className={`border-gray-100 border-2 border-t-0 z-10 w-full absolute bg-white text-black`}
          >
            <ul
              onMouseLeave={() => setHeading("")}
              className={`flex flex-col font-twelve menu-twelve ${
                openCat ? "max-h-[1000px]" : "max-h-[0]"
              } ${active ? "overflow-hidden" : ""}`}
            >
              {category.map((item: any) => (
                <div key={item.id} className="relative">
                  <li
                    onMouseEnter={() => {
                      heading !== item.name
                        ? setHeading(item.name)
                        : setHeading("");
                    }}
                    className="group relative hover:bg-gray-100 w-full"
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
                    className={`z-50 bg-white py-2 lg:cursor-pointer absolute -right-60 top-0 flex flex-col`}
                  >
                    {subcategory.map((subItem: any) => (
                      <div key={subItem.id} className={`relative`}>
                        {item.id === Number(subItem.parent) && (
                          <div
                            className={`w-60 px-5 text-[13px] font-twelve leading-loose capitalize ${
                              heading === item.name ? "lg:block" : "hidden"
                            }`}
                          >
                            <Link href={"/category/" + subItem?.id}>
                              <h1 className="hover:scale-x-105 duration-300 menu-hover">
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
        <div className="xl:w-[700px] lg:w-[600px] ">
          <div className=" relative overflow-hidden">
            <div>
              <input
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Enter your search key ..."
                className="w-full py-3 outline-none focus:outline-none focus:border-gray-200 border-gray-200 focus:ring-0 text-black"
              />
            </div>
            <div className="bg-black text-white lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-4">
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
      </div>

      <div
        onClick={() => setCartOpen(!cartOpen)}
        className="flex flex-col justify-center items-center relative lg:cursor-pointer"
      >
        <CgShoppingBag className="text-3xl font-thin" />
        {/* <p
          style={{
            background: design?.text_color,
            color: design?.header_color,
          }}
          className=" text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
        >
          {cartList.length}
        </p> */}
      </div>
    </div>
  );
};

export default HeaderCatTwelve;
