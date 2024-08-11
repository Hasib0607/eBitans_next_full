"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "@/components/_category-page/category/pagination";
import OvalLoader from "@/components/loader/oval-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Card56 from "@/components/card/card56";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import httpReq from "@/utils/http/axios/http.service";

const TwentySix = ({ data }: any) => {
  const { category, design, module } = useTheme();

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
    .shop-cat{
        border: 2px solid ${design?.header_color};
    }
    .shop-cat-dot{
        background: ${design?.header_color};
    }
 `;
  return (
    <div>
      <Location category={shops} />

      <div className="sm:container px-5">
        <style>{styleCss}</style>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className=" hidden lg:block col-span-3">
            <div className="w-full h-max relative">
              <h3 className="font-bold text-[#252525] text-2xl mb-4 pb-[10px] w-max">
                Product categories
              </h3>
              <div className="shop-cat rounded-md">
                {category?.map((item: any) => (
                  <SingleCat
                    item={item}
                    key={item?.id}
                    setSelect={setSelect}
                    select={select}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white my-6 p-4 shop-cat rounded-md">
              <FilterByColor
                setActiveColor={setActiveColor}
                colors={colors}
                activeColor={activeColor}
                shop_load={shop_load}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
            <div className="bg-white p-4 shop-cat rounded-md mb-5">
              <FilterByPrice
                setVal={setVal}
                val={val}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
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

export default TwentySix;

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
              {products.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  // exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card56 item={item} />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
          {products.map((item: any) => (
            <motion.div
              key={item?.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <Card56 item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

const Location = ({ category }: any) => {
  return (
    <div className="bg-gray-300">
      <div className="w-full bg-opacity-50 flex flex-col justify-center sm:container px-5 py-10 mb-5">
        <div className="flex items-center gap-1 text-xl">
          <p>Home</p>
          <p>/ {"Shop"}</p>
        </div>
      </div>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid, grid }: any) => {
  return (
    <div className="border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap sm:justify-between justify-end items-center px-2">
      <div className="text-gray-500 font-medium sm:block hidden">
        Showing {paginate?.from}-{paginate?.to} of {paginate?.total} results
      </div>

      {/* Short by  */}
      <div className="flex items-center gap-2 text-sm max-w-[200px] w-full font-medium">
        <select
          onChange={onChange}
          className="h-12 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 font-medium flex-1 bg-white"
        >
          <option>Default sorting</option>
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
  // console.log(item,"item");
  return (
    <div className="border-b py-2">
      <div className="w-full">
        <div className="flex items-center gap-2 py-1 pl-4">
          <p className="w-1.5 h-1.5 rounded-full shop-cat-dot"></p>
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item.id}
            className={`text-lg font-medium ${
              select === item.id ? "text-red-500" : "text-gray-900"
            }`}
          >
            <p>
              <span className="text-lg">{item.name}</span>
            </p>
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
          <div className={`overflow-hidden`}>
            {item?.cat?.map((sub: any, idx: any) => (
              <div className="" key={idx}>
                <Link
                  onClick={() => setSelect(sub.id)}
                  href={"/category/" + sub?.id}
                >
                  <p
                    className={`pl-8 ${
                      select === sub.id ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {sub?.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
