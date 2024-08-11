import React from "react";

import { FaFacebookF } from "react-icons/fa";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import Newsletter from "./components/newsletter";
import Link1 from "../link1";
import Link from "next/link";
import MenuList from "./components/menu-list";

const FooterOne = ({
  category,
  headerSetting,
  design,
  store_id,
  menu,
  page,
}: any) => {
  const date = new Date().getFullYear();

  const cls = "hover:ml-2 duration-500";

  return (
    <footer className="text-gray-600 body-font ">
      <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-2/6 md:w-1/2 w-full px-4">
            <img src={""} width={"120"} alt="" />
            <h2 className=" font-semibold text-gray-900 tracking-widest text-xl my-2">
              Contact
            </h2>
            <nav className="list-none mb-10 space-y-1">
              <li>
                <p className="text-gray-600 hover:text-gray-800">
                  <strong>{"Address"}: </strong>
                  {headerSetting?.address}
                </p>
              </li>
              <li>
                <p className="text-gray-600 hover:text-gray-800">
                  <strong>{"Phone"}: </strong>
                  {headerSetting?.phone}
                </p>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 className=" font-semibold text-gray-900 tracking-widest text-xl mb-3">
              Menu
            </h2>
            <nav className="list-none mb-10 space-y-2">
              {/* {menu?.map((item) => <Link1 key={item.id} text={item.name} href={item.url} />)} */}
              <MenuList cls={cls} menu={menu} page={page} />
            </nav>
          </div>
          <div className="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 className=" font-semibold text-gray-900 tracking-widest text-xl mb-3">
              Categories
            </h2>
            <nav className="list-none mb-10 space-y-2">
              {category?.slice(0, 7).map((item: any) => (
                <Link1
                  key={item.id}
                  text={item.name}
                  href={"/category/" + item.id}
                />
              ))}
            </nav>
          </div>

          <div className="lg:w-2/6 md:w-1/2 w-full px-4 flex justify-center md:justify-end">
            <div className="flex flex-col items-center">
              <h2 className=" font-semibold text-gray-900 tracking-widest text-xl mb-3">
                Follow Us
              </h2>

              <div className="">
                <div className="flex gap-2 my-3 justify-center ">
                  {headerSetting?.facebook_link && (
                    <div
                      className=" p-2"
                      style={{
                        background: design?.header_color,
                        color: design?.text_color,
                      }}
                    >
                      <a
                        href={`${headerSetting?.facebook_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <FaFacebookF className="text-xl footerColor  " />
                      </a>
                    </div>
                  )}
                  {headerSetting?.youtube_link && (
                    <div
                      className="  p-2"
                      style={{
                        background: design?.header_color,
                        color: design?.text_color,
                      }}
                    >
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
                    <div
                      className="  p-2"
                      style={{
                        background: design?.header_color,
                        color: design?.text_color,
                      }}
                    >
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
                  {headerSetting?.lined_in_link && (
                    <div
                      className="  p-2"
                      style={{
                        background: design?.header_color,
                        color: design?.text_color,
                      }}
                    >
                      <a
                        href={`${headerSetting?.lined_in_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <AiFillLinkedin className="text-2xl footerColor" />
                      </a>
                    </div>
                  )}
                  {headerSetting?.whatsapp_phone && (
                    <div
                      className="  p-2"
                      style={{
                        background: design?.header_color,
                        color: design?.text_color,
                      }}
                    >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:container px-5">
        <img
          src={
            "https://bishworang.netlify.app/static/media/SSLCOMMERZ%20Pay%20With%20logo%20All%20Size_Aug%2021-05-Nov-18-2021-05-46-29-86-AM%20(1).407b60596845fa47cd55.png"
          }
          className="container"
          alt=""
        />
      </div>
      <div className="bg-gray-100 mb-14 lg:mb-0">
        <div className="sm:container px-5 py-4 flex flex-wrap justify-center">
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
            © {date} All Rights Received{" "}
            <Link href="/" className="font-semibold text-red-700 menu-hover">
              {headerSetting?.website_name}
            </Link>{" "}
            | Developed by{" "}
            <a
              href="https://ebitans.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-700 menu-hover"
            >
              eBitans
            </a>
          </span>
        </div>
      </div>
      {/* <Messenger /> */}
    </footer>
  );
};

export default FooterOne;
