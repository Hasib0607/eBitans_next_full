import Link from "next/link";
import React from "react";

import { BsTelephoneFill } from "react-icons/bs";
import FollowUs from "./components/follow-us";
import CopyrightAll from "./components/copyrightall";

const FooterThirtyEight = ({
  headerSetting,
  category,
  menu,
  design,
  page,
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
    .footerThirtySeven {
        margin: 0;
        padding-bottom: 7px;
        position: relative;
    }
    
    .footerThirtySeven:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;
        content: '';
        bottom: 0;
        width: 30px;
        left: 0;
    }
    `;
  return (
    <div className={`bg-[#191919] text-white`}>
      <footer className="">
        <style>{customDesign}</style>
        <div className="grid lg2:grid-cols-3 sm:grid-cols-1 gap-1 gap-y-5 sm:container px-5 py-10">
          <div className="px-5">
            <h1 className="text-sm tracking-widest uppercase mb-5">SUPPORT</h1>
            <a href={"tel:+88" + headerSetting?.phone}>
              <div className="px-5 border border-[#666666] w-max rounded-full flex items-center gap-x-3">
                <BsTelephoneFill className="" />
                <p className="px-4 my-2 border-l border-[#666666] text-[#666666]">
                  {headerSetting?.phone}
                </p>
              </div>
            </a>
          </div>

          <div className="xl:col-span-2 lg:col-span-2">
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 px-5">
              <div>
                <h1 className="text-sm tracking-widest uppercase">Products</h1>
                <div className="mt-5">
                  {category?.slice(0, 6).map((data: any) => (
                    <Link
                      href={"/category/" + data?.id}
                      key={data?.id}
                      className="text-base footerColor font-normal leading-relaxed text-[#666666]"
                    >
                      {" "}
                      {data.name} <br />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="text-sm tracking-widest uppercase">Pages</h1>
                <div className="mt-5 list-none">
                  {menu?.map((m: any) =>
                    m?.name !== "Category" ? (
                      <li key={m?.id}>
                        <Link
                          href={m?.url}
                          className="text-base footerColor font-normal leading-relaxed text-[#666666]"
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
                        className="text-base footerColor font-normal leading-relaxed text-[#666666]"
                      >
                        {" "}
                        {m?.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>
              <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
                <h1 className="text-sm tracking-widest uppercase">Follow Us</h1>
                <div className="flex gap-x-3 mt-3 text-3xl">
                  <FollowUs headerSetting={headerSetting} design={design} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Messenger /> */}
      </footer>
      <div className="pb-20 lg:pb-5 sm:container px-5 text-[#666666]">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
    </div>
  );
};

export default FooterThirtyEight;
