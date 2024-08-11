"use client";

import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "@/components/_category-page/category/pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Card18 from "@/components/card/card18";
import { AnimatePresence, motion } from "framer-motion";
import Card6 from "@/components/card/card6";
import useTheme from "@/hooks/use-theme";
import {
  MinusIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { CgViewGrid } from "react-icons/cg";
import Link from "next/link";

const Thirteen = ({ data }: any) => {
  const { category, module } = useTheme();

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

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className=" hidden md:block col-span-3">
          <div className="w-full">
            <h3 className="font-thin text-[#252525] text-lg px-4">
              Categories
            </h3>
            {category?.map((item: any) => (
              <SingleCat
                key={item?.id}
                item={item}
                setSelect={setSelect}
                select={select}
              />
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
        <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
          <Location categoy={shops} />
          <Filter
            onChange={(e: any) => {
              setSort(e.target.value);
              setPage(1);
              setHasMore(true);
            }}
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
  );
};

export default Thirteen;

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
              <p className="text-center mt-5 text-xl font-bold pb-3">
                No More Products
              </p>
            }
          >
            {grid === "H" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
                {products.map((item: any) => (
                  <motion.div
                    key={item?.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card18 item={item} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
              {products.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card18 item={item} />
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
    <div className="w-full text-[#414141] bg-[#f1f1f1] flex items-center justify-start py-2 text-[24px] font-thin px-2">
      <p>Home </p>
      <p>/ {"shop"}</p>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid }: any) => {
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap justify-between items-center px-2">
      <div className="text-gray-500 font-thin">
        There are {paginate?.total} products{" "}
      </div>
      <div className="flex items-center gap-1">
        <div onClick={() => setGrid("H")} className="border rounded-full p-2">
          <CgViewGrid className="h-4 w-4 text-[#928a8a]" />
        </div>
        <div onClick={() => setGrid("V")} className="border rounded-full p-2">
          <TableCellsIcon className="h-4 w-4 text-[#928a8a]" />
        </div>
      </div>
      {/* Short by  */}
      <div className="flex items-center gap-2 text-sm max-w-md w-full">
        <label className="max-w-fit"> Sort by:</label>
        <select
          onChange={onChange}
          className="h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
        >
          <option>Select One</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="lh">L - H</option>
          <option value="hl">H - L</option>
        </select>
      </div>
    </div>
  );
};

const SingleCat = ({ item, select, setSelect }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex px-4 py-3">
        <Link
          onClick={() => setSelect(item.id)}
          href={"/category/" + item.id}
          className={`flex-1 text-sm font-thin ${
            select === item.id ? "text-red-500" : "text-gray-900"
          }`}
        >
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
        <div className="h-[1px] bg-gray-200 w-full"></div>
      </div>
      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any, idx: any) => (
              <div className="py-2" key={idx}>
                <Link
                  onClick={() => setSelect(sub.id)}
                  href={"/category/" + sub?.id}
                >
                  <p
                    className={`pb-2 text-sm font-thin ${
                      select === sub.id ? "text-red-500" : "text-gray-500"
                    }`}
                  >
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
