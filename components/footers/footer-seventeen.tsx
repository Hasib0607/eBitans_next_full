import React from "react";
import { BsHouseFill } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import "./footer-seventeen.css";
import Newsletter from "./components/newsletter";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import CopyrightAll from "./components/copyrightall";
import MenuList from "./components/menu-list";

const FooterSeventeen = ({
  headerSetting,
  design,
  store_id,
  menu,
  page,
}: any) => {
  const customDesignFooterSeventeen = `
  @import url('https://fonts.googleapis.com/css2?family=Marck+Script&display=swap');
    .footerColor:hover{
        color:${design?.header_color};
        }
        .searchBtn:hover{
            background-color:${design?.header_color};
            color:${design?.text_color}
        }
        .footerFiveBorderCustom {
            margin: 0;
            padding-bottom: 7px;
            position: relative;
            width: 50%;
        }
        
        .footerFiveBorderCustom:before {
            position: absolute;
            background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
            height: 2px;
            content: '';
            bottom: 0;
            right: 0;
            left: 0;
        }
        .text-style{
            font-family: 'Marck Script', cursive;
        }
    
    `;
  return (
    <div className="footerSeventeenBackGroundImage">
      <style>{customDesignFooterSeventeen}</style>
      <div className="container px-5 xl:px-80 lg:pb-0 pb-10 pt-10">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 pt-[80px] pb-10 gap-2">
          <div className="pb-2">
            <div className="">
              {headerSetting?.logo === null ? (
                <Link href="/">
                  <p className="text-xl uppercase">
                    {headerSetting?.website_name}
                  </p>
                </Link>
              ) : (
                <Link href="/">
                  <img
                    className="h-10"
                    src={imgUrl + headerSetting.logo}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className="text-white pt-16">
              <h2>{headerSetting?.short_description}</h2>
            </div>
            <div className="mt-3 text-white">
              <CopyrightAll headerSetting={headerSetting} />
            </div>
          </div>
          <div></div>

          <div className="pb-3">
            <div>
              <h2 className="text-white text-2xl text-style w-max">Our Menu</h2>
              <p className="h-[1px] w-12 bg-white mt-2"></p>
            </div>
            <div className="pt-4">
              <div className="flex flex-col gap-4 text-white">
                <MenuList menu={menu} page={page} />
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-white text-2xl text-style">Contact us</h2>
              <p className="h-[1px] w-12 bg-white mt-2"></p>
            </div>

            <div>
              <div className="flex items-start gap-4 pt-4">
                <BsHouseFill
                  className="mt-1 text-xl"
                  style={{ color: "white" }}
                />
                <h2 className="pl-2" style={{ color: "white" }}>
                  {headerSetting?.address}
                </h2>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-4 mt-8">
                <IoMdCall className="mt-1 text-xl" style={{ color: "white" }} />
                <h2 className="pl-2" style={{ color: "white" }}>
                  {headerSetting?.phone}
                </h2>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-4 mt-8">
                <MdEmail className="mt-1 text-xl" style={{ color: "white" }} />
                <h2 className="pl-2" style={{ color: "white" }}>
                  {headerSetting?.email}
                </h2>
              </div>
            </div>

            <div>
              <h2 className="text-style text-white text-2xl mt-8">Follow us</h2>

              <div className="flex mt-2 xl:mt-5 lg:mt-5 md:mt-5 justify-between gap-4 w-[50%] j s xl:w-[25%] lg:w-[50%] md:w-[42%] items-center">
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
        </div>
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterSeventeen;
