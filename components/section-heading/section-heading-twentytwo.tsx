import React from "react";
// import useTheme from './../../../@/hooks/useTheme';

const SectionHeadingTwentyTwo = ({ text }: { text: string }) => {
  // const {design}=useTheme()
  return (
    <div className="py-1">
      <h3
        className="text-center font-semibold text-[30px] xl:text-[40px] lg:text-[40px] md:text-[40px] "
        style={{ color: "black" }}
      >
        {text}
      </h3>
    </div>
  );
};

export default SectionHeadingTwentyTwo;
