import React from "react";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";

import { FaFacebookF } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import Newsletter from "./components/newsletter";
import Link from "next/link";
import CopyrightAll from "./components/copyrightall";
// import { imgUrl } from '../../../siteSettings/siteUrl'

const FooterTwentyNine = ({
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
    <div className="border-t pt-10 pb-24 lg:pb-5">
      <style>{styleCss}</style>
      <div className="sm:container px-5">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
      </div>
      <div className="sm:container px-5 grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-2">
        <div className="">
          {/* <img src={ imgUrl + headerSetting?.logo} alt="" className='h-12' /> */}
          <h1 className="text-xl font-medium mb-3">Follow Us</h1>
          <p className="text-sm">
            We make consolidating, marketing and tracking your social media
            website easy.
          </p>
          <div className="flex gap-3 pt-5">
            <div className="flex flex-wrap gap-3 text-gray-500  text-[13px]">
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
        <div className="sm:justify-self-end">
          <h1 className="text-xl font-medium ">Buy with Us</h1>
          <div className="flex flex-col gap-3 pt-3 text-gray-500">
            {menu?.slice(0, 5).map((item: any) => (
              <Link key={item.id} href={item?.url}>
                <p className="menu-hover">{item?.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sm:container px-5 text-[13px] pt-14 font-light text-[#333333]">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterTwentyNine;
