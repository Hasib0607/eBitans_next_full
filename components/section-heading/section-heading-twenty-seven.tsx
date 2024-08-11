import React from "react";
// import useTheme from '../../../@/hooks/useTheme';

const SectionHeadingTwentySeven = ({ title, subtitle }: any) => {
  // const { design } = useTheme()

  // const classes = `
  // .sec-head-bg{
  //     background-color:${design?.header_color};
  // }
  // .sec-head-outline{
  //     outline: 1px solid ${design?.header_color};
  //     outline-offset: 5px;
  // }

  // `
  return (
    <div className="my-5 pb-5 w-full">
      {/* <style>{classes}</style> */}
      <div className="text-left">
        <h3 className="text-2xl md:text-3xl text-black font-semibold mb-4">
          {title}{" "}
          <span className="text-2xl md:text-3xl text-gray-500 font-semibold mb-4">
            {subtitle}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default SectionHeadingTwentySeven;
