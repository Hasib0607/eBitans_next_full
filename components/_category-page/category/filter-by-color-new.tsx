import React from "react";

const FilterByColorNew = ({ setActiveColor, colors, activeColor }: any) => {
  return (
    <>
      <h1 className="font-medium text-[#252525] text-xl ">Filter by Color</h1>
      <div className="flex flex-wrap gap-2 mt-3">
        <p
          onClick={() => {
            setActiveColor("");
          }}
          className="h-6 w-6 rounded-full bg-white border-2 border-red-500 hover:cursor-pointer relative overflow-hidden "
        >
          <p className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] text-center mx-auto bg-red-500 rotate-45 "></p>
        </p>

        {colors?.map((item: any, id: any) => (
          <>
            <p
              onClick={() => {
                setActiveColor(item?.code);
              }}
              style={{ background: item?.code }}
              className={`${
                activeColor === item?.code
                  ? "ring-2 ring-offset-2 ring-red-500"
                  : ""
              } h-6 w-6 border border-gray-800 rounded-full hover:cursor-pointer`}
            ></p>
          </>
        ))}
      </div>
    </>
  );
};

export default FilterByColorNew;
