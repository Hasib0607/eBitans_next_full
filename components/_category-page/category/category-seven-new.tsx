"use client";
import Link from "next/link";
import React, { useState } from "react";

import { HiOutlineAdjustments } from "react-icons/hi";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Card12 from "@/components/card/card12";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PaginationComponent from "./pagination-new";
import FilterByColorNew from "./filter-by-color-new";
import FilterByPriceNew from "./filter-by-price-new";

const fetchData = async (
  id: any,
  sort: string,
  page: number,
  activeColor: any,
  priceValue: any
) => {
  try {
    const encodedColor = encodeURIComponent(activeColor);
    const categoryResponse = await httpReq.post(
      `getcatproducts?page=${page}&filter=${sort}&colorFilter=${encodedColor}&priceFilter=${priceValue}`,
      { id }
    );
    const { colors, data } = categoryResponse;

    console.log(data, "categorydata");

    if (!data) {
      try {
        // Encode activeColor using encodeURIComponent
        const encodedColor = encodeURIComponent(activeColor);

        const subcategoryResponse = await httpReq.post(
          `getsubcatproduct?page=${page}&filter=${sort}&colorFilter=${encodedColor}&priceFilter=${priceValue}`,
          { id }
        );

        const { colors, data } = subcategoryResponse;

        return { colors, data };
      } catch (err) {
        console.error(err);
      }
    }

    return { colors, data };
  } catch (error) {
    console.error(error);
  }
};

const CategorySevenNew = () => {
  const [open, setOpen] = useState(false);

  const { category } = useTheme();
  const { id } = useParams<{ id: string }>();

  // filtering state
  const [sort, setSort] = useState("za");
  const [page, setPage] = useState(1);
  const [activeColor, setActiveColor] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const { data, status } = useQuery({
    queryKey: ["category-products", id, sort, page, activeColor, priceValue],
    queryFn: () => fetchData(id, sort, page, activeColor, priceValue),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className="grid grid-cols-5 lg:gap-8 sm:container px-5 bg-white">
        <div className="lg:col-span-1 lg:block hidden">
          <div className="flex gap-3 py-10">
            <Link href="/">
              <span className="text-base text-gray-500">Home</span>
            </Link>
            <span className="text-base font-medium text-gray-500">/</span>
            <span className="text-base text-gray-600 font-bold">Search</span>
          </div>

          <div className="mt-10 ">
            <h1 className="mb-10 text-2xl text-gray-700 font-medium">
              Category
            </h1>
            {category.map((item: any) => (
              <div key={item.id} className="">
                <SingleCat key={item?.id} item={item} />
              </div>
            ))}
          </div>
          <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
            <FilterByColorNew
              colors={data?.colors}
              setActiveColor={setActiveColor}
              activeColor={activeColor}
            />
          </div>
          <div className="bg-gray-100 border-2 border-gray-200 p-4">
            <FilterByPriceNew
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          </div>
        </div>

        <div className="col-span-5 lg:col-span-4 w-full">
          <div className="flex justify-between py-10">
            <div>
              <h1 className="text-3xl lg:block hidden font-semibold">
                Products
              </h1>
              <div
                onClick={() => setOpen(!open)}
                className="lg:cursor-pointer border-2 border-gray-100 rounded-lg justify-between px-3 w-32 py-2 lg:hidden items-center flex gap-3"
              >
                <HiOutlineAdjustments className="rotate-90 text-xl" />
                <button className="text-xl">`Filter`</button>
              </div>
            </div>
            <div>
              <Filter
                onChange={(e: any) => {
                  setSort(e.target.value);
                }}
              />
            </div>
          </div>
          <Product
            products={data}
            status={status}
            sort={sort}
            activeColor={activeColor}
          />

          <div className="md:mt-12 flex justify-center">
            <PaginationComponent
              lastPage={data?.data?.last_page}
              setPage={setPage}
              currentPage={data?.data?.current_page}
              initialPage={page}
            />
          </div>
        </div>

        {/* tablet and mobile view  */}

        <div className="block py-6 lg:hidden">
          <ul
            className={`lg:hidden bg-white fixed md:w-128 w-96 top-0 overflow-y-auto bottom-0 -ml-32 pb-5 duration-1000 z-10 lg:cursor-pointer ${
              open ? "left-0" : "left-[-120%]"
            }`}
          >
            <div className="flex py-4  items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ml-20">
              <ArrowLeftIcon
                onClick={() => setOpen(!open)}
                className="h-5 basis-2/4"
              />
              <h3 className=" basis-2/4 text-2xl font-medium text-gray-700">
                Filters
              </h3>
            </div>
            <hr className="mr-10 ml-44" />
            <div className="mt-10 ml-36">
              <h1 className="mb-10 text-2xl text-gray-700 font-medium">
                Category
              </h1>

              {category.map((item: any) => (
                <div key={item.id} className="">
                  <SingleCat item={item} />
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategorySevenNew;

const Product = ({ products, status, sort, color }: any) => {
  return (
    <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
      {status === "pending" ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} height={"200px"} />
        ))
      ) : products?.data === undefined ? (
        <p>No Products Found</p>
      ) : (
        products?.data?.data?.map((product: any) => (
          <Card12 key={product.id} item={product} />
        ))
      )}
    </div>
  );
};

const Filter = ({ onChange }: any) => {
  return (
    <div>
      <div className="md:flex  md:flex-row border border-gray-400 py-0 px-0 rounded-xl lg:px-3            justify-between items-center gap-1">
        <div className="md:block hidden">
          <p>Sort By:</p>
        </div>
        <div className="flex items-center gap-1 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
          {/* Short by  */}
          <div className="">
            <select
              onChange={onChange}
              className="w-48 font-medium lg:cursor-pointer h-12 px-2 p-0 text-md border-gray-200 rounded-md  focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
              id="category"
              name="category"
            >
              <option className="lg:cursor-pointer">Sorting Options</option>
              <option className="lg:cursor-pointer" value="az">
                Name, A to Z
              </option>
              <option className="lg:cursor-pointer" value="za">
                Name, Z to A
              </option>
              <option className="lg:cursor-pointer" value="lh">
                Price, Low to High
              </option>
              <option className="lg:cursor-pointer" value="hl">
                Price, High to Low
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(true);

  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;

  return (
    <>
      <div className="w-full flex py-3 lg:cursor-pointer category-page">
        <style>{styleCss}</style>
        <Link
          onClick={() => setShow(!show)}
          href={"/category/" + item.id}
          className={`flex-1 text-sm font-medium `}
        >
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div onClick={() => setShow(!show)} className="px-4 h-full">
            {show ? (
              <MinusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800"
              />
            ) : (
              <PlusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800"
              />
            )}
          </div>
        ) : null}
      </div>

      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any) => (
              <div key={sub.id} className="py-2 category-page">
                <Link href={"/category/" + sub?.id}>
                  <p className={`pb-2 text-sm `}>{sub?.name}</p>
                </Link>
                <div className="pr-4">
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
