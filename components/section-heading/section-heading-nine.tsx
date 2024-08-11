import React from "react";

const SectionHeadingNine = ({ title, subtitle }: any) => {
  return (
    <div className=' bg-white text-center py-10  '>
      <h3 className='text-[28px] font-semibold'>{title}</h3>
      <p className='text-lg font-sans text-gray-500'>{subtitle}</p>
    </div>
  );
};

export default SectionHeadingNine;
