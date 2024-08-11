import React from "react";
import Newsletter from "./components/newsletter";
import CopyrightAll from "./components/copyrightall";
import MenuList from "./components/menu-list";
import FollowUs from "./components/follow-us";

const FooterFourteen = ({
  design,
  headerSetting,
  store_id,
  menu,
  page,
}: any) => {
  const customDesign = `
    .footer-color:hover{
    color:${design?.header_color};
    }
    .searchBtn:hover{
        background-color:${design?.header_color};
        color:${design?.text_color}
    }
    `;
  const cls = "footer-color";

  return (
    <div className="sm:container px-5 sm:pt-10 pt-5 pb-20 lg:pb-3">
      <Newsletter headerSetting={headerSetting} store_id={store_id} />
      <div className="grid lg:grid-cols-3 grid-cols-1 justify-items-center items-center border-t-2 py-4 sm:pb-4 pb-20">
        <style>{customDesign}</style>
        <div>
          <CopyrightAll headerSetting={headerSetting} />
        </div>
        <div className="flex flex-wrap md:space-x-5 space-x-3 justify-center py-2">
          <MenuList cls={cls} menu={menu} page={page} />
        </div>
        <div className="text-gray-500 text-3xl flex gap-2">
          <FollowUs cls={cls} headerSetting={headerSetting} design={design} />
        </div>
      </div>
      {/* <Messenger /> */}
    </div>
  );
};

export default FooterFourteen;
