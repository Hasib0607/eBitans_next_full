import React from "react";
import { GoLocation } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import Newsletter from "./components/newsletter";
import MyAccount from "./components/myaccount";
import MenuList from "./components/menu-list";
import CopyrightAll from "./components/copyrightall";

const FooterTwentyFive = ({
  headerSetting,
  design,
  store_id,
  menu,
  page,
}: any) => {
  return (
    <footer
      style={{ background: design?.header_color, color: design?.text_color }}
      className=""
    >
      <div className="container sm:px-10 px-5 py-10 mx-auto">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 ">
          <div className="w-full">
            <h2 className="title-font font-bold tracking-widest text-lg mb-3 ">
              Contact Us
            </h2>
            <nav className="list-none md:mb-10 mb-4 space-y-3">
              <li className="flex justify-start items-center gap-x-4 text-sm leading-6">
                <div className="rounded-full border border-gray-700 p-1">
                  <GoLocation className="text-sm" />
                </div>
                <p className="text-base">{headerSetting?.address}.</p>
              </li>
              <li className="flex justify-start items-center gap-x-4 text-sm leading-6">
                <div className="rounded-full border border-gray-700 p-1">
                  <IoCallOutline className="text-sm" />
                </div>
                <p className="text-base">{headerSetting?.phone}</p>
              </li>
              <li className="flex justify-start items-center gap-x-4 text-sm leading-6">
                <div className="rounded-full border border-gray-700 p-1">
                  <AiOutlineMail className="text-sm" />
                </div>
                <p className="text-base break-words w-36 sm:w-60">
                  {headerSetting?.email}
                </p>
              </li>
            </nav>
          </div>

          <div className="w-full mt-5 lg:mt-0">
            <div>
              <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                Our Pages
              </h1>
              <div className="mt-5">
                <MyAccount />
              </div>
            </div>
          </div>

          <div className="w-full mt-5 lg:mt-0">
            <div className="xl:col-span-2 lg:col-span-2">
              <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                Our Menu
              </h1>
              <div className="flex flex-col mt-5">
                <MenuList menu={menu} page={page} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:px-10 px-5 py-2 lg:text-right pb-20 lg:pb-2 bg-black text-white">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
      {/* <Messenger /> */}
    </footer>
  );
};

export default FooterTwentyFive;
