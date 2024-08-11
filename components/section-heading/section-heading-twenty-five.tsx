import React from "react";
interface Props {
  title?: string;
  subtitle?: string;
  design?: any;
}

const SectionHeadingTwentyFive = ({ title, subtitle, design }: Props) => {
  return (
    <div>
      <div className='container text-center py-10 mb-3'>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-lg text-gray-500'>{subtitle}</p>
        <div
          style={{ background: design?.header_color }}
          className='mx-auto my-3 w-60 h-[3px] rounded-full bg-[#4c9a2a]'
        ></div>
      </div>
    </div>
  );
};

export default SectionHeadingTwentyFive;
