"use client";
import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "@/components/_category-page/category/pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import Link from "next/link";
import Card66 from "@/components/card/card66";

const ThirtyEight = ({ data }: any) => {
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
    <div className="bg-[#F2F4F8]">
      <style>{styleCss}</style>
      <div className="bg-white">
        <Location category={shops} />
      </div>
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="hidden lg:flex col-span-3 ">
            <div className="w-full sticky top-40 h-max bg-white py-3">
              <div className="pb-5">
                <div className="flex justify-between items-center border-b-2 pb-2">
                  <h3 className="text-[#252525] text-lg px-4">Categories</h3>
                </div>
                <div className="px-4">
                  {category?.map((item: any) => (
                    <SingleCat key={item?.id} item={item} />
                  ))}
                </div>
              </div>
              <div className="my-6 pb-5 px-4">
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
              <div className="mb-5 pb-5 px-4">
                <FilterByPrice
                  id={data?.id}
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
              setGrid={setGrid}
              setOpen={setOpen}
              open={open}
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

export default ThirtyEight;

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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3">
              {products.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card66 item={item} />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3">
          {products.map((item: any) => (
            <motion.div
              key={item?.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <Card66 item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

const Location = ({ category }: any) => {
  return (
    <div className="w-full text-[#414141] sm:container flex gap-1 items-center justify-start py-3 text-sm px-5">
      <Link href="/">
        <TiHome className="text-lg" />
      </Link>
      <p> / {"Shop"}</p>
    </div>
  );
};

const Filter = ({ paginate, onChange }: any) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center mb-8">
      <div className="bg-white px-4 py-2">
        There are{" "}
        <span className="font-bold">({paginate ? paginate?.total : 0})</span>{" "}
        products{" "}
      </div>
      {/* Short by  */}
      <div className="">
        <select
          onChange={onChange}
          className="h-9 border border-black min-w-[300px] rounded-full duration-500 lg:cursor-pointer focus:border-black focus:outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
        >
          <option>Sort By</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="lh">Low - High</option>
          <option value="hl">High - Low</option>
        </select>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;
  return (
    <>
      <div className="w-full flex py-2 category-page">
        <style>{styleCss}</style>
        <Link
          href={"/category/" + item?.id}
          className={`flex-1 text-sm text-hover text-gray-900`}
        >
          <p>{item.name}</p>
        </Link>
      </div>
    </>
  );
};
