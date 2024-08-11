import React, { useRef } from "react";
// import { useRouter } from "next/navigation";
import Taka from "../utils/taka";
const FilterByPrice = ({ setVal, val, id, setPage, setHasMore }: any) => {
  // const router = useRouter();
  const inputRef = useRef<any>(null);

  // const shopUrl = `/shop=${encodeURIComponent("?page=1")}`;
  // const categoryUrl = `/category/${id}=${encodeURIComponent("?page=1")}`;

  // const url = id ? categoryUrl : shopUrl;

  const handleInputChange = () => {
    setTimeout(() => {
      setVal(inputRef.current.value);
      // router.push(url);
      setPage(1);
      setHasMore(true);
    }, 1000);
  };

  return (
    <>
      <h1 className="font-medium text-[#252525] text-xl ">Filter by Price</h1>
      <div className="flex justify-between items-center">
        <label htmlFor="range" className=" mb-2 text-sm font-semibold">
          <Taka tk={0} />
        </label>
        <label htmlFor="range" className=" mb-2 text-sm font-semibold">
          <Taka tk={val} />
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

export default FilterByPrice;
