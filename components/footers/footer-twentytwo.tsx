import { GrInstagram, GrYoutube } from "react-icons/gr";

import { AiFillLinkedin } from "react-icons/ai";
import Newsletter from "./components/newsletter";
import { imgUrl } from "@/site-settings/siteUrl";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import MyAccount from "./components/myaccount";
import MenuList from "./components/menu-list";
import CopyrightAll from "./components/copyrightall";

const FooterTwentyTwo = ({ headerSetting, store_id, page, menu }: any) => {
  return (
    <div className="bg-black pt-10 pb-24 lg:pb-5">
      <div className="sm:container px-5">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 py-5">
          <div className="col-span-2 md:col-span-1">
            <div>
              <img
                src={imgUrl + headerSetting?.logo}
                alt="logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="flex gap-x-4 mt-5">
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
          <div className="col-span-2 md:col-span-1">
            <h1 className="text-xl uppercase font-bold text-white">
              LOCATE US
            </h1>
            <div className="mt-2">
              <p className="text-white font-medium text-sm">
                {" "}
                {headerSetting?.address}
              </p>
              <p className="text-white font-medium text-sm mt-2">
                Phone : {headerSetting?.phone}
              </p>
              <p className="text-white font-medium text-sm mt-2">
                e-mail : {headerSetting?.email}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-xl uppercase font-bold text-white">PROFILE</h1>
            <div className="mt-2 text-white flex flex-col font-medium text-sm">
              <MyAccount />
            </div>
          </div>
          <div>
            <h1 className="text-xl uppercase font-bold text-white">Menu</h1>
            <div className="text-white mt-2 font-medium text-sm">
              <MenuList menu={menu} page={page} />
            </div>
          </div>
        </div>
        <div className="text-white">
          <CopyrightAll headerSetting={headerSetting} />
        </div>
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterTwentyTwo;
