import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

const ArrowSquare = ({ nextEl, prevEl, design }: any) => {
  return (
    <div className='flex  justify-between w-full items-center gap-2 '>
      <div
        className={`${prevEl} p-3 icon z-[5] relative text-gray-400 hover:text-white transition-all duration-500  ease-linear`}
        style={{
          backgroundColor: design ? design?.header_color : "",
          color: design ? design?.text_color : "",
        }}
      >
        <ChevronLeftIcon className='h-4 w-4 text-2xl font-serif font-bold' />
      </div>
      <div
        className={`${nextEl} p-3 icon z-[5] relative text-gray-400 hover:text-white transition-all duration-500  ease-linear`}
        style={{
          backgroundColor: design ? design?.header_color : "",
          color: design ? design?.text_color : "",
        }}
      >
        <ChevronRightIcon className='h-4 w-4 text-2xl font-serif font-bold' />
      </div>
    </div>
  );
};

export default ArrowSquare;
