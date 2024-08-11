import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsYoutube, BsFacebook, BsTelephone } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Newsletter from "./components/newsletter";
import Link from "next/link";

const FooterSix = ({
  headerSetting,
  category,
  design,
  menu,
  page,
  store_id,
}: any) => {
  const date = new Date().getFullYear();
  const result = page.filter(
    (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
  );

  return (
    <div>
      <div
        style={{ background: design?.header_color, color: design?.text_color }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:container px-5 py-10 gap-5 overflow-hidden items-center mt-10 ">
          <div className="flex gap-3 items-center ">
            <div>
              <IoLocationOutline className="text-[42px]" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold ">
                {headerSetting?.address}
              </h1>
              <p className="text-[13px] ">Contact Info!..</p>
            </div>
          </div>
          <div className="flex gap-3 items-center w-full justify-center">
            <div>
              <AiOutlineMail className="text-[42px]" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold ">
                {headerSetting?.email}
              </h1>
              <p className="text-[13px] ">Orders Support!</p>
            </div>
          </div>
          <div className="flex gap-3 items-center w-full justify-center">
            <div>
              <BsTelephone className="text-[42px] bs-telephone" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold ">
                {headerSetting?.phone}
              </h1>
              <p className="text-[13px] ">Free support line!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:container px-5 pt-5">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
      </div>
      <div className="sm:container px-5 py-5">
        <div className="grid lg:grid-cols-4 grid-cols-2 lg:flex lg:justify-between justify-items-start gap-5 ">
          <div className="w-full">
            <div className="flex flex-col gap-4">
              <h1 className="text-sm font-semibold ">Social</h1>
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
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h1 className="text-sm font-semibold ">Contact</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-[13px] ">
              <p className="menu-hover">{headerSetting?.email}</p>
              <p className="menu-hover">Call Us: {headerSetting?.phone}</p>
              <p className="menu-hover">Address: {headerSetting?.address}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h1 className="text-sm font-semibold ">Pages</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-[13px] ">
              {menu?.map((m: any) =>
                m?.name !== "Category" ? (
                  <p key={m?.id}>
                    <Link href={m?.url} className="menu-hover">
                      {" "}
                      {m?.name}
                    </Link>
                  </p>
                ) : null
              )}
              {result?.map((m: any) => (
                <p key={m?.id}>
                  <Link href={"/" + m?.link} className="menu-hover">
                    {" "}
                    {m?.name}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h1 className="text-sm font-semibold  ">Top Category</h1>
            </div>
            <div className="flex flex-col gap-3 text-[13px] text-gray-500">
              {category.slice(0, 6).map((item: any) => (
                <div key={item.id} className="">
                  <li className="list-none  menu-hover">
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
      <p className="sm:container px-5 pt-3 pb-20 lg:pb-3 text-[13px] font-light text-[#333333]">
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
      </p>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterSix;
