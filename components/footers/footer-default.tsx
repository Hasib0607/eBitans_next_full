import Link from "next/link";
import React from "react";
import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { BsYoutube, BsFacebook, BsTelephone } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import CopyrightAll from "./components/copyrightall";

const FooterDefault = ({ headerSetting, category }: any) => {
  return (
    <a
      href="https://admin.ebitans.com/design/homepage/footer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between justify-items-start px-5 xl:px-60 bg-yellow-300 py-10 gap-5 overflow-hidden items-center my-10 ">
          <div className="flex gap-3 items-center">
            <div>
              <IoLocationOutline className="text-3xl border-0" />
            </div>
            <div>
              <h1 className="text-xl">{headerSetting?.address}</h1>
              <p className="text-sm">Contact Info!</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <AiOutlineMail className="text-3xl" />
            </div>
            <div>
              <h1 className="text-xl">{headerSetting?.email}</h1>
              <p className="text-sm">Orders Support!</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <BsTelephone className="text-3xl bs-telephone" />
            </div>
            <div>
              <h1 className="text-xl">{headerSetting?.phone}</h1>
              <p className="text-sm">Free support line!</p>
            </div>
          </div>
        </div>
        <div className=" xl:px-60 lg:px-5 md:px-5 px-5 mt-10">
          <div className="grid lg:grid-cols-4 grid-cols-2 py-6 lg:flex lg:justify-between justify-items-start lg:gap-0 gap-5 ">
            <div>
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl">Social</h1>
                <div className="flex flex-col gap-3 text-gray-500">
                  <a
                    href={headerSetting?.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsFacebook className="text-xl lg:cursor-pointer inline mr-2" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={headerSetting?.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsYoutube className=" text-xl lg:cursor-pointer inline mr-2" />
                    <span>Youtube</span>
                  </a>
                  <a
                    href={headerSetting?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineInstagram className="mr-2 inline text-xl lg:cursor-pointer" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl">Contact</h1>
              </div>
              <div className="flex flex-col gap-3 text-gray-500">
                <p>{headerSetting?.email}</p>
                <p>Call Us: {headerSetting?.phone}</p>
                <p>Address: {headerSetting?.address}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl">Pages</h1>
              </div>
              <div className="flex flex-col gap-3 text-gray-500">
                <p className="lg:cursor-pointer">About</p>
                <p className="lg:cursor-pointer">Customer Care</p>
                <p className="lg:cursor-pointer">Our Information</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl">Top Category</h1>
              </div>
              <div className="flex flex-col gap-3 text-gray-500">
                {category.slice(0, 4).map((item: any) => (
                  <div key={item.id} className="">
                    <li className="list-none">
                      <Link href={"/category/" + item?.id}>
                        <h1>{item.name}</h1>
                      </Link>
                    </li>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className=" xl:px-20 lg:px-10 md:px-10 px-5 py-3">
          <CopyrightAll headerSetting={headerSetting} />
        </p>
        {/* <Messenger /> */}
      </div>
    </a>
  );
};

export default FooterDefault;
