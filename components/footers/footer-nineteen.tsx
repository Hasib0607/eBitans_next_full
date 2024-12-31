import React from "react";
import Newsletter from "./components/newsletter";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import FollowUs from "./components/follow-us";
import MenuList from "./components/menu-list";
import CategoryList from "./components/category-list";
import CopyrightAll from "./components/copyrightall";
import WhatsApp from "./components/whatsApp";
import PageList from "./components/page-list";
import AllPaymantGateway from "./components/all-payment-gateway";

const FooterNineteen = ({
  headerSetting,
  store_id,
  design,
  page,
  menu,
  category,
}: any) => {
  const cls = "text-2xl";

  return (
    <>
      <div className="bg-[#f2efe4] pt-10">
        <div className="sm:container px-5">
          <Newsletter headerSetting={headerSetting} store_id={store_id} />
          <div className="py-10">
            <div className="grid grid-cols-2 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-2 gap-y-10">
              <div className="col-span-2 xl:col-span-4 lg:col-span-2 md:col-span-2">
                {headerSetting?.logo === null ? (
                  <Link href="/">
                    <p className="text-xl uppercase">
                      {headerSetting?.website_name}
                    </p>
                  </Link>
                ) : (
                  <Link href="/">
                    <img
                      className="h-10"
                      src={imgUrl + headerSetting?.logo}
                      alt="logo"
                    />
                  </Link>
                )}
                <p className="mt-6">TEL:+ {headerSetting?.phone}</p>
                <p> Email: {headerSetting?.email}</p>
                <div className="flex gap-x-3 mt-4">
                  <FollowUs
                    cls={cls}
                    headerSetting={headerSetting}
                    design={design}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <MenuList menu={menu} />
              </div>
              <div className="flex flex-col gap-y-2">
                <PageList page={page} />
              </div>

              <div className="flex flex-col gap-y-2">
                <CategoryList category={category} />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:container px-5 mt-8">
          <AllPaymantGateway headerSetting={headerSetting} />
        </div>
      </div>
      <div className="border mb-16 lg:mb-0">
        <div className="sm:container px-5">
          <div className="py-2">
            <CopyrightAll headerSetting={headerSetting} />
          </div>
        </div>
      </div>
      <WhatsApp />
      {/* <Messenger /> */}
    </>
  );
};

export default FooterNineteen;
