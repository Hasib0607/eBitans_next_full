import React from "react";

const SectionHeadingNineteen = ({ title, subtitle }: any) => {
  return (
    <div className=" mb-3">
      <p className="text-sm font-sans text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold ">{subtitle}</h3>
    </div>
  );
};

export default SectionHeadingNineteen;
