"use client";
import React, { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "@/components/_category-page/category/pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import Card16 from "@/components/card/card16";
import Card6 from "@/components/card/card6";
import {
  MinusIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Two = ({ data }: any) => {
  const { category, module, design } = useTheme();
  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(parseInt(data?.id));
  const [val, setVal] = useState(0);
  const [colors, setColors] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
    .text-hover:hover {
      color:  ${bgColor};
    }
    .filter {
        color:${textColor};
        background:${bgColor};
    }
    .border-hover:hover {
        border: 1px solid  ${bgColor};
    }
 
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="grid grid-cols-9 gap-5">
        {/* filter side design  */}
        <div className="lg:col-span-2 w-full items-end lg:block hidden">
          <div className="w-full bg-gray-100 border-2 border-gray-200 text-black pl-6 py-6 ">
            <h1 className="font-semibold ">FILTER BY</h1>
            {category?.map((item: any) => (
              <SingleCat
                key={item?.id}
                item={item}
                setSelect={setSelect}
                select={select}
              />
            ))}
          </div>
          <div className="bg-gray-100 border-2 border-gray-200 text-black p-4 rounded shadow">
            <FilterByColor
              setActiveColor={setActiveColor}
              colors={colors}
              activeColor={activeColor}
              shop_load={shop_load}
              setPage={setPage}
              setHasMore={setHasMore}
            />
          </div>
          <div className="bg-gray-100 border-2 border-gray-200 text-black p-4 rounded shadow">
            <FilterByPrice
              setVal={setVal}
              val={val}
              setPage={setPage}
              setHasMore={setHasMore}
            />
          </div>
        </div>

        {/* filter side design finishes  */}

        <div className="relative lg:col-span-7 col-span-9 ">
          {/* Sort by bar start  */}

          <div>
            <Filter
              onChange={(e: any) => {
                setSort(e.target.value);
                setPage(1);
                setHasMore(true);
              }}
              setGrid={setGrid}
              paginate={paginate}
              setOpen={setOpen}
              open={open}
            />
          </div>
          {/* All product card  */}

          <div className="mt-4 mb-6 ">
            <Product
              page={pageShop}
              sort={sort}
              grid={grid}
              open={open}
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

export default Two;

const Product = ({
  products,
  grid,
  sort,
  open,
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
  const { category } = useTheme();
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
      {open && (
        <div className="py-4 px-10 border-[1px] ">
          <div className="text-lg font-medium py-3 flex flex-col gap-2">
            <h1>Categories</h1>
            <p className="h-[1px] w-14 bg-black"></p>
          </div>
          <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
            {category?.map((item: any, idx: any) => (
              <SingleCat key={idx} item={item} />
            ))}
          </div>
        </div>
      )}

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
                  //   wrapperClassName=""
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
              <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-5 grid-cols-2 gap-2 mt-10">
                {products.map((item: any, idx: any) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card16 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
            <AnimatePresence>
              {grid === "V" && (
                <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                  {products.map((item: any, idx: any) => (
                    <motion.div
                      key={idx}
                      className=""
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
            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-5 grid-cols-2 gap-2 mt-10">
              {products.map((item: any, idx: any) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card16 item={item} />
                </motion.div>
              ))}
            </div>
          )}
          <AnimatePresence>
            {grid === "V" && (
              <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                {products.map((item: any, idx: any) => (
                  <motion.div
                    key={item.id}
                    className=""
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

const Filter = ({ onChange, setGrid, setOpen, open }: any) => {
  return (
    <div>
      <div className="md:flex md:flex-row justify-between md:mt-6 items-center ">
        <div className="md:block hidden">
          <p>Sort By:</p>
        </div>
        <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
          {/* Short by  */}
          <div className="">
            <select
              onChange={onChange}
              className="xl:w-96 lg:w-80 md:w-52 w-40 lg:cursor-pointer h-8 px-2 p-0 text-sm border-gray-200 focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none flex items-center"
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

          <p
            onClick={() => setOpen(!open)}
            className={`px-10 py-1 md:hidden flex  text-sm font-semibold bg-black text-white ${
              open === true
                ? "filter border-transparent "
                : "bg-black border-black"
            } lg:cursor-pointer`}
          >
            FILTER
          </p>
        </div>

        <div className="hidden text-gray-300 gap-1 md:flex">
          <CgMenuGridO
            onClick={() => setGrid("H")}
            className="h-6 w-6 text-hover lg:cursor-pointer"
          />
          <TableCellsIcon
            onClick={() => setGrid("V")}
            className="h-6 w-6 text-hover lg:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item, select, setSelect }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex py-3 lg:cursor-pointer">
        <Link
          onClick={() => setSelect(item.id)}
          href={"/category/" + item.id}
          className={`flex-1 text-sm text-gray-900 font-medium ${
            select === item.id ? "text-red-500" : "text-gray-900"
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

      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any, idx: any) => (
              <div className="py-2" key={idx}>
                <Link
                  onClick={() => setSelect(sub.id)}
                  href={"/category/" + sub?.id}
                >
                  {" "}
                  <p
                    className={`pb-2 text-sm ${
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
