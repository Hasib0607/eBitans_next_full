import React from "react";

const SectionHeadingTwentyThree = ({ title, design }: any) => {
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
    <div className='my-5 pb-5 w-full'>
      <div className='flex justify-between items-center w-full gap-2 '>
        <style>{classes}</style>

        <div className='h-[2px] sec-head-bg w-full'></div>
        <div className='text-center'>
          <h3 className='text-lg md:text-xl text-black px-10 w-max font-bold uppercase'>
            {title}
          </h3>
        </div>
        <div className='h-[2px] w-full sec-head-bg'></div>
      </div>
    </div>
  );
};

export default SectionHeadingTwentyThree;
