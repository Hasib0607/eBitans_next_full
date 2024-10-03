import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsYoutube, BsFacebook, BsTelephone } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Newsletter from "./components/newsletter";
import MenuList from "./components/menu-list";
import CategoryList from "./components/category-list";
import CopyrightAll from "./components/copyrightall";

const FooterTwelve = ({
  headerSetting,
  design,
  store_id,
  page,
  menu,
  category,
}: any) => {
  return (
    <div className="pb-16 lg:pb-0 pt-10">
      <div style={{ background: design?.header_color }} className="">
        <div className="sm:container px-5 sm:py-10 py-5 grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between justify-items-start gap-5 overflow-hidden items-center">
          <div className="flex gap-3 items-center ">
            <div>
              <IoLocationOutline className="text-[42px]" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold ">
                {headerSetting?.address}
              </h1>
              <p className="text-[13px] ">Contact Info!</p>
            </div>
          </div>
          <div className="flex gap-3 items-center ">
            <div>
              <AiOutlineMail className="text-[42px]" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold ">
                {headerSetting?.email}
              </h1>
              <p className="text-[13px] ">Orders Support!</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <BsTelephone className="text-[42px] bs-telephone" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold ">
                {headerSetting?.phone}
              </h1>
              <p className="text-[13px] ">Free support line!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:container px-5 sm:py-10 py-5">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="grid lg:grid-cols-4 grid-cols-2 py-6 lg:flex lg:justify-between justify-items-start lg:gap-0 gap-5 ">
          <div>
            <div className="flex flex-col gap-4">
              <h1 className="text-sm font-semibold ">Social</h1>
              <div className="flex flex-col gap-3 text-gray-500  text-[15px]">
                {headerSetting?.facebook_link && (
                  <a
                    href={headerSetting?.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsFacebook className="text-xl menu-hover lg:cursor-pointer inline mr-2" />
                    <span className="menu-hover">Facebook</span>
                  </a>
                )}
                {headerSetting?.youtube_link && (
                  <a
                    href={headerSetting?.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsYoutube className=" text-xl menu-hover lg:cursor-pointer inline mr-2" />
                    <span className="menu-hover">Youtube</span>
                  </a>
                )}
                {headerSetting?.instagram_link && (
                  <a
                    href={headerSetting?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineInstagram className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                    <span className="menu-hover">Instagram</span>
                  </a>
                )}
                {headerSetting?.lined_in_link && (
                  <a
                    href={headerSetting?.lined_in_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillLinkedin className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                    <span className="menu-hover">LinkedIn</span>
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
                    <AiOutlineWhatsApp className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                    <span className="menu-hover">WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-sm font-semibold ">Contact</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-[15px] ">
              <p className="break-words w-36 sm:w-full">
                {headerSetting?.email}
              </p>
              <p className="">Call Us: {headerSetting?.phone}</p>
              <p className="">Address: {headerSetting?.address}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-sm font-semibold ">Pages</h1>
            </div>
            <div className="text-[15px] text-gray-500">
              <MenuList page={page} menu={menu} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-sm font-semibold  ">Top Category</h1>
            </div>
            <div className="text-[15px] text-gray-500">
              <CategoryList category={category} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <p className="sm:container px-5 sm:py-10 py-5 text-[13px] font-light text-[#333333]">
        <CopyrightAll headerSetting={headerSetting} />
      </p>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterTwelve;
