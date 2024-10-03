import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import Newsletter from "./components/newsletter";
import { imgUrl } from "@/site-settings/siteUrl";
import CopyrightAll from "./components/copyrightall";
import CategoryList from "./components/category-list";
import MenuList from "./components/menu-list";
import FollowUs from "./components/follow-us";

const FooterNine = ({
  headerSetting,
  design,
  store_id,
  category,
  menu,
  page,
}: any) => {
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
  const clsMenu = "text-base font-normal leading-relaxed";
  const clsFollow = "text-3xl footerColor";
  return (
    <div style={{ background: "#f6f6f6" }}>
      <div className="sm:container px-5 pb-20 lg:pb-0">
        <style>{customDesign}</style>
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <footer className="grid xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 ">
          <div>
            <div className="py-5 px-5 lg:grid xl:justify-items-end">
              <div className="py-3">
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
                <CopyrightAll headerSetting={headerSetting} />
              </div>
            </div>
          </div>

          <div className="xl:col-span-2" style={{ background: "#efefef" }}>
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 py-8 px-5">
              <div>
                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                  Products
                </h1>
                <div className="mt-5">
                  <CategoryList cls={clsMenu} category={category} />
                </div>
              </div>
              <div>
                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                  Our Pages
                </h1>
                <div className="mt-5">
                  <MenuList cls={clsMenu} menu={menu} page={page} />
                </div>
              </div>
              <div className="xl:col-span-2 lg:col-span-2">
                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                  Follow Us
                </h1>
                <div className="flex gap-2 mt-5">
                  <FollowUs
                    cls={clsFollow}
                    headerSetting={headerSetting}
                    design={design}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <Messenger /> */}
        </footer>
      </div>
    </div>
  );
};

export default FooterNine;
