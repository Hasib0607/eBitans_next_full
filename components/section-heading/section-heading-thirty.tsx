import React from "react";

const SectionHeadingThirty = ({ title, subtitle }: any) => {
  return (
    <div className=' mb-3 font-twelve '>
      <h3 className='text-[30px] font-semibold'>{title}</h3>
      <p className='text-lg font-sans text-gray-500'>{subtitle}</p>
    </div>
  );
};

export default SectionHeadingThirty;
