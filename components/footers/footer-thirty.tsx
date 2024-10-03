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

const FooterThirty = ({
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

    .footer-icon-hover:hover {
        border: 1px solid ${design?.header_color};
        color:  ${design?.header_color};
  }
 
    `;

  return (
    <div className="border-t sm:container px-5 sm:pt-10 pt-5 pb-24 sm:pb-5">
      <div className="">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
      </div>
      <style>{styleCss}</style>
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-2">
        <div className="col-span-2 lg:col-span-1">
          <img
            src={imgUrl + headerSetting?.logo}
            alt=""
            className="max-h-20 pb-4 mx-auto"
          />
          {/* <h1 className='text-xl font-medium mb-3'>Follow Us</h1> */}
          <p className="text-base text-center">
            {headerSetting?.short_description}
          </p>
        </div>
        <div className="justify-self-center ">
          <h1 className="text-xl font-medium">Categories</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            {category?.slice(0, 5).map((item: any) => (
              <Link key={item.id} href={"/category/" + item?.id}>
                <p className="menu-hover">{item?.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="justify-self-center">
          <h1 className="text-xl font-medium ">Buy with Us</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            {menu?.slice(0, 5).map((item: any) => (
              <Link key={item.id} href={item?.url}>
                <p className="menu-hover">{item?.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="justify-self-center text-center lg:justify-self-end w-full col-span-2 lg:col-span-1">
          {/* <img src={ imgUrl + headerSetting?.logo} alt="" className='h-12' /> */}
          <h1 className="text-xl font-medium mb-3">Follow Us</h1>
          <p className="text-sm">
            We make consolidating, marketing and tracking your social media
            website easy.{" "}
          </p>
          <div className="flex gap-3 justify-center pt-5">
            <div className="flex flex-col gap-3 text-gray-500 text-[13px]">
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
      </div>

      <div className="sm:container px-5 sm:pt-10 pt-5 text-[13px] font-light text-[#333333]">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterThirty;
