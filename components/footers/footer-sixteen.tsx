import React from "react";
import { MdDeliveryDining, MdSecurity, MdSupportAgent } from "react-icons/md";
import Newsletter from "./components/newsletter";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import MyAccount from "./components/myaccount";
import MenuList from "./components/menu-list";
import CopyrightAll from "./components/copyrightall";
import FollowUs from "./components/follow-us";

const FooterSixteen = ({
  headerSetting,
  store_id,
  menu,
  page,
  design,
}: any) => {
  const cls = "text-2xl text-gray-600";
  return (
    <div className="bg-gray-100 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between justify-items-start sm:container px-5 sm:py-10 py-5 pb-14 gap-5 overflow-hidden items-center border-b-[1px] border-gray-300 text-gray-600">
        <div className="flex gap-3 items-center ">
          <div>
            <MdSecurity className="text-[42px]" />
          </div>
          <div>
            <h1 className="text-[16px] font-semibold ">MONEY BACK GUARANTEE</h1>
            <p className="text-[13px] ">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center ">
          <div>
            <MdSupportAgent className="text-[42px]" />
          </div>
          <div>
            <h1 className="text-[16px] font-semibold ">
              24/7 CUSTOMER SUPPORT
            </h1>
            <p className="text-[13px] ">{headerSetting?.phone}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <MdDeliveryDining className="text-[42px] bs-telephone" />
          </div>
          <div>
            <h1 className="text-[16px] font-semibold ">
              FAST AND LOW COST DELIVERY
            </h1>
            <p className="text-[13px] ">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>

      <div className="sm:container px-5 mt-10">
        <Newsletter headerSetting={headerSetting} store_id={store_id} />
        <div className="grid lg:grid-cols-4 grid-cols-2 py-6 gap-5 ">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <img className="h-14" src={imgUrl + headerSetting?.logo} alt="" />{" "}
            </Link>
            <p className="text-gray-600 pt-4">
              {headerSetting?.short_description}
            </p>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <div>
              <h1 className="text-lg font-semibold ">CONTACT INFO</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-base ">
              <p className="menu-hover">{headerSetting?.email}</p>
              <p className="menu-hover">Call Us: {headerSetting?.phone}</p>
              <p className="menu-hover">Address: {headerSetting?.address}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-semibold ">QUICK LINKS</h1>
            </div>
            <div className="flex flex-col gap-3 text-gray-500 text-base ">
              <MyAccount />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-semibold  ">TOP MENU</h1>
            </div>
            <div className="flex flex-col gap-3 text-base text-gray-500">
              <MenuList menu={menu} page={page} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex md:flex-row flex-col gap-3 md:justify-between text-center items-center sm:container px-5 pt-5 pb-20 lg:pb-5 ">
        <div>
          <CopyrightAll headerSetting={headerSetting} />
        </div>

        <div className="flex gap-3 text-gray-500 text-base">
          <FollowUs cls={cls} headerSetting={headerSetting} design={design} />
        </div>
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterSixteen;
