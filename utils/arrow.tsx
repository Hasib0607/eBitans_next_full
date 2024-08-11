import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

const Arrow = ({ nextEl, prevEl, design }: any) => {
  //   const { design } = useTheme();
  const customDesign = `
    .arrowDesign{
        color:${design?.header_color};
        background-color:${design?.text_color};
        border:1px solid ${design?.header_color};
}

.arrowDesign:hover{
    background-color:${design?.header_color};
    color:${design?.text_color};
    border:1px solid ${design?.text_color};
}
        }`;

  return (
    <div className="flex justify-end  gap-2">
      <style>{customDesign}</style>

      <div
        className={`${prevEl} p-3 icon rounded-full border bg-white  relative  text-gray-400 hover:text-white transition-all duration-500  ease-linear arrowDesign`}
      >
        <ChevronLeftIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
      <div
        className={`${nextEl} p-3 icon rounded-full bg-white border border-gray-100 relative hover:bg-orange-200 text-gray-400 hover:text-white transition-all duration-500  ease-linear arrowDesign`}
      >
        <ChevronRightIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
    </div>
  );
};

export default Arrow;
