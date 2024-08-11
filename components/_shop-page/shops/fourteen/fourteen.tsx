"use client";
import useTheme from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "@/components/_category-page/category/pagination";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Card32 from "@/components/card/card32";

const Fourteen = ({ data }: any) => {
  const { category, design, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [open, setOpen] = useState<any>(false);
  const [sort, setSort] = useState<any>("");
  const [val, setVal] = useState<any>(0);
  const [colors, setColors] = useState<any>(null);
  const [activeColor, setActiveColor] = useState<any>(null);
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<any>(true);

  console.log(sort, "sort");

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  const styleCss = `
  .btn-hover:hover {
      color:   ${design?.text_color};
      background:${design?.header_color};
      border: 1px solid transparent;
  }
  .filter {
    color: ${design?.text_color};
    background:${design?.header_color};
  }
  .text-hover:hover {
    color: ${design?.header_color};   
  }
`;

  return (
    <div>
      <style>{styleCss}</style>
      {/* banner section  */}
      <div className="h-80 bg-gray-100 w-full flex flex-col gap-3 justify-center items-center">
        <div>
          <h1 className="text-5xl font-medium">Products</h1>
        </div>
        <div className="flex gap-1 items-center">
          <p>Home</p>
          <IoIosArrowForward className="text-xs mt-1" />
          <p className="font-medium">Products</p>
        </div>
      </div>

      {/* main section  */}

      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="grid grid-cols-4 gap-8">
          <div className="lg:col-span-3 col-span-4 ">
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center pb-3">
              <div
                onClick={() => setOpen(!open)}
                className={`px-7  md:order-first py-1 flex gap-3 items-center lg:cursor-pointer btn-hover ${
                  open === true
                    ? "filter border-transparent text-white"
                    : "bg-white border-[1px] border-black"
                }`}
              >
                <BiFilterAlt className="text-xl" />
                <p className="text-lg uppercase ">Filter</p>
              </div>

              <div className="text-gray-500 font-thin order-3 md:order-2">
                There are {paginate?.total} products{" "}
              </div>

              <div className="md:order-last ">
                <Filter
                  onChange={(e: any) => {
                    setSort(e.target.value);
                    setPage(1);
                    setHasMore(true);
                  }}
                  paginate={paginate}
                />
              </div>
            </div>

            {/* filter category  */}
            {open && (
              <div className="py-4 px-10 border-[1px] ">
                <div className="text-lg font-medium py-3 flex flex-col gap-2">
                  <h1>Categories</h1>
                  <p className="h-[1px] w-14 bg-black"></p>
                </div>
                <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
                  {category?.map((item: any) => (
                    <SingleCat key={item?.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 pt-10">
              <Product
                page={pageShop}
                sort={sort}
                products={products}
                setProducts={setProducts}
                setPaginate={setPaginate}
                setColors={setColors}
                activeColor={activeColor}
                val={val}
                setPage={setPage}
                shop_load={shop_load}
                setHasMore={setHasMore}
                hasMore={hasMore}
              />
            </div>
            {shop_load === 1 && (
              <div className="my-5">
                <Pagination paginate={paginate} />
              </div>
            )}
          </div>

          {/* category side  */}
          <div className="col-span-1 lg:block hidden">
            <div className="flex items-center gap-3">
              <p className="h-[40px] w-[5px] bg-black"></p>
              <h1 className="text-xl">Categories</h1>
              <p className="h-[1px] w-full bg-gray-300"></p>
            </div>
            <div>
              {category?.map((item: any) => (
                <SingleCat key={item?.id} item={item} />
              ))}
            </div>
            <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
              <FilterByColor
                setActiveColor={setActiveColor}
                colors={colors}
                activeColor={activeColor}
                shop_load={shop_load}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
            <div className="bg-gray-100 border-2 border-gray-200 p-4">
              <FilterByPrice
                setVal={setVal}
                val={val}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fourteen;

const Product = ({
  products,
  grid,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  setColors,
  activeColor,
  val,
  setPage,
  shop_load,
  setHasMore,
  hasMore
}: any) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoad(true);
    fetchData();
  }, [
    shop_load === 1 && page,
    setShops,
    activeColor,
    sort,
    setColors,
    activeColor,
    val
  ]);

  const fetchData = async () => {
    // get the data from the api
    const { colors, data, error } = await httpReq.get(
      `shoppage/products${
        page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
      }&name=${window.location.host}&filter=${sort}&priceFilter=${
        Number(val) !== 0 ? Number(val) : ""
      }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`
    );

    if (error) {
      setPaginate(null);
      setProducts([]);
      setColors(colors);
      return setError(error);
    } else if (data?.data?.length > 0) {
      if (!shop_load) {
        if (data?.current_page === 1) {
          setProducts(data?.data);
        } else {
          setProducts([...products, ...data?.data]);
        }
        setPage(page + 1);
      } else {
        setProducts(data?.data);
      }

      setPaginate(data);
      setLoad(false);
      setError(null);
      setColors(colors);
    } else if (data?.current_page === 1) {
      setProducts([]);
      setHasMore(false);
      setPaginate(data);
    } else {
      setHasMore(false);
    }
    // console.log(result);
    setLoad(false);
  };

  if (load) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <OvalLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        {error}
      </div>
    );
  }
  return (
    <>
      {!shop_load ? (
        <div>
          <InfiniteScroll
            style={{ height: "auto", overflow: "hidden" }}
            dataLength={products?.length}
            next={fetchData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#f1593a"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  // wrapperClassName=""
                  visible={true}
                />
              </div>
            }
            endMessage={
              <p className="text-center mt-5 text-xl font-bold mb-3">
                No More Products
              </p>
            }
          >
            <div className="">
              {products.map((item: any) => (
                <div key={item?.id}>
                  <Card32 item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="">
          {products.map((item: any) => (
            <div key={item?.id}>
              <Card32 item={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Filter = ({ onChange }: any) => {
  return (
    <div>
      {/* Short by  */}
      <div className="">
        <select
          onChange={onChange}
          className="lg:cursor-pointer px-8 text-base border-black flex items-center focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
          id="category"
          name="category"
        >
          <option className="lg:cursor-pointer">Featured</option>
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
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex px-4 py-3 lg:cursor-pointer">
        <Link
          href={"/category/" + item.id}
          className="flex-1 text-sm text-gray-900 font-medium text-hover"
        >
          {" "}
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div className="px-4 h-full">
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
      <div className=" px-4">
        <div className="h-[1px] bg-gray-400 w-full"></div>
      </div>
      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any, idx: any) => (
              <div className="py-2" key={idx}>
                <Link href={"/category/" + sub?.id}>
                  {" "}
                  <p className="pb-2 text-sm text-gray-500 text-hover">
                    {sub?.name}
                  </p>
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
