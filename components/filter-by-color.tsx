import Link from "next/link";
import React from "react";

const FilterByColor = ({
  setActiveColor,
  colors,
  activeColor,
  id,
  shop_load,
  setPage,
  setHasMore,
}: any) => {
  // const shopUrl = `${
  //   shop_load ? `/shop=${encodeURIComponent("?page=1")}` : "/shop"
  // }`;
  // const categoryUrl = `/category/${id}=${encodeURIComponent("?page=1")}`;

  // const url = id ? categoryUrl : shopUrl;

  return (
    <>
      <h1 className="font-medium text-[#252525] text-xl ">Filter by Color</h1>
      <div className="flex flex-wrap gap-2 mt-3">
        {/* <Link href={`${url}`}> */}
        <p
          onClick={() => {
            setActiveColor("");
            setPage(1);
            setHasMore(true);
          }}
          className="h-6 w-6 rounded-full bg-white border-2 border-red-500 relative overflow-hidden "
        >
          <p className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] text-center mx-auto bg-red-500 rotate-45"></p>
        </p>
        {/* </Link> */}
        {colors?.map((item: any, id: any) => (
          // <Link key={id} href={`${url}`}>
          <p
            key={id}
            onClick={() => {
              setActiveColor(item?.code);
              setPage(1);
              setHasMore(true);
            }}
            style={{ background: item?.code }}
            className={`${
              activeColor === item?.code
                ? "ring-2 ring-offset-2 ring-red-500"
                : ""
            } h-6 w-6 border border-gray-800 rounded-full`}
          ></p>
          // </Link>
        ))}
      </div>
    </>
  );
};

export default FilterByColor;
