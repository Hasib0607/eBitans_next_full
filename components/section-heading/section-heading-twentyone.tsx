import React from "react";

const SectionHeadingTwentyOne = ({ title, subtitle, design }: any) => {
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
    <div className="">
      <div className="flex flex-wrap items-center gap-2 ">
        <style>{classes}</style>

        <div className="h-4 w-4 rounded-full sec-head-bg sec-head-outline mx-2"></div>
        <div className="">
          <h3 className="sm:text-xl md:text-2xl text-black font-medium uppercase">
            {title}
          </h3>
        </div>
        <div className="">
          <h3 className="sm:text-xl md:text-2xl text-black uppercase">
            {subtitle}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SectionHeadingTwentyOne;
