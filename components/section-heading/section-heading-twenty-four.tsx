import React from "react";

const SectionHeadingTwentyFour = ({ title, subtitle, design }: any) => {
  const classes = `
    .sec-head-bg{
        background-color:${design?.header_color};
    }
    .sec-head-outline{
        outline: 1px solid ${design?.header_color};
        outline-offset: 5px;
    }
   
    `;
  return (
    <div className="my-5 pb-5 w-full">
      <style>{classes}</style>
      <div className="text-center lg:px-60">
        <h3 className="text-2xl md:text-3xl text-black font-extrabold uppercase mb-4">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default SectionHeadingTwentyFour;
