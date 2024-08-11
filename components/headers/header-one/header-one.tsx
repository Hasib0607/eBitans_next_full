import React from "react";
import HeaderTop from "./header-top";
import HeaderDown from "./header-down";
import HeaderMid from "./header-mid";

const HeaderOne = () => {
  return (
    <div className="flex flex-col gap-1">
      <HeaderTop />
      <HeaderDown />
      <HeaderMid />
    </div>
  );
};

export default HeaderOne;
