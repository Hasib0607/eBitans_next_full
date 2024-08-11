"use client";
import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "./pagination";
import OvalLoader from "@/components/loader/oval-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Card18 from "@/components/card/card18";
import Card6 from "@/components/card/card6";
import {
  MinusIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import httpReq from "@/utils/http/axios/http.service";

const Thirteen = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [sort, setSort] = useState("");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState({});
  const [select, setSelect] = useState(parseInt(data?.id));
  const [val, setVal] = useState(0);
  const [colors, setColors] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dataId, setDataId] = useState(null);

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setDataId(data);
  }, [data]);

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className=" hidden lg:block col-span-3">
          <div className="w-full">
            <h3 className="font-thin text-[#252525] text-lg px-4">
              Categories
            </h3>
            {category?.map((item: any) => (
              <SingleCat
                key={item?.id}
                item={item}
                select={select}
                setSelect={setSelect}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            ))}
          </div>
          <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
            <FilterByColor
              id={data?.id}
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
              id={data?.id}
              setVal={setVal}
              val={val}
              setPage={setPage}
              setHasMore={setHasMore}
            />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
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
              id={data}
              dataId={dataId}
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
              <Pagination data={data} paginate={paginate} />
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
  dataId,
  setColors,
  activeColor,
  val,
  setPage,
  shop_load,
  setHasMore,
  hasMore,
  id,
}: any) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const { category, subcategory } = useTheme();

  useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shop_load === 1 && page,
    category,
    dataId,
    setPaginate,
    setProducts,
    setShops,
    sort,
    subcategory,
    setColors,
    activeColor,
    val,
  ]);

  const fetchData = async () => {
    try {
      const pageQuery = page
        ? shop_load === 1
          ? page
          : `?page=${page}`
        : `?page=1`;
      const colorFilter = activeColor ? encodeURIComponent(activeColor) : "";
      const priceFilter = Number(val) !== 0 ? Number(val) : "";
      const apiUrl = `getcatproducts${pageQuery}&filter=${sort}&priceFilter=${priceFilter}&colorFilter=${colorFilter}`;

      // Get the data from the API
      let response = await httpReq.post(apiUrl, { id });
      let { colors, data, error } = response;

      if (error) {
        // If error, try fetching subcategory products
        response = await httpReq.post(
          apiUrl.replace("getcatproducts", "getsubcatproduct"),
          { id }
        );
        ({ colors, data, error } = response);
      }

      if (data?.data?.length > 0) {
        setHasMore(true);
        setColors(colors);

        if (!shop_load) {
          if (data.current_page === 1) {
            setProducts(data.data);
          } else {
            setProducts((prevProducts: any) => [...prevProducts, ...data.data]);
          }
          setPage(page + 1);
        } else {
          setProducts(data.data);
        }

        setPaginate(data);
        setLoad(false);
        setError(null);
      } else {
        setHasMore(false);
        setLoad(false);
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setHasMore(false);
      setLoad(false);
      setError(error);
    }
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
                {products.map((item: any, key: number) => (
                  <motion.div
                    key={key}
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
                  {products.map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-2 sm:px-0">
              {products.map((item: any, key: number) => (
                <motion.div
                  key={key}
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
                {products.map((item: any, key: number) => (
                  <motion.div
                    key={key}
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

const Location = ({ categoy }: any) => {
  return (
    <div className="w-full text-[#414141] bg-[#f1f1f1] flex items-center justify-start py-2 text-[24px] font-thin px-2">
      <p>Home</p>
      <p>/ {categoy?.name}</p>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid }: any) => {
  console.log(paginate, "paginate");
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap justify-between items-center px-2">
      <div className="text-gray-500 font-thin">
        There are {paginate?.total} products{" "}
      </div>
      <div className="flex items-center gap-1">
        <div onClick={() => setGrid("H")} className="border rounded-full p-2">
          <TableCellsIcon className="h-4 w-4 text-[#928a8a]" />
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

const SingleCat = ({ item, setSelect, select, setPage, setHasMore }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex px-4 py-3">
        <Link
          onClick={() => {
            setSelect(item.id);
            setPage(1);
            setHasMore(true);
          }}
          href={"/category/" + item.id}
          className={`flex-1 text-sm font-thin ${
            select === item.id ? "text-red-500" : "text-gray-800"
          }`}
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
        <div className="h-[1px] bg-gray-200 w-full"></div>
      </div>
      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any, key: number) => (
              <div key={key} className="py-2">
                <Link
                  onClick={() => {
                    setSelect(sub.id);
                    setPage(1);
                    setHasMore(true);
                  }}
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
