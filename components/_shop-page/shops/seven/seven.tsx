"use client";
import FilterByColorNew from "@/components/_category-page/category/filter-by-color-new";
import FilterByPriceNew from "@/components/_category-page/category/filter-by-price-new";
import PaginationComponent from "@/components/_category-page/category/pagination-new";
import Card12 from "@/components/card/card12";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import { useIntersection } from "@mantine/hooks";

const fetchData = async (
  page: any,
  activeColor: any,
  priceValue: any,
  sort: any
) => {
  const encodedColor = encodeURIComponent(activeColor);

  const { colors, data } = await httpReq.get(
    `/shoppage/products?name=${window.location.host}&page=${page}&colorFilter=${encodedColor}&priceFilter=${priceValue}&filter=${sort}`
  );
  return { data, colors };
};

const Seven = () => {
  const { module, category } = useTheme();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("za");
  const [activeColor, setActiveColor] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [page, setPage] = useState(1);

  const [pds, setPds] = useState<any[]>([]);

  const isInfinityScroll = module?.some((m: any) => Number(m.status) === 0);

  const {
    data: productsData,
    status,
    refetch,
  } = useQuery({
    queryKey: ["shop-products", page, activeColor, priceValue, sort],
    queryFn: () => fetchData(page, activeColor, priceValue, sort),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isInfinityScroll) {
      setPds(productsData?.data?.data || []);
    } else {
      setPds((prev) =>
        Array.isArray(prev)
          ? [...prev, ...(productsData?.data?.data || [])]
          : productsData?.data?.data || []
      );
    }
  }, [status, productsData, isInfinityScroll]);

  useEffect(() => {
    refetch();
    setPds([]);
    if (status === "success") {
      setPds(productsData?.data?.data);
    }
    setPage(1);
  }, [activeColor, priceValue, sort]);

  console.log("");
  return (
    <div className="grid grid-cols-5 lg:gap-8 sm:container px-5 bg-white">
      <div className="lg:col-span-1 lg:block hidden">
        <div className="flex gap-3 py-10">
          <Link href="/">
            <span className="text-base text-gray-500">Home</span>
          </Link>
          <span className="text-base font-medium text-gray-500">/</span>
          <span className="text-base text-gray-600 font-bold">Shop</span>
        </div>

        <div className="mt-10 ">
          <h1 className="mb-10 text-2xl text-gray-700 font-medium">
            Category{" "}
          </h1>

          {category.map((item: any) => (
            <div key={item.id} className="">
              <SingleCat item={item} />
            </div>
          ))}
        </div>
        {/* Filter By Color New */}
        <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
          <FilterByColorNew
            colors={productsData?.colors}
            setActiveColor={setActiveColor}
            activeColor={activeColor}
          />
        </div>

        {/* Filter By Price New */}
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
            <h1 className="text-3xl lg:block hidden font-semibold">Shop</h1>
            <div
              onClick={() => setOpen(!open)}
              className="lg:cursor-pointer border-2 border-gray-100 rounded-lg justify-between px-3 w-32 py-2 lg:hidden items-center flex gap-3"
            >
              <HiOutlineAdjustments className="rotate-90 text-xl" />
              <button className="text-xl">Filter</button>
            </div>
          </div>
          {/* Filter By Price and name */}
          <div>
            <Filter
              onChange={(e: any) => {
                setSort(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div>
          <Product
            status={status}
            products={pds}
            setPage={setPage}
            isInfinityScroll={isInfinityScroll}
          />
        </div>

        {!isInfinityScroll && (
          <div className="md:mt-12 flex justify-center">
            <PaginationComponent
              lastPage={productsData?.data.last_page}
              setPage={setPage}
              currentPage={productsData?.data.current_page}
              initialPage={page}
            />
          </div>
        )}
      </div>

      {/* tablet and mobile view  */}

      <div className="block py-6 lg:hidden">
        <ul
          className={`lg:hidden bg-white fixed md:w-128 w-96 top-0  overflow-y-auto bottom-0 -ml-32 pb-5 duration-1000 z-10 lg:cursor-pointer ${
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
  );
};

export default Seven;

const Product = ({ products, status, setPage, isInfinityScroll }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && isInfinityScroll) {
      setPage((prevPage: any) => prevPage + 1);
    }
  }, [entry, isInfinityScroll]);

  return (
    <div
      ref={containerRef}
      className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2"
    >
      {status === "pending" ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} height={"200px"} />
        ))
      ) : products?.length <= 0 ? (
        <p>No Products Found</p>
      ) : (
        products?.map((product: any, index: any) => {
          if (index === products.length - 1) {
            return (
              <div ref={ref} className="last" key={product?.id}>
                {Object.keys(product).length > 0 && <Card12 item={product} />}
              </div>
            );
          }
          return (
            <div key={product?.id}>
              {Object.keys(product).length > 0 && <Card12 item={product} />}
            </div>
          );
        })
      )}
    </div>
  );
};

const Filter = ({ onChange }: any) => {
  return (
    <div>
      <div className="md:flex md:flex-row border border-gray-400  py-0 px-0 rounded-xl lg:px-3 justify-between items-center gap-1">
        <div className="md:block hidden">
          <p>Sort By:</p>
        </div>
        <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
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

          {/* <p onClick={() => setOpen(!open)} className={`px-10 py-1 md:hidden flex  text-sm font-semibold bg-black text-white ${open === true ? "filter border-transparent " : "bg-black border-black"} lg:cursor-pointer`}>FILTER</p> */}
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex py-3 lg:cursor-pointer">
        <Link
          onClick={() => setShow(!show)}
          href={"/category/" + item.id}
          className="flex-1 text-sm text-gray-900 font-medium"
        >
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div onClick={() => setShow(!show)} className="px-4 h-full">
            {show ? (
              <MinusIcon className="h-4 w-4 text-gray-800" />
            ) : (
              <PlusIcon className="h-4 w-4 text-gray-800" />
            )}
          </div>
        ) : null}
      </div>

      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any) => (
              <div className="py-2" key={sub.id}>
                <Link href={"/category/" + sub?.id}>
                  <p className="pb-2 text-sm text-gray-500">{sub?.name}</p>
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
