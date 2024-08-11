import React from "react";
import { AiFillLinkedin } from "react-icons/ai";

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";
import Newsletter from "./components/newsletter";
import { imgUrl } from "@/site-settings/siteUrl";
import Link from "next/link";
import CopyrightAll from "./components/copyrightall";

const FooterThirtyFour = ({ category, menu, headerSetting, design }: any) => {
  const styleCss = `

    .menu-hover:hover {
        color:  white;
  }

    .footer-icon-hover:hover {
        border: 1px solid ${design?.header_color};
        color:  ${design?.header_color};
  }
    `;

  const cls = "text-2xl text-white";

  return (
    <div className="bg-[#022F4D] text-white">
      <div className="flex">
        <div className="h-1 w-full bg-[#F47E2D]"></div>
        <div className="h-1 w-full bg-[#83C341]"></div>
        <div className="h-1 w-full bg-[#00CED1]"></div>
        <div className="h-1 w-full bg-[#D42128]"></div>
      </div>
      <div className="sm:container px-5 sm:pt-10 pt-5 pb-24 lg:pb-5">
        <div className="">
          <Newsletter headerSetting={headerSetting} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 items-center mb-10 ">
          <img src={imgUrl + headerSetting?.logo} alt="" className="max-h-20" />
          <div className="flex gap-3 items-center text-base justify-self-center">
            {headerSetting?.facebook_link && (
              <a
                href={`${headerSetting?.facebook_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare className={cls} />
              </a>
            )}
            {headerSetting?.youtube_link && (
              <a
                href={`${headerSetting?.youtube_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutubeSquare className={cls} />
              </a>
            )}
            {headerSetting?.instagram_link && (
              <a
                href={`${headerSetting?.instagram_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare className={cls} />
              </a>
            )}
            {headerSetting?.whatsapp_phone && (
              <a
                href={`https://api.whatsapp.com/send?phone=${headerSetting?.whatsapp_phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsappSquare className={cls} />
              </a>
            )}
            {headerSetting?.lined_in_link && (
              <a
                href={`${headerSetting?.lined_in_link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillLinkedin className={cls} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 font-bold w-max px-3 py-1 col-span-2 lg:col-span-1 justify-self-center lg:justify-self-center border-2 border-white">
            <TbPhoneCall className="text-white" />
            <p className="">{headerSetting?.phone}</p>
          </div>
        </div>
        <style>{styleCss}</style>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-2">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-base text-left mb-2">
              {headerSetting?.short_description}
            </p>
            <p className="text-base text-left">{headerSetting?.address}</p>
          </div>
          <div className="justify-self-center ">
            <h1 className="text-xl font-medium">Categories</h1>
            <div className="flex flex-col gap-3 pt-3 text-gray-400">
              {category?.slice(0, 5).map((item: any) => (
                <Link key={item.id} href={"/category/" + item?.id}>
                  <p className="menu-hover">{item?.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="justify-self-center">
            <h1 className="text-xl font-medium ">Menu</h1>
            <div className="flex flex-col gap-3 pt-3 text-gray-400">
              {menu?.slice(0, 5).map((item: any) => (
                <Link key={item.id} href={item?.url}>
                  <p className="menu-hover">{item?.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="justify-self-center text-center lg:justify-self-end w-full col-span-2 lg:col-span-1">
            {/* <img src={ imgUrl + headerSetting?.logo} alt="" className='h-12' /> */}
            <h1 className="text-xl font-medium mb-3">Quick Links</h1>
            <div className="flex flex-col gap-3 pt-3 text-gray-400">
              <Link href="/login" className="menu-hover">
                Login
              </Link>
              <Link href="/signup" className="menu-hover">
                Register
              </Link>
              <Link href="/checkout" className="menu-hover">
                Checkout
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:pt-10 pt-5 text-[13px] font-light text-gray-400">
          <CopyrightAll headerSetting={headerSetting} />
        </div>
        {/* <Messenger /> */}
      </div>
    </div>
  );
};

export default FooterThirtyFour;
