"use client";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import { HiOutlineAdjustments } from "react-icons/hi";
import Pagination from "./pagination";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import httpReq from "@/utils/http/axios/http.service";
import Skeleton from "@/components/loader/skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Card12 from "@/components/card/card12";

const CategorySeven = ({ data }: any) => {
  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [open, setOpen] = useState(false);
  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
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
    <div className="grid grid-cols-5 lg:gap-8 sm:container px-5 bg-white">
      <div className="lg:col-span-1 lg:block hidden">
        <div className="flex gap-3 py-10">
          <Link href="/">
            <span className="text-base text-gray-500">Home</span>
          </Link>
          <span className="text-base font-medium text-gray-500">/</span>
          <span className="text-base text-gray-600 font-bold">Search</span>
        </div>

        <div className="mt-10 ">
          <h1 className="mb-10 text-2xl text-gray-700 font-medium">Category</h1>
          {category.map((item: any) => (
            <div key={item.id} className="">
              <SingleCat key={item?.id} item={item} />
            </div>
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

      <div className="col-span-5 lg:col-span-4 w-full">
        <div className="flex justify-between py-10">
          <div>
            <h1 className="text-3xl lg:block hidden font-semibold">Products</h1>
            <div
              onClick={() => setOpen(!open)}
              className="lg:cursor-pointer border-2 border-gray-100 rounded-lg justify-between px-3 w-32 py-2 lg:hidden items-center flex gap-3"
            >
              <HiOutlineAdjustments className="rotate-90 text-xl" />
              <button className="text-xl">`Filter`</button>
            </div>
          </div>
          <div>
            <Filter
              onChange={(e: any) => {
                setSort(e.target.value);
                setPage(1);
                setHasMore(true);
              }}
              paginate={paginate}
              setOpen={setOpen}
              open={open}
            />
          </div>
        </div>

        <div>
          <Product
            dataId={dataId}
            page={pageShop}
            sort={sort}
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
        </div>
        {shop_load === 1 && (
          <div className="my-5">
            <Pagination data={data} paginate={paginate} />
          </div>
        )}
      </div>

      {/* tablet and mobile view  */}

      <div className="block py-6 lg:hidden">
        <ul
          className={`lg:hidden bg-white fixed md:w-128 w-96 top-0 overflow-y-auto bottom-0 -ml-32 pb-5 duration-1000 z-10 lg:cursor-pointer ${
            open ? "left-0" : "left-[-120%]"
          }`}
        >
          <div className="flex py-4  items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ml-20">
            <ArrowLeftIcon
              onClick={() => setOpen(!open)}
              className="h-5 basis-2/4"
            />
            <h3 className=" basis-2/4 text-2xl font-medium text-gray-700">
              Filters
            </h3>
          </div>
          <hr className="mr-10 ml-44" />
          <div className="mt-10 ml-36">
            <h1 className="mb-10 text-2xl text-gray-700 font-medium">
              Category
            </h1>

            {category.map((item: any) => (
              <div key={item.id} className="">
                <SingleCat item={item} />
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CategorySeven;

const Product = ({
  products,
  grid,
  open,
  sort,
  page,
  setProducts,
  setPaginate,
  dataId,
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
    sort,
    subcategory,
    setColors,
    activeColor,
    val,
  ]);

  const fetchData = async () => {
    // get the data from the api
    const { colors, data, error } = await httpReq.post(
      `getcatproducts${
        page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
      }&filter=${sort}&priceFilter=${
        Number(val) !== 0 ? Number(val) : ""
      }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
      { id: dataId }
    );

    if (error) {
      const res = await httpReq.post(
        `getsubcatproduct${
          page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
        }&filter=${sort}&priceFilter=${
          Number(val) !== 0 ? Number(val) : ""
        }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
        { id: dataId }
      );

      const { colors, data, error } = await httpReq.post(
        `getsubcatproduct${
          page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
        }&filter=${sort}&priceFilter=${
          Number(val) !== 0 ? Number(val) : ""
        }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
        { id: dataId }
      );

      if (error) {
        setHasMore(false);
        setLoad(false);

        if (
          !shop_load &&
          page !== 1 &&
          data?.data &&
          Array.isArray(data.data)
        ) {
          setProducts([...products, ...data.data]);
        } else {
          setProducts([]);
          setPaginate(null);
        }
        setColors(colors);
        return setError(error);
      } else if (data?.data?.length > 0) {
        setHasMore(true);
        setColors(colors);
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
      }
    } else if (data?.data?.length > 0) {
      setHasMore(true);
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
      setColors(colors);
      setPaginate(data);
      setLoad(false);
      setError(null);
    } else {
      setHasMore(false);
    }
    setLoad(false);
  };

  return (
    <div>
      {load ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div>
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
                <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
                  {products?.map((product: any) => (
                    <Card12 key={product.id} item={product} />
                  ))}
                  {error && (
                    <div className="text-center text-4xl font-bold text-gray-400 flex justify-center items-center col-span-4 mt-10">
                      {error}
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
              {products?.map((product: any) => (
                <Card12 key={product.id} item={product} />
              ))}
              {error && (
                <div className="text-center text-4xl font-bold text-gray-400 flex justify-center items-center col-span-4 mt-10">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Filter = ({ onChange }: any) => {
  return (
    <div>
      <div className="md:flex md:flex-row justify-between items-center gap-1">
        <div className="md:block hidden">
          <p>Sort By:</p>
        </div>
        <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
          {/* Short by  */}
          <div className="">
            <select
              onChange={onChange}
              className="w-48 font-medium lg:cursor-pointer h-12 px-2 p-0 text-md border-gray-200 rounded-md  focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
              id="category"
              name="category"
            >
              <option className="lg:cursor-pointer">Sorting Options</option>
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

          {/* <p onClick={() => setOpen(!open)} className={`px-10 py-1 md:hidden flex  text-sm font-semibold bg-black text-white ${open === true ? "filter border-transparent " : "bg-black border-black"} lg:cursor-pointer`}>FILTER</p> */}
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);

  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;

  return (
    <>
      <div className="w-full flex py-3 lg:cursor-pointer category-page">
        <style>{styleCss}</style>
        <Link
          onClick={() => setShow(!show)}
          href={"/category/" + item.id}
          className={`flex-1 text-sm font-medium `}
        >
          {" "}
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div onClick={() => setShow(!show)} className="px-4 h-full">
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
            {item?.cat?.map((sub: any) => (
              <div key={sub.id} className="py-2 category-page">
                <Link href={"/category/" + sub?.id}>
                  {" "}
                  <p className={`pb-2 text-sm `}>{sub?.name}</p>
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
