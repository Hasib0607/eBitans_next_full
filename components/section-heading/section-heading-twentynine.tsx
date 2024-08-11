import React from "react";

const SectionHeadingTwentyNine = ({ title, design }: any) => {
  const classes = `
    .sec-twenty-nine{
        border-bottom: 2px solid ${design?.header_color};
    }
   
   
    `;
  return (
    <div className='my-5 pb-5 w-full relative'>
      <style>{classes}</style>
      <div className='z-[1] relative'>
        <h3 className='text-lg md:text-xl text-black pb-[10px] w-max font-bold capitalize sec-twenty-nine'>
          {title}
        </h3>
      </div>
      <div className='absolute h-[1px] bg-gray-300 w-full top-10'></div>
    </div>
  );
};

export default SectionHeadingTwentyNine;
