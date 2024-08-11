// created by iazadur
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const SectionHeadingThirteen = ({ prev, next, title, design }: any) => {
  const classes = `
    .arrow{
        color: ${design?.header_color};
        background-color:${design?.text_color};
    }
    .arrow:hover{
        color: ${design?.text_color};
        background-color:${design?.header_color};
    }
    `;
  return (
    <div className='my-5 flex justify-between items-center bg-[#f1f1f1]'>
      <style>{classes}</style>
      <div className='flex items-center gap-2'>
        <div className='bg-red-500 p-2 '>
          <StarIcon className='h-8 w-8 font-thin text-white' />
        </div>
        <h3 className='text-xl md:text-2xl text-[#414141] font-medium'>
          {title}
        </h3>
      </div>
      <div className='flex items-center gap-1 mr-2'>
        <div
          className={`${prev} rounded-full border arrow border-gray-400 p-1 transition-all duration-300 ease-linear`}
        >
          <ChevronLeftIcon className='h-4 w-4 ' />
        </div>
        <div
          className={`${next} rounded-full border arrow border-gray-400 p-1 transition-all duration-300 ease-linear`}
        >
          <ChevronRightIcon className='h-4 w-4' />
        </div>
      </div>
    </div>
  );
};

export default SectionHeadingThirteen;
