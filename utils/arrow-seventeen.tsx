import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ArrowSeventeen = ({ nextEl, prevEl, design }: any) => {
  const customDesign = `
    .arrowDesign{
        color:${design?.text_color};
        background-color:${design?.header_color};
        border:1px solid ${design?.header_color};
}

.arrowDesign:hover{
    background-color:${design?.header_color};
    color:${design?.text_color};
    border:1px solid ${design?.text_color};
}
}`;

  return (
    <div className="flex justify-end gap-8  ">
      <style>{customDesign}</style>

      <div
        className={`${prevEl} p-3 icon rounded-md  border bg-white  relative  text-gray-400 hover:text-white transition-all duration-500  ease-linear arrowDesign`}
      >
        <ChevronLeftIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
      <div
        className={`${nextEl} p-3 icon rounded-md bg-white ml-14 border border-gray-100 relative hover:bg-orange-200 text-gray-400 hover:text-white transition-all duration-500  ease-linear arrowDesign`}
      >
        <ChevronRightIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
    </div>
  );
};

export default ArrowSeventeen;
