import React, { useRef } from "react";
import Taka from "../../../utils/taka";

const FilterByPriceNew = ({ priceValue, setPriceValue }: any) => {
  const inputRef = useRef<any>(null);

  const handleInputChange = () => {
    setPriceValue(inputRef.current.value);
  };

  return (
    <>
      <h1 className="font-medium text-[#252525] text-xl ">Filter by Price</h1>
      <div className="flex justify-between items-center">
        <label htmlFor="range" className=" mb-2 text-sm font-semibold">
          <Taka tk={0} />
        </label>
        <label htmlFor="range" className=" mb-2 text-sm font-semibold">
          <Taka tk={priceValue} />
        </label>
      </div>
      <input
        min="0"
        max="10000"
        defaultValue={0}
        onChange={handleInputChange}
        id="range"
        type="range"
        className="mb-6 w-full h-2 rounded-lg bg-gray-300 lg:cursor-pointer focus:outline-none"
        ref={inputRef}
      ></input>
    </>
  );
};

export default FilterByPriceNew;
