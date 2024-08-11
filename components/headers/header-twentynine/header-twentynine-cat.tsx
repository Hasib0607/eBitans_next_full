"use client";
import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import Search from "./search";

const HeaderTwentyNineCat = () => {
  const { category, design, subcategory } = useTheme();
  const [openCat, setOpenCat] = useState(false);
  const [searchTxt, setSearch] = useState("");
  const [heading, setHeading] = useState("");

  const handleClose = () => {
    setSearch("");
  };

  return (
    <div
      onMouseLeave={() => setOpenCat(false)}
      style={{ background: design?.header_color, color: design?.text_color }}
      className=" border-b border-gray-300"
    >
      <div className="sm:container px-5 pb-1 pt-1 flex-row justify-between gap-6 lg:flex hidden">
        {searchTxt && (
          <div
            onClick={() => {
              setSearch("");
            }}
            className="h-screen left-0 fixed top-0 w-screen z-40 lg:cursor-pointer"
          ></div>
        )}
        <div className="lg:block hidden relative ">
          <div
            onMouseEnter={() => setOpenCat(true)}
            style={{ background: design?.header_color }}
            className=" flex gap-x-2 w-max lg:cursor-pointer py-3 items-center"
          >
            <div style={{ color: design?.text_color }}>
              <HiMenu />
            </div>
            <div style={{ color: design?.text_color }}>
              <h1 style={{ color: design?.text_color }}>SHOP BY DEPARTMENT</h1>
            </div>
            <div style={{ color: design?.text_color }}>
              <RiArrowDownSLine />
            </div>
          </div>
          {openCat && (
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="border-gray-100 border-2 border-t-0 z-10 absolute w-full bg-white text-black"
            >
              <ul
                onMouseLeave={() => setHeading("")}
                className="flex flex-col duration-1000 font-twelve relative"
              >
                {category.map((item: any) => (
                  <div key={item.id} className="">
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
                              className={`h-4 absolute transition-all duration-500 ease-linear lg:cursor-pointer right-5 top-3 `}
                            />
                          )}
                        </div>
                      ))}
                    </li>

                    <div
                      className={`z-50 bg-gray-50 py-2 lg:cursor-pointer absolute left-[100%] top-0 h-full flex flex-col`}
                    >
                      {subcategory.map((subItem: any) => (
                        <div key={subItem.id} className={`relative`}>
                          {item.id === Number(subItem.parent) && (
                            <div
                              className={`min-w-[200px] w-full px-5 text-[13px] font-twelve leading-loose capitalize ${
                                heading === item.name ? "lg:block" : "hidden"
                              }`}
                            >
                              <Link href={"/category/" + subItem?.id}>
                                <h1 className="hover:scale-105 menu-hover w-max">
                                  {subItem.name}
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
            </motion.div>
          )}
        </div>

        <div className="lg:basis-3/4 w-full ">
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
            <div className="bg-yellow-500 lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-4">
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
    </div>
  );
};

export default HeaderTwentyNineCat;
