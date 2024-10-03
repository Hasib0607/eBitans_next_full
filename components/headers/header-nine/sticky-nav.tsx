import React from "react";
import Category from "./category";

const StickyNav = () => {
  return (
    <div className="hidden lg:flex items-center justify-center sm:container px-5 bg-gray-100">
      <Category />
    </div>
  );
};

export default StickyNav;
