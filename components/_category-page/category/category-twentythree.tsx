"use client";
import Card47 from "@/components/card/card47";
import Card6 from "@/components/card/card6";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { MinusIcon, PlusIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoGridSharp } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Skeleton from "@/components/loader/skeleton";
import Pagination from "./pagination";

const CategoryTwentyThree = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, design } = useTheme();

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

  const styleCss = `
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
  }
 `;

  return (
    <div>
      <Location category={shops} />

      <div className="sm:container px-5">
        <style>{styleCss}</style>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3 h-max">
            <div className="w-full hidden lg:block shadow-2xl p-4 rounded-xl bg-white">
              <h3 className="font-medium text-[#252525] text-xl mb-4 ">
                Categories
              </h3>
              {category?.map((item: any) => (
                <SingleCat
                  key={item?.id}
                  item={item}
                  select={select}
                  setSelect={setSelect}
                />
              ))}
            </div>

            <div className="lg:my-5 lg:shadow-2xl p-4 lg:rounded-xl lg:bg-white">
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

            <div className="lg:my-5 lg:shadow-2xl p-4 lg:rounded-xl lg:bg-white">
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
                setProducts={setProducts}
                setPaginate={setPaginate}
                val={val}
                setColors={setColors}
                activeColor={activeColor}
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

export default CategoryTwentyThree;

const Product = ({
  products,
  grid,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  dataId,
  val,
  setColors,
  activeColor,
  setPage,
  shop_load,
  setHasMore,
  hasMore,
  id,
}: any) => {
  const [load, setLoad] = useState(false);
  const [showSk, setShowSk] = useState(true);
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

      if (data?.data?.length == 0) {
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
    setShowSk(false);
  };

  if (load && showSk) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-[50vh] flex justify-center items-center">
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
              <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
                No More Products
              </p>
            }
          >
            {grid === "H" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0">
                {products?.map((item: any, key: number) => (
                  <motion.div
                    key={key}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card47 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
            <AnimatePresence>
              {grid === "V" && (
                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                  {products?.map((item: any, key: number) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-0">
              {products?.map((item: any, key: number) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card47 item={item} />
                </motion.div>
              ))}
            </div>
          )}
          <AnimatePresence>
            {grid === "V" && (
              <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                {products?.map((item: any, key: number) => (
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

const Location = ({}: any) => {
  const [activecat, setActivecat] = useState(false);
  const { id: data }: any = useParams<{ id: string }>();
  const { category } = useTheme();
  useEffect(() => {
    for (let i = 0; i < category.length; i++) {
      if (category[i]?.cat) {
        for (let j = 0; j < category[i].cat.length; j++) {
          if (category[i]?.cat[j]?.id == data) {
            setActivecat(category[i]?.cat[j]?.name);
          }
        }
      }
      if (category[i]?.id == data) {
        setActivecat(category[i].name);
      }
    }
  }, [category]);
  return (
    <div className="w-full bg-[#f1f1f1] flex flex-col justify-center items-center py-5 mb-5">
      <h1 className="text-3xl font-medium ">Product</h1>
      <div className="flex items-center gap-1">
        <p>Home</p>
        <p>/ {activecat}</p>
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
          <Bars3Icon className="h-4 w-4" />
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
  const [show, setShow] = useState(false);
  const { id }: any = useParams<{ id: string }>();
  useEffect(() => {
    if (item.cat) {
      for (let i = 0; i < item.cat.length; i++) {
        item.cat[i].id == id && setShow(true);
      }
    }
  }, [item?.cat]);
  const { design } = useTheme();
  const activeColor = `text-[${design?.header_color}] flex-1 text-lg font-medium`;
  const inactiveColor = "text-gray-500 flex-1 text-lg font-medium";
  const activesub = `text-[${design?.header_color}] py-2 px-4 text-sm`;
  const inactivesub = `text-gray-600 py-2 px-4 text-sm`;
  return (
    <div className="">
      <div className="w-full border mb-2">
        <div className="flex items-center px-4 py-3">
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item.id}
            className={id == item?.id ? activeColor : inactiveColor}
          >
            {" "}
            <p
              style={
                parseInt(id) === parseInt(item?.id)
                  ? { color: `${design.header_color}` }
                  : {}
              }
            >
              {item.name}
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
                      style={
                        parseInt(id) === parseInt(sub?.id)
                          ? { color: `${design.header_color}` }
                          : {}
                      }
                      className={id == sub?.id ? activesub : inactivesub}
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
