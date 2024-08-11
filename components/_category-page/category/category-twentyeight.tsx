"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TiTick } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "./pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import { ThreeDots } from "react-loader-spinner";
import Card58 from "@/components/card/card58";
import Card6 from "@/components/card/card6";
import { IoGridSharp } from "react-icons/io5";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const CategoryTwentyEight = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, design } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [sort, setSort] = useState("");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState({});
  const [cat, setCat] = useState({});
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
    <div>
      <Location category={shops} cat={cat} />

      <div className="sm:container px-5">
        <style>{styleCss}</style>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="hidden lg:block col-span-3  h-max">
            <div className="w-full relative p-4 border">
              <h3 className="font-medium text-[#252525] text-xl  mb-4 sec-twenty-nine pb-[10px] w-max">
                প্রোডাক্ট ক্যাটেগরীজ
              </h3>
              <div className="absolute h-[1px] bg-gray-300 top-[55px] left-0 right-0 mx-4"></div>
              {category?.map((item: any) => (
                <SingleCat
                  key={item?.id}
                  item={item}
                  select={select}
                  setSelect={setSelect}
                />
              ))}
            </div>
            <div className="border my-6 p-4">
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
            <div className="border p-4">
              <FilterByPrice
                id={data?.id}
                setVal={setVal}
                val={val}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
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
                id={data}
                dataId={dataId}
                page={pageShop}
                sort={sort}
                grid={grid}
                products={products}
                setShops={setShops}
                setCat={setCat}
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
    </div>
  );
};

export default CategoryTwentyEight;

const Product = ({
  id,
  products,
  grid,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  dataId,
  setCat,
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-0">
                {products.map((item: any, key: number) => (
                  <motion.div
                    key={key}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card58 item={item} />
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
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          {grid === "H" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-0">
              {products.map((item: any, key: number) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card58 item={item} />
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

const Location = ({ category, cat }: any) => {
  // console.log(category,"category");
  return (
    <div className="w-full bg-[#f1f1f1] flex flex-col justify-center items-center py-5 mb-5">
      <h1 className="text-3xl font-medium ">প্রোডাক্ট</h1>
      <div className="flex items-center gap-1">
        <p>Home</p>
        <p>/ {category?.name || cat?.name}</p>
      </div>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid, grid }: any) => {
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap justify-between items-center px-2">
      <div className="text-gray-500 font-medium">
        Showing {paginate?.from}-{paginate?.to} of {paginate?.total} results{" "}
      </div>
      <div className="flex items-center gap-1 mb-3 md:mb-0">
        <div
          onClick={() => setGrid("H")}
          className={` rounded-full p-2 ${
            grid === "H" ? "grid-active" : "border"
          }`}
        >
          <IoGridSharp className="h-4 w-4 " />
        </div>
        <div
          onClick={() => setGrid("V")}
          className={`rounded-full p-2 ${
            grid === "V" ? "grid-active" : "border"
          }`}
        >
          <TableCellsIcon className="h-4 w-4" />
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
          <option value="az">Name, A to Z</option>
          <option value="za">Name, Z to A</option>
          <option value="lh">Price, Low to High</option>
          <option value="hl">Price, High to Low</option>
        </select>
      </div>
    </div>
  );
};

const SingleCat = ({ item, setSelect, select }: any) => {
  return (
    <div className="">
      <div className="w-full mb-2">
        <div className="flex items-center px-4 py-2">
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item.id}
            className={`text-gray-600 flex items-center gap-x-2 font-medium ${
              select === item.id ? "text-red-500" : ""
            }`}
          >
            <div
              className={`${
                select === item.id ? "bg-red-500 border-red-500" : ""
              } w-4 h-4 rounded-full border-gray-400 border relative`}
            >
              {select === item.id && (
                <TiTick className="text-white absolute left-0 -top-[1px]" />
              )}
            </div>
            <p>{item.name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
