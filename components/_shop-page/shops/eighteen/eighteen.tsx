"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiFilter } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "@/components/_category-page/category/pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import Card38 from "@/components/card/card38";
import Card6 from "@/components/card/card6";
import {
  MinusIcon,
  PlusIcon,
  TableCellsIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Eighteen = ({ data }: any) => {
  const { category, design, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState<any>("H");
  const [sort, setSort] = useState<any>("");
  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [shops, setShops] = useState<any>({});
  const [open, setOpen] = useState<any>(false);
  const [val, setVal] = useState<any>(0);
  const [colors, setColors] = useState<any>(null);
  const [activeColor, setActiveColor] = useState<any>(null);
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<any>(true);

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  const styleCss = `

  .text-hover:hover {
    color:  ${design?.header_color};
  }
 .bg-hover:hover {
    background: ${design?.header_color};
    color:  ${design?.text_color};
  }
    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div className="border-b-2 py-3 mb-2 border-black">
        <Location categoy={shops} />
      </div>
      <div className="sm:container px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className=" hidden lg:block col-span-3">
            <div className="w-full sticky top-40 h-max">
              <h3 className="font-thin text-[#252525] text-lg px-4">
                Categories
              </h3>
              {category?.map((item: any) => (
                <SingleCat key={item?.id} item={item} />
              ))}

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
          <div className="col-span-1 lg:col-span-9 flex flex-col h-full">
            <Filter
              onChange={(e: any) => {
                setSort(e.target.value);
                setPage(1);
                setHasMore(true);
              }}
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

      {/* tablet and mobile view  */}

      <div className={`px-4`}>
        <ul
          className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-20 lg:cursor-pointer ${
            open ? "left-0 " : "left-[-140%] "
          }`}
        >
          <div className="pb-7 pt-3 px-6">
            <div
              onClick={() => setOpen(!open)}
              className="flex gap-1 items-center border-b-[2px] pb-2 text-color"
            >
              <VscClose className="text-lg inline-block" />
              <p className="text-sm">Close</p>
            </div>
            <div className="w-full">
              <h3 className="font-thin text-[#252525] text-lg px-4">
                Categories
              </h3>
              {category?.map((item: any) => (
                <SingleCat item={item} key={item?.id} />
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Eighteen;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      }&name=${"siam.localhost:3000"}&filter=${sort}&priceFilter=${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
                {products.map((item: any) => (
                  <motion.div
                    key={item?.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card38 item={item} />
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
                        type: "tween"
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
                  <Card38 item={item} />
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
                      type: "tween"
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
    <div className="w-full sm:container text-[#414141] flex gap-1 items-center justify-start py-2 text-sm font-thin px-5">
      <p>Home </p>
      <p> / {"Shop"}</p>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid, open, setOpen }: any) => {
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap justify-between items-center">
      <div className="text-gray-500 font-thin md:block hidden">
        There are {paginate ? paginate?.total : 0} products{" "}
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-3 items-center md:hidden lg:cursor-pointer"
      >
        <BiFilter />
        <p>Filter</p>
      </div>

      {/* Short by  */}
      <div className="flex items-center gap-6 text-sm max-w-sm">
        <select
          onChange={onChange}
          className="h-9 border-0 rounded lg:cursor-pointer outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
        >
          <option>Featured</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="lh">L - H</option>
          <option value="hl">H - L</option>
        </select>

        <div className="flex items-center gap-2">
          <div
            onClick={() => setGrid("H")}
            className="border rounded-full p-2 lg:cursor-pointer bg-hover text-[#928a8a]"
          >
            <TableCellsIcon className="h-4 w-4" />
          </div>
          <div
            onClick={() => setGrid("V")}
            className="border rounded-full p-2 lg:cursor-pointer bg-hover text-[#928a8a]"
          >
            <TableCellsIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="w-full flex px-4 py-3">
        <Link
          href={"/category/" + item.id}
          className={`flex-1 text-sm font-thin text-gray-500 text-hover`}
        >
          {" "}
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div className="px-4 h-full">
            {show ? (
              <MinusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800 lg:cursor-pointer text-hover"
              />
            ) : (
              <PlusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800 lg:cursor-pointer text-hover"
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
                <Link href={"/category/" + sub?.id}>
                  {" "}
                  <p className="pb-2 text-sm font-thin text-gray-500 text-hover">
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
