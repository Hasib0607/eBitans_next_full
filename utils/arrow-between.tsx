import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Arrowbetween = ({ nextEl, prevEl}: any) => {
  // const { design } = useTheme()

 
  const styleCss = `
   
    .arrow-hover:hover {
      color:  #000;
      background: #fff;
  }
    `;

  return (
    <div className="flex justify-between w-full items-center gap-2 ">
      <style>{styleCss}</style>
      <div
        className={`${prevEl} p-3   ml-1 icon z-[4] rounded-full arrow-hover relative lg:cursor-pointer text-black bg-gray-100 transition-all duration-500  ease-linear`}
      >
        <ChevronLeftIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
      <div
        className={`${nextEl} p-3  mr-1 icon z-[4] rounded-full arrow-hover relative lg:cursor-pointer text-black bg-gray-100 transition-all duration-500  ease-linear`}
      >
        <ChevronRightIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
    </div>
  );
};

export default Arrowbetween;
