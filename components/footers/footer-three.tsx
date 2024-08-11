import React from "react";

import { FaFacebookF } from "react-icons/fa";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import Newsletter from "./components/newsletter";
import { imgUrl } from "@/site-settings/siteUrl";
import Link from "next/link";

const FooterThree = ({ category, headerSetting, menu, store_id }: any) => {
  const date = new Date().getFullYear();

  return (
    <div className="mx-auto sm:container px-5 sm:pt-10 pt-5 pb-20 lg:pb-8 ">
      <Newsletter headerSetting={headerSetting} store_id={store_id} />
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-8 gap-4 lg:justify-items-start justify-items-center">
        <div className="flex flex-col col-span-2 md:col-span-1 justify-center">
          <div className="text-center">
            <img
              src={imgUrl + headerSetting?.logo}
              alt=""
              className="h-12 mx-auto"
            />
          </div>
          <p className="text-sm leading-none text-gray-800 mt-4 text-center">
            © {date} All Rights Received{" "}
            <Link href="/" className="font-semibold text-red-700 menu-hover">
              {headerSetting?.website_name}
            </Link>
          </p>
          <p className="text-sm leading-none text-gray-800 mt-4 text-center">
            Developed by{" "}
            <a
              href="https://ebitans.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-700 menu-hover"
            >
              eBitans
            </a>
          </p>
          <div className="flex items-center gap-x-4 mt-3 mb-5">
            <div className="flex gap-x-4 ">
              {headerSetting?.facebook_link && (
                <div className="border-2 rounded-full p-2">
                  <a
                    href={`${headerSetting?.facebook_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <FaFacebookF className="text-2xl footerColor  " />
                  </a>
                </div>
              )}
              {headerSetting?.youtube_link && (
                <div className="border-2 rounded-full p-2">
                  <a
                    href={`${headerSetting?.youtube_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <AiFillYoutube className="text-2xl footerColor" />
                  </a>
                </div>
              )}
              {headerSetting?.instagram_link && (
                <div className="border-2 rounded-full p-2">
                  <a
                    href={`${headerSetting?.instagram_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <RiInstagramLine className="text-2xl footerColor" />
                  </a>
                </div>
              )}
              {headerSetting?.whatsapp_phone && (
                <div className="border-2 rounded-full p-2">
                  <a
                    href={
                      "https://api.whatsapp.com/send?phone=" +
                      headerSetting?.whatsapp_phone
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <AiOutlineWhatsApp className="text-2xl footerColor" />
                  </a>
                </div>
              )}
              {headerSetting?.lined_in_link && (
                <div className="border-2 rounded-full p-2">
                  <a
                    href={headerSetting?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <AiFillLinkedin className="text-2xl footerColor" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:justify-self-center">
          <h2 className="text-base font-semibold leading-4 text-gray-800">
            Menu
          </h2>
          {menu.map((item: any) => (
            <p
              key={item.id}
              className="menu-hover text-base leading-4 mt-6 text-gray-800 lg:cursor-pointer"
            >
              <Link href={item.url}>{item.name}</Link>
            </p>
          ))}
        </div>
        <div className="md:justify-self-end">
          <h2 className="text-base font-semibold leading-4 text-gray-800">
            Categories
          </h2>
          {category?.slice(0, 6).map((item: any) => (
            <p
              key={item.id}
              className="menu-hover text-base leading-4 mt-6 text-gray-800 lg:cursor-pointer"
            >
              <Link href={"/category/" + item.id}>{item.name}</Link>
            </p>
          ))}
        </div>
      </div>

      {/* <Messenger /> */}
    </div>
  );
};

export default FooterThree;
