"use client";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import Pagination from "./pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import { motion } from "framer-motion";
import Card51 from "@/components/card/card51";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const CategoryTwentySeven = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, design } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [sort, setSort] = useState("");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState({});
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [select, setSelect] = useState(parseInt(data?.id));
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

  if (open === true) {
    setTimeout(() => {
      setActive(false);
    }, 800);
  } else {
    setTimeout(() => {
      setActive(true);
    }, 0);
  }

  const styleCss = `
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
  }
 `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <Location category={shops} />

      <div className="">
        <style>{styleCss}</style>
        <div className="flex flex-col min-h-[100vh-200px] h-full">
          <div className="flex justify-between items-center rounded-xl h-max py-4 mb-5">
            <div className="relative w-40 border rounded-full lg:block hidden">
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between py-2 px-4 lg:cursor-pointer"
              >
                <h3 className="font-medium text-[#252525] md:text-xl">
                  Categories
                </h3>
                <IoIosArrowDown
                  className={`${open && "rotate-180"} duration-500 `}
                />
              </div>
              <div
                className={`menu-twelve absolute top-14 w-80 bg-white z-[1] ${
                  open ? "max-h-[1000px]" : "max-h-0"
                } ${active ? "overflow-hidden" : ""}`}
              >
                {category?.map((item: any, key: number) => (
                  <SingleCat
                    key={item?.id}
                    item={item}
                    setOpen={setOpen}
                    select={select}
                    setSelect={setSelect}
                  />
                ))}
              </div>
            </div>
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
          </div>
          <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
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

export default CategoryTwentySeven;

const Product = ({
  products,
  grid,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  dataId,
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
  ]);

  const fetchData = async () => {
    try {
      const pageQuery = page
        ? shop_load === 1
          ? page
          : `?page=${page}`
        : `?page=1`;
      //   const colorFilter = activeColor ? encodeURIComponent(activeColor) : "";
      //   const priceFilter = Number(val) !== 0 ? Number(val) : "";
      const apiUrl = `getcatproducts${pageQuery}&filter=${sort}`;

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
        // setColors(colors);

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
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
              {products.map((item: any, key: number) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card51 item={item} />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
            {products.map((item: any, key: number) => (
              <motion.div
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, ease: "linear" }}
              >
                <Card51 item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Location = ({ category }: any) => {
  return (
    <div className="lg:w-1/2 flex flex-col gap-y-5 py-5 mb-5">
      <h1 className="text-3xl font-bold ">{category?.name} collection</h1>
      <div className="">
        <p className="text-sm text-gray-500">
          We not only help you design exceptional products, but also make it
          easy for you to share your designs with more like-minded people.
        </p>
      </div>
    </div>
  );
};

const Filter = ({ onChange }: any) => {
  return (
    <div className="py-3 flex flex-wrap justify-between items-center px-2">
      {/* Short by  */}
      <div className="flex items-center gap-2 text-sm w-full font-medium">
        <select
          onChange={onChange}
          className="h-9 border border-gray-200 rounded-full outline-0 ring-0 focus:ring-0 font-medium text-sm flex-1 bg-white"
        >
          <option>Sort Order</option>
          <option value="az">Name, A to Z</option>
          <option value="za">Name, Z to A</option>
          <option value="lh">Price, Low to High</option>
          <option value="hl">Price, High to Low</option>
        </select>
      </div>
    </div>
  );
};

const SingleCat = ({ item, setOpen, setSelect, select }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <div className="w-full border rounded-xl mb-2">
        <div className="flex items-center px-4 py-3">
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item.id}
            className={`flex-1 text-lg font-medium ${
              select === item.id ? "text-red-500" : "text-gray-800"
            }`}
          >
            {" "}
            <p onClick={() => setOpen(false)}>{item.name}</p>
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
        {show && (
          <>
            <div className="">
              {item?.cat?.map((sub: any, key: number) => (
                <div className="border-t" key={key}>
                  <Link
                    onClick={() => setSelect(sub.id)}
                    href={"/category/" + sub?.id}
                  >
                    {" "}
                    <p
                      onClick={() => setOpen(false)}
                      className={`py-2 px-4 text-sm ${
                        select === sub.id ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {sub?.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
