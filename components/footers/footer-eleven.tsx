"use client";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import { BsHeadset } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { motion } from "framer-motion";
import Newsletter from "./components/newsletter";
import { imgUrl } from "@/site-settings/siteUrl";
import {
  MapPinIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import MenuList from "./components/menu-list";
import CopyrightAll from "./components/copyrightall";
import Link from "next/link";
import CategoryList from "./components/category-list";

const FooterEleven = ({
  design,
  headerSetting,
  menu,
  category,
  store_id,
  page,
}: any) => {
  const customDesign = `
      .liList:hover{
        color: ${design?.header_color}
      }
      
    `;
  const menuList = [
    { name: "Profile" },
    { name: "Order" },
    { name: "Checkout" },
    { name: "Login" },
  ];

  const cls = "hover:ml-2 liList duration-500";

  return (
    <div className="mt-[60px] bg-gray-50 xl:mt-0 md:mt-[25px] lg:mt-0">
      <Newsletter headerSetting={headerSetting} store_id={store_id} />
      <style>{customDesign}</style>
      <div className="sm:container px-5 grid grid-cols-1 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-6 gap-8 ">
        <div className="col-span-2 xl:col-span-3 lg:col-span-2 md:col-span-6 col col">
          <img
            className="w-auto h-20  sm:h-10"
            src={imgUrl + headerSetting?.logo}
            alt=""
          />
          <p className="py-5 text-base font-light">
            {headerSetting?.short_description}
          </p>
          <div className="flex gap-4">
            <MapPinIcon
              width={20}
              height={20}
              style={{ color: design?.header_color }}
            />
            <p className="text-sm pl-2 xl:pl-0 lg:pl-2 md:pl-2">
              Address: {headerSetting?.address}
            </p>
          </div>
          <br />
          <div className="flex gap-4">
            <BsHeadset
              width={20}
              height={20}
              style={{ color: design?.header_color }}
            />
            <p className="text-sm pl-2 xl:pl-0 lg:pl-2 md:pl-2">
              Phone : {headerSetting?.phone}
            </p>
          </div>
          <br />
          <div className="flex gap-4">
            <SiMinutemailer
              width={20}
              height={20}
              style={{ color: design?.header_color }}
            />
            <p className="text-sm pl-2 xl:pl-0 lg:pl-2 md:pl-2">
              Email : {headerSetting?.email}
            </p>
          </div>
        </div>
        <div className="col-span-2 hidden sm:hidden lg:block xl:col-span-2 md:col-span-1 lg:col-span-1">
          <h2 className="font-bold">Menu</h2>
          <div className="mt-4">
            <MenuList cls={cls} menu={menu} page={page} />
          </div>
        </div>
        <div className="col-span-2 xl:col-span-1 md:col-span-6 lg:col-span-1 lg:hidden">
          <Accordion name={"Menu"} menu={menu} cls />
        </div>
        <div className="hidden lg:block col-span-2 xl:col-span-2 md:col-span-6 lg:col-span-1">
          <h2 className="font-bold">Categories</h2>
          <div className="mt-4">
            <CategoryList cls={cls} />
          </div>
        </div>

        <div className="col-span-2 xl:col-span-1 md:col-span-6 lg:col-span-1 lg:hidden">
          <Accordion name={"Categories"} categoryMenu={category} cls={cls} />
        </div>

        <div className="hidden lg:block col-span-2 xl:col-span-1 md:col-span-6 lg:col-span-1  ">
          <h2 className="font-bold">Your Account</h2>
          <div className="mt-4">
            <Link href="/profile" className={`${cls}`}>
              {" "}
              Profile
            </Link>
            <br />
            <Link href="/order" className={`${cls}`}>
              {" "}
              Order
            </Link>
            <br />
            <Link href="/checkout" className={`${cls}`}>
              {" "}
              Checkout
            </Link>
            <br />
            <Link href="/login" className={`${cls}`}>
              {" "}
              Login
            </Link>
          </div>
        </div>

        <div className="col-span-2 xl:col-span-1 md:col-span-6 lg:col-span-1 lg:hidden">
          <Accordion
            name={"Your Account"}
            menuList={menuList}
            category={category}
            cls={cls}
          />
        </div>
      </div>
      <div className="sm:container px-5 pb-14 lg:pb-0 mt-10 mb-0 lg:mb-5 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="">
            <CopyrightAll headerSetting={headerSetting} />
          </div>

          <div className="flex lg:justify-self-center gap-4 items-center">
            <PhoneIcon
              width={30}
              height={50}
              style={{ color: design?.header_color }}
            />
            <div className="text-xl">{headerSetting?.phone}</div>
          </div>
          <div className="flex pb-4 lg:pb-0 mt-2 lg:mt-0 gap-4 items-center lg:justify-self-end">
            {headerSetting?.facebook_link && (
              <div
                className="p-2"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              >
                <a href={`${headerSetting?.facebook_link}`}>
                  {" "}
                  <FaFacebookF className="text-2xl footerColor" />
                </a>
              </div>
            )}
            {headerSetting?.youtube_link && (
              <div
                className="p-2"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              >
                <a href={`${headerSetting?.youtube_link}`}>
                  {" "}
                  <AiFillYoutube className="text-2xl footerColor" />
                </a>
              </div>
            )}
            {headerSetting?.instagram_link && (
              <div
                className="p-2"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              >
                <a href={`${headerSetting?.instagram_link}`}>
                  {" "}
                  <RiInstagramLine className="text-2xl footerColor" />
                </a>
              </div>
            )}
            {headerSetting?.lined_in_link && (
              <div
                className="p-2"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              >
                <a href={`${headerSetting?.lined_in_link}`}>
                  {" "}
                  <AiFillLinkedin className="text-2xl footerColor" />
                </a>
              </div>
            )}
            {headerSetting?.whatsapp_phone && (
              <div
                className="p-2"
                style={{
                  background: design?.header_color,
                  color: design?.text_color,
                }}
              >
                <a
                  href={
                    "https://api.whatsapp.com/send?phone=" +
                    headerSetting?.whatsapp_phone
                  }
                >
                  {" "}
                  <AiOutlineWhatsApp className="text-2xl footerColor" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterEleven;

const Accordion = ({
  name,
  menu,
  menuList,
  categoryMenu,
  category,
  cls,
}: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="" onClick={() => setShow(!show)}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{name}</h3>
        </div>
        <div>
          {show ? (
            <MinusIcon className="w-6 h-6" />
          ) : (
            <PlusIcon className="w-6 h-6" />
          )}
        </div>
      </div>

      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {menuList ? (
            <div className="list-none liList">
              {menuList?.map((data: any, index: any) => (
                <>
                  <Link href={`/${data?.name.toLowerCase()}`} key={index + 1}>
                    {" "}
                    {data?.name}
                  </Link>
                  <br />
                </>
              ))}
            </div>
          ) : menu ? (
            <div className="list-none">
              <MenuList cls={cls} />
            </div>
          ) : categoryMenu ? (
            <div className="list-none">
              <CategoryList category={category} />
            </div>
          ) : null}
        </motion.div>
      )}
    </div>
  );
};
