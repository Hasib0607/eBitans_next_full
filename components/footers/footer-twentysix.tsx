import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import Newsletter from "./components/newsletter";
import { imgUrl } from "@/site-settings/siteUrl";
import Link from "next/link";
import CopyrightAll from "./components/copyrightall";

const FooterTwentySix = ({
  category,
  menu,
  headerSetting,
  design,
  store_id,
}: any) => {
  const styleCss = `

    .menu-hover:hover {
        color:  ${design?.header_color};
  }
 
    `;

  return (
    <div className="pt-10 pb-24 sm:pb-5 bg-gray-100">
      <div className="sm:container px-5">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
      </div>
      <style>{styleCss}</style>
      <div className="sm:container px-5 grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-2 pb-10">
        <div className="">
          <img src={imgUrl + headerSetting?.logo} alt="" className="h-12" />
          <div className="flex flex-col gap-3 pt-3">
            <div className="flex flex-col gap-3 text-gray-500  text-[13px]">
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
        <div className="justify-self-center ">
          <h1 className="text-xl font-medium">Categories</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            {category?.slice(0, 5).map((item: any) => (
              <Link key={item.id} href={"/category/" + item?.id}>
                <li className="menu-hover">{item?.name}</li>
              </Link>
            ))}
          </div>
        </div>
        <div className="sm:justify-self-end">
          <h1 className="text-xl font-medium ">Buy with Us</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            {menu?.slice(0, 5).map((item: any) => (
              <Link key={item.id} href={item?.url}>
                <li className="menu-hover">{item?.name}</li>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:container px-5 text-[18px] pt-14 text-[#333333] text-center border-t pb-14">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterTwentySix;
