"use client";
import React from "react";
import { useState } from "react";
import { AiFillGift, AiFillLinkedin } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram, GrYoutube } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbFileCertificate } from "react-icons/tb";
import { useRouter } from "next/navigation";
import AnimateMarquee from "../slider/animate-marquee";
import NewsletterThree from "./components/newsletter-three";
import MyAccount from "./components/myaccount";
import MenuList from "./components/menu-list";
import CategoryList from "./components/category-list";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { imgUrl } from "@/site-settings/siteUrl";
import CopyrightAll from "./components/copyrightall";

const FooterTwentyOne = ({
  headerSetting,
  brand,
  store_id,
  menu,
  page,
  category,
}: any) => {
  const router = useRouter();
  const [heading, setHeading] = useState(null);

  const cls = "text-gray-400 hover:text-white";

  // const location = useLocation();
  console.log(headerSetting, "s");

  return (
    <>
      {location.pathname === "/" && <AnimateMarquee brand={brand} />}
      <div className="bg-black mt-10 pb-24 lg:pb-10">
        <div className="sm:container px-5 sm:py-10 py-5">
          <NewsletterThree store_id={store_id} />
          {/* footer top section  */}
          <div className="grid lg2:grid-cols-5 md:grid-cols-3 grid-cols-1 sm:gap-y-10 gap-y-2  text-white ">
            <div className="flex flex-col gap-5 lg2:col-span-2 md:col-span-2 col-span-1 mb-5 sm:mb-0">
              <div>
                <h1 className="text-xl uppercase font-bold">ABOUT US</h1>
                <p className="text-base pt-5 text-gray-400">
                  {headerSetting?.short_description}
                </p>
              </div>
              <div className="flex gap-x-4 ">
                {headerSetting?.facebook_link && (
                  <a
                    href={headerSetting?.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="h-10 w-10 rounded-full border border-transparent hover:border-black duration-300 text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                      <FaFacebook className="text-lg " />
                    </div>
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
                    <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                      <IoLogoWhatsapp className="text-lg " />
                    </div>
                  </a>
                )}

                {headerSetting?.instagram_link && (
                  <a
                    href={headerSetting?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                      <GrInstagram className="text-lg " />
                    </div>
                  </a>
                )}

                {headerSetting?.youtube_link && (
                  <a
                    href={headerSetting?.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                      <GrYoutube className="text-lg " />
                    </div>
                  </a>
                )}
                {headerSetting?.lined_in_link && (
                  <a
                    href={headerSetting?.lined_in_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                      <AiFillLinkedin className="text-lg " />
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="lg2:justify-self-center md:block hidden">
              <h1 className="sm:text-xl uppercase font-bold pb-5">
                MY ACCOUNT
              </h1>
              <div className="flex flex-col gap-2 text-base text-gray-400">
                <MyAccount cls={cls} />
              </div>
            </div>

            <div className="lg2:justify-self-center md:col-span-2 lg2:col-span-1 md:block hidden">
              <div>
                <h1 className="sm:text-xl uppercase font-bold pb-5">
                  RESOURCES
                </h1>
                <div className="flex flex-col gap-2 ">
                  <MenuList cls={cls} menu={menu} page={page} />
                </div>
              </div>
            </div>

            <div className="lg2:justify-self-center md:block hidden">
              <h1 className="sm:text-xl uppercase font-bold pb-5">
                FIND IT FAST
              </h1>
              <div className="flex flex-col gap-2 text-base ">
                <CategoryList cls={cls} category={category} />
              </div>
            </div>

            {/* responsive for small device  */}
            <div className="lg2:justify-self-center md:hidden block">
              <div
                // onClick={() =>
                //   setHeading(heading !== "account" ? "account" : "")
                // }
                className="flex justify-between items-center"
              >
                <h1 className="sm:text-xl uppercase font-bold">MY ACCOUNT</h1>
                {heading === "account" ? (
                  <MinusIcon className="h-4 w-4 text-white" />
                ) : (
                  <PlusIcon className="h-4 w-4 text-white" />
                )}
              </div>
              {heading === "account" && (
                <div className="flex flex-col gap-2 text-base text-gray-400">
                  <MyAccount cls={cls} />
                </div>
              )}
            </div>
            <div className="lg2:justify-self-center md:hidden block">
              <div>
                <div
                  // onClick={() =>
                  //   setHeading(heading !== "resource" ? "resource" : "")
                  // }
                  className="flex justify-between items-center"
                >
                  <h1 className="sm:text-xl uppercase font-bold ">RESOURCES</h1>
                  {heading === "resource" ? (
                    <MinusIcon className="h-4 w-4 text-white" />
                  ) : (
                    <PlusIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                {heading === "resource" && (
                  <div className="flex flex-col gap-2">
                    <MenuList cls={cls} />
                  </div>
                )}
              </div>
            </div>
            <div className="lg2:justify-self-center md:hidden block">
              <div
                // onClick={() => setHeading(heading !== "find" ? "find" : "")}
                className="flex justify-between items-center"
              >
                <h1 className="sm:text-xl uppercase font-bold">FIND IT FAST</h1>
                {heading === "find" ? (
                  <MinusIcon className="h-4 w-4 text-white" />
                ) : (
                  <PlusIcon className="h-4 w-4 text-white" />
                )}
              </div>
              {heading === "find" && (
                <div className="flex flex-col gap-2 text-base text-gray-400">
                  <CategoryList cls={cls} />
                </div>
              )}
            </div>
          </div>

          {/* footer middle section  */}
          <div className="border border-gray-600 mt-5">
            <div
              className={`${
                store_id === 6227 ? "lg2:grid-cols-1" : "lg2:grid-cols-4"
              } text-white grid grid-cols-1 md:grid-cols-2 justify-items-center`}
            >
              {store_id !== 6227 && (
                <div className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5 relative">
                  <div>
                    <AiFillGift className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="font-medium text-lg">Free Shipping</h1>
                    <p className="text-gray-400 text-sm">
                      Free shipping over {store_id === 2272 ? "1999" : "1990"}{" "}
                      Taka
                    </p>
                  </div>
                  <div className="absolute w-[1px] h-16 bg-gray-500 right-0 hidden md:block"></div>
                </div>
              )}
              <div
                className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5 relative hover:cursor-pointer"
                onClick={() =>
                  (window.location.href = `https://wa.me/${headerSetting.whatsapp_phone}`)
                }
              >
                <div>
                  <BiSupport className="text-5xl" />
                </div>
                <div>
                  <h1 className="font-medium text-lg">
                    {headerSetting.whatsapp_phone ? "Whatsapp" : "Support 24/7"}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {headerSetting.whatsapp_phone
                      ? headerSetting.whatsapp_phone
                      : "Contact us 24 hours a day"}
                  </p>
                </div>

                <div className="absolute w-[1px] h-16 bg-gray-500 right-0 hidden lg2:block"></div>
              </div>

              {store_id === 6227 ? (
                ""
              ) : (
                <div className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5 relative">
                  <div>
                    <TbFileCertificate className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="font-medium text-lg">
                      {store_id === 2272 ? "72" : "48"} Hours Return Policy
                    </h1>
                    <p className="text-gray-400 text-sm">Condition apply</p>
                  </div>
                  <div className="absolute w-[1px] h-16 bg-gray-500 right-0 hidden md:block"></div>
                </div>
              )}
              {store_id === 6227 ? (
                ""
              ) : (
                <div className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5">
                  <div>
                    <RiSecurePaymentLine className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="font-medium text-lg">Payment Secure</h1>
                    <p className="text-gray-400 text-sm">
                      We ensure secure payment
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-600 h-[1px] w-full"></div>

        {/* bottom section  */}
        <div className="sm:container px-5 pt-5 flex flex-col md:flex-row gap-5 items-center md:justify-between text-white">
          <div>
            <img
              src={imgUrl + headerSetting?.logo}
              alt=""
              className="h-10 max-w-20"
            />
          </div>
          <div className="text-center">
            <CopyrightAll headerSetting={headerSetting} />
          </div>
        </div>
        {/* <Messenger /> */}
      </div>
    </>
  );
};

export default FooterTwentyOne;
