import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsYoutube, BsFacebook } from "react-icons/bs";
import Newsletter from "./components/newsletter";
import Link from "next/link";

const FooterSeven = ({
  headerSetting,
  category,
  menu,
  page,
  design,
  store_id,
}: any) => {
  const date = new Date().getFullYear();
  const result = page.filter(
    (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
  );

  const styleCss = `

    .footer-seven-menu .active {
        color:  ${design?.header_color};
        font-weight: 700;
    }
    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div className="container px-5 mt-10">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="grid lg:grid-cols-4 grid-cols-2 py-6 lg2:flex justify-between lg:gap-0 gap-5 pb-14">
          <div>
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold">Social</h1>
              <div className="flex flex-col gap-3 text-gray-500 text-sm ">
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
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-semibold">Contact</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-sm ">
              <a href={"mailto:" + headerSetting?.email}>
                <p className="menu-hover">{headerSetting?.email}</p>
              </a>
              <a href={"tel:+88" + headerSetting?.phone}>
                <p className="menu-hover">Call Us: {headerSetting?.phone}</p>
              </a>
              <p className="menu-hover">Address: {headerSetting?.address}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-semibold">Pages</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-sm footer-seven-menu">
              {menu?.map((m: any) =>
                m?.name !== "Category" ? (
                  <p key={m?.id}>
                    <Link href={"/" + m?.url} className="menu-hover">
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
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-semibold">Top Category</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500">
              {category.slice(0, 6).map((item: any) => (
                <div key={item.id} className="">
                  <li className="list-none text-sm menu-hover">
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
      <p className="container px-5 py-5 text-sm text-gray-600 ">
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

export default FooterSeven;
