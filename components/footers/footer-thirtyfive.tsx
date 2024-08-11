"use client";
import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import NewsletterFour from "./components/newsletter-four";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import CategoryList from "./components/category-list";
import MenuList from "./components/menu-list";
import CopyrightAll from "./components/copyrightall";
const FooterThirtyFive = ({
  headerSetting,
  design,
  store_id,
  category,
  page,
  menu,
}: any) => {
  const styleCss = `
    .menu-hover:hover {
        color:  ${design?.header_color};
    }
    `;

  return (
    <div className="pt-10 pb-24 lg:pb-5">
      <style>{styleCss}</style>
      <div className="border-t-2 border-b-2 border-black mb-10 ">
        <NewsletterFour design={design} store_id={store_id} />
      </div>
      <div className="sm:container px-5 grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
        <div className="lg:col-span-2">
          <Link href="/">
            <img className="h-14" src={imgUrl + headerSetting.logo} alt="" />
          </Link>
          <p className="py-5 text-lg font-bold">For queries and help</p>
          <div className="flex items-center gap-1 text-gray-400">
            <AiOutlineMail className="text-lg text-gray-800" />
            <p className="">{headerSetting?.email}</p>
          </div>
        </div>

        <div className="lg:justify-self-center border-b-2 lg:border-0 pb-5 lg:pb-0">
          <h1 className="text-xl font-medium">Categories</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            <CategoryList category={category} />
          </div>
        </div>
        <div className="lg:justify-self-center border-b-2 lg:border-0 pb-5 lg:pb-0">
          <h1 className="text-xl font-medium ">Buy with Us</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            <MenuList menu={menu} page={page} />
          </div>
        </div>
        <div className="lg:justify-self-end">
          <h1 className="text-xl font-medium"> Follow us</h1>
          <div className="flex flex-col gap-3 pt-3">
            <div className="flex flex-col gap-3 text-gray-500  text-[13px]">
              {headerSetting?.facebook_link && (
                <a
                  href={headerSetting?.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsFacebook className="text-lg menu-hover lg:cursor-pointer inline mr-2" />
                  <span className="menu-hover">Facebook</span>
                </a>
              )}
              {headerSetting?.youtube_link && (
                <a
                  href={headerSetting?.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsYoutube className=" text-lg menu-hover lg:cursor-pointer inline mr-2" />
                  <span className="menu-hover">Youtube</span>
                </a>
              )}
              {headerSetting?.instagram_link && (
                <a
                  href={headerSetting?.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineInstagram className="mr-2 inline menu-hover text-lg lg:cursor-pointer" />
                  <span className="menu-hover">Instagram</span>
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
                  <AiOutlineWhatsApp className="mr-2 inline menu-hover text-lg lg:cursor-pointer" />
                  <span className="menu-hover">WhatsApp</span>
                </a>
              )}
              {headerSetting?.lined_in_link && (
                <a
                  href={headerSetting?.lined_in_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin className="mr-2 inline menu-hover text-lg lg:cursor-pointer" />
                  <span className="menu-hover">LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500 mt-5">
        <div className="sm:container px-5 text-[15px] pt-8 font-light text-[#333333]">
          <CopyrightAll headerSetting={headerSetting} />
        </div>
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterThirtyFive;
