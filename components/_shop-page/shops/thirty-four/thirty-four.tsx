"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoGridSharp } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "@/components/_category-page/category/pagination";
import OvalLoader from "@/components/loader/oval-loader";
import Card60 from "@/components/card/card60";
import Card6 from "@/components/card/card6";
import {
  MinusIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import httpReq from "@/utils/http/axios/http.service";

const ThirtyFour = ({ data }: any) => {
  const { category, design, module, store_id } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState<any>("H");
  const [sort, setSort] = useState<any>("");
  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [shops, setShops] = useState<any>({});
  const [select, setSelect] = useState<any>(parseInt(data?.id));
  const [val, setVal] = useState<any>(0);
  const [colors, setColors] = useState<any>(null);
  const [activeColor, setActiveColor] = useState<any>(null);
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<any>(true);

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  const styleCss = `
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
    }
    .sec-twenty-nine{
        border-bottom: 2px solid ${design?.header_color};
    }
 `;

  return (
    <div className="bg-[#F9F8FF]">
      <Location category={shops} />

      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className=" hidden lg:block col-span-3 ">
            <div className="w-full relative h-max">
              <h3 className="font-medium text-[#252525] text-xl  mb-4 pb-[10px] w-max">
                Categories
              </h3>
              <div className="absolute h-[1px] bg-gray-300 w-full top-[39px]"></div>
              {category?.map((item: any) => (
                <SingleCat
                  key={item?.id}
                  item={item}
                  setSelect={setSelect}
                  select={select}
                />
              ))}
            </div>

            {store_id !== 6433 && (
              <div className="border border-gray-200 my-6 p-4">
                <FilterByColor
                  setActiveColor={setActiveColor}
                  colors={colors}
                  activeColor={activeColor}
                  shop_load={shop_load}
                  setPage={setPage}
                  setHasMore={setHasMore}
                />
              </div>
            )}

            {store_id !== 6433 && (
              <div className="border border-gray-200 p-4">
                <FilterByPrice
                  setVal={setVal}
                  val={val}
                  setPage={setPage}
                  setHasMore={setHasMore}
                />
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
            <Filter
              onChange={(e: any) => {
                setSort(e.target.value);
                setPage(1);
                setHasMore(true);
              }}
              grid={grid}
              setGrid={setGrid}
              paginate={paginate}
            />
            <div className="flex-1">
              <Product
                page={pageShop}
                sort={sort}
                grid={grid}
                products={products}
                setShops={setShops}
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
        </div>
      </div>
    </div>
  );
};

export default ThirtyFour;

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
  hasMore,
}: any) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shop_load === 1 && page,
    setShops,
    activeColor,
    sort,
    setColors,
    activeColor,
    val,
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
            {grid === "H" && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
                {products.map((item: any) => (
                  <motion.div
                    key={item?.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card60 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
            <AnimatePresence>
              {grid === "V" && (
                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                  {products.map((item: any) => (
                    <motion.div
                      key={item?.id}
                      initial={{ translateX: 200 }}
                      animate={{ translateX: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "linear",
                        type: "tween",
                      }}
                    >
                      <Card6 item={item} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          {grid === "H" && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
              {products.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card60 item={item} />
                </motion.div>
              ))}
            </div>
          )}
          <AnimatePresence>
            {grid === "V" && (
              <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                {products.map((item: any) => (
                  <motion.div
                    key={item?.id}
                    initial={{ translateX: 200 }}
                    animate={{ translateX: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "linear",
                      type: "tween",
                    }}
                  >
                    <Card6 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

const Location = ({ category }: any) => {
  return (
    <div className="w-full bg-white text-[#252525]">
      <div className="flex flex-col justify-center sm:container px-5 py-2">
        <div className="flex items-center gap-1 text-sm font-bold">
          <Link href="/">
            <AiOutlineHome className="" />
          </Link>
          <p>/ {"Shop"}</p>
        </div>
      </div>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid, grid }: any) => {
  const { design } = useTheme();

  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap justify-between items-center px-2">
      <div className="text-gray-500 font-medium">
        Showing {paginate?.from}-{paginate?.to} of {paginate?.total} results
      </div>
      <div className="flex items-center gap-1 mb-3 md:mb-0">
        <div
          onClick={() => setGrid("H")}
          className={` rounded-full p-2 lg:cursor-pointer ${
            grid === "H" ? "grid-active" : "border"
          }`}
        >
          <IoGridSharp className="h-4 w-4 " />
        </div>
        <div
          onClick={() => setGrid("V")}
          className={`rounded-full p-2 lg:cursor-pointer ${
            grid === "V" ? "grid-active" : "border"
          }`}
        >
          <TableCellsIcon className="h-4 w-4" />
        </div>
      </div>
      {/* Short by  */}
      <div className="flex items-center gap-2 text-sm max-w-md w-full font-medium">
        <label className="max-w-fit"> Sort by:</label>
        <select
          onChange={onChange}
          className={`${
            design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
          } h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 font-medium text-sm flex-1`}
        >
          <option>Select One</option>
          <option value="az">Name, A to Z</option>
          <option value="za">Name, Z to A</option>
          <option value="lh">Price, Low to High</option>
          <option value="hl">Price, High to Low</option>
        </select>
      </div>
    </div>
  );
};

const SingleCat = ({ item, select, setSelect }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <div className="w-full mb-2">
        <div className="flex items-center px-4 py-3">
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item.id}
            className={`flex-1 text-lg font-medium ${
              select === item.id ? "text-red-500" : "text-gray-900"
            }`}
          >
            <li>
              <span className="text-gray-600">{item.name}</span>
            </li>
          </Link>
          {item?.cat ? (
            <div className="px-4 h-full">
              {show ? (
                <MinusIcon
                  onClick={() => setShow(!show)}
                  className="h-4 w-4 lg:cursor-pointer text-gray-800"
                />
              ) : (
                <PlusIcon
                  onClick={() => setShow(!show)}
                  className="h-4 w-4 lg:cursor-pointer text-gray-800"
                />
              )}
            </div>
          ) : null}
        </div>
        <div>
          <div
            className={`${
              show
                ? "max-h-[1000px] duration-[3000ms]"
                : "max-h-0 duration-1000"
            } overflow-hidden`}
          >
            {item?.cat?.map((sub: any, idx: any) => (
              <div className="" key={idx}>
                <Link
                  onClick={() => setSelect(sub.id)}
                  href={"/category/" + sub?.id}
                >
                  <li
                    className={`py-2 px-8  text-sm ${
                      select === sub.id ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <span className="text-gray-600">{sub?.name}</span>
                  </li>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
