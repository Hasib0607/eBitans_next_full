import React from "react";
import Category from "./category";

const StickyNav = ({ openMenu }: any) => {
  return (
    <div className="hidden lg:flex items-center justify-center sticky-menu px-7">
      <Category openMenu={openMenu} />
    </div>
  );
};

export default StickyNav;
