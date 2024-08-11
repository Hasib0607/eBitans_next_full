"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/use-theme";
import FilterByColor from "../../filter-by-color";
import FilterByPrice from "../../filter-by-price";
import Pagination from "./pagination";
import httpReq from "@/utils/http/axios/http.service";
import Skeleton from "react-loading-skeleton";
import Card31 from "@/components/card/card31";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import "./category-seventeen.css";

const CategorySeventeen = () => {
  const { id: data }: any = useParams<{ id: string }>();

  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [sort, setSort] = useState("");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState<any>({});
  const [cat, setCat] = useState<any>({});
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
    <>
      <div className="categorySeventeenBackgroundColor">
        <div className="pt-16 w-full flex flex-col gap-3 justify-center items-center">
          <div>
            <h1 className="text-5xl font-medium text-white">Products</h1>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-white">Home</p>
            <IoIosArrowForward className="text-xs mt-1 text-white" />
            <p className="font-medium text-white">{shops?.name || cat?.name}</p>
          </div>
        </div>
      </div>
      <div className="container px-5 xl:px-80 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="hidden md:block col-span-3">
            <div className="w-full">
              <h3 className="font-semibold text-[#252525] text-lg mx-4 border-b-2 border-[#206469] pb-2 mb-3">
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
            <div className="my-6 p-4">
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
            <div className="p-4">
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
            {/* <Location category={shops} cat={cat} /> */}
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
                setCat={setCat}
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
      <div className="categorySeventeenBottomBackGroundImage absolute top-44"></div>
    </>
  );
};

export default CategorySeventeen;

const Product = ({
  products,
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

  return (
    <>
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
                <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-3 grid-cols-2 gap-2">
                  {products?.map((product: any) => (
                    <Card31 key={product.id} item={product} />
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
            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-3 grid-cols-2 gap-2">
              {products?.map((product: any) => (
                <Card31 key={product.id} item={product} />
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
    </>
  );
};

const Filter = ({ paginate, onChange, setGrid }: any) => {
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap gap-y-2 justify-between items-center">
      <div className="text-gray-500 font-thin">
        There are {paginate?.total} products{" "}
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
          <option value="lh">Low - High</option>
          <option value="hl">High - Low</option>
        </select>
      </div>
    </div>
  );
};

const SingleCat = ({ item, select, setSelect }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="w-full flex px-4 py-1">
        <Link
          onClick={() => setSelect(item.id)}
          href={"/category/" + item.id}
          className={`flex-1 ${
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
            {item?.cat?.map((sub: any, key: any) => (
              <div className="" key={key}>
                <Link
                  onClick={() => setSelect(sub.id)}
                  href={"/category/" + sub?.id}
                >
                  {" "}
                  <li
                    className={`text-sm ${
                      select === sub.id ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {sub?.name}
                  </li>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
