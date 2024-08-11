import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
}
const SectionHeadingTen = ({ title, subtitle }: Props) => {
  return (
    <div className=' bg-white  mb-3 text-center py-10'>
      <h3 className='text-2xl font-semibold'>{title}</h3>
      <p className='text-md pt-2 font-sans text-gray-500'>{subtitle}</p>
    </div>
  );
};

export default SectionHeadingTen;
