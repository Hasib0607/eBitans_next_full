import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import Newsletter from "./components/newsletter";
import CategoryList from "./components/category-list";
import MenuList from "./components/menu-list";
import CopyrightAll from "./components/copyrightall";

const FooterEighteen = ({
  headerSetting,
  design,
  store_id,
  category,
  menu,
  page,
}: any) => {
  const styleCss = `
    .menu-hover:hover {
        color:  ${design?.header_color};
  }
    `;

  return (
    <div className="bg-gray-200 pt-10 pb-24 lg:pb-5">
      <style>{styleCss}</style>
      <div className="sm:container px-5">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
      </div>
      <div className="sm:container px-5 grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-2">
        <div className="">
          <h1 className="text-xl font-medium">Categories</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            <CategoryList category={category} />
          </div>
        </div>
        <div className="justify-self-center">
          <h1 className="text-xl font-medium ">Buy with Us</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            <MenuList menu={menu} page={page} />
          </div>
        </div>
        <div className="sm:justify-self-end">
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

      <div className=" sm:container px-5 text-[15px] pt-14 font-light text-[#333333]">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterEighteen;
