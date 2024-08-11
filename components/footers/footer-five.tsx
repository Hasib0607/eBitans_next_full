import { imgUrl } from "@/site-settings/siteUrl";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import FollowUs from "./components/follow-us";
import CopyrightAll from "./components/copyrightall";
import Link from "next/link";
import NewsletterTwo from "./components/newsletter-two";

const FooterFive = ({
  headerSetting,
  category,
  menu,
  design,
  page,
  store_id,
}: any) => {
  const result = page.filter(
    (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
  );

  const customDesign = `
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
    `;
  return (
    <div
      className={`${
        store_id === 1850 ? "bg-black text-white" : "bg-[#EFEFEF] text-black"
      }`}
    >
      <footer className="">
        <style>{customDesign}</style>
        <div className="grid lg2:grid-cols-3 sm:grid-cols-1 gap-1 container px-5">
          <div className="py-8 xl:bg-transparent">
            <div className="px-5">
              <div className="">
                <img
                  className="w-auto h-14"
                  src={imgUrl + headerSetting?.logo}
                  alt=""
                />
                <p className="py-5 text-base font-light">
                  {headerSetting?.short_description}
                </p>
                <div className="py-8 flex flex-row xl:gap-4 space-x-4 gap-3 items-center">
                  <div>
                    <FiPhoneCall
                      style={{ color: design?.header_color }}
                      className="text-3xl"
                    />
                  </div>
                  <div className="lg:px-4 md:px-4 ">
                    <h5>NEED HELP ?</h5>
                    <h1 className="font-semibold">{headerSetting?.phone}</h1>
                  </div>
                </div>
                <div className="flex gap-x-3 mt-3 text-3xl">
                  <FollowUs headerSetting={headerSetting} design={design} />
                </div>
                <p className="hidden lg2:block mt-5">
                  <CopyrightAll headerSetting={headerSetting} />
                </p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 lg:col-span-2 pb-20 ">
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 py-8 px-5">
              <div>
                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                  Products
                </h1>
                <div className="mt-5">
                  {category?.slice(0, 6).map((data: any) => (
                    <Link
                      href={"/category/" + data?.id}
                      key={data?.id}
                      className="text-base footerColor font-normal leading-relaxed "
                    >
                      {" "}
                      {data.name} <br />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                  Pages
                </h1>
                <div className="mt-5 list-none">
                  {menu?.map((m: any) =>
                    m?.name !== "Category" ? (
                      <li key={m?.id}>
                        <Link
                          href={m?.url}
                          className="text-base footerColor font-normal leading-relaxed "
                        >
                          {" "}
                          {m?.name}
                        </Link>
                      </li>
                    ) : null
                  )}
                  {result?.map((m: any) => (
                    <li key={m?.id}>
                      <Link
                        href={"/" + m?.link}
                        className="text-base footerColor font-normal leading-relaxed "
                      >
                        {" "}
                        {m?.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
              <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                  Newsletter
                </h1>
                <div>
                  <NewsletterTwo store_id={store_id} />
                </div>
              </div>
              <div className="mt-5 block lg2:hidden md:col-span-3">
                <CopyrightAll />
              </div>
            </div>
          </div>
        </div>
        {/* <Messenger /> */}
      </footer>
    </div>
  );
};

export default FooterFive;
