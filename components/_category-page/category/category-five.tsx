"use client";
import Card42 from "@/components/card/card42";
import Card6 from "@/components/card/card6";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { MinusIcon, PlusIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "./pagination";

const CategoryFive = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, design } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
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
    <div className="sm:container px-5 sm:py-10 py-5 bg-white">
      <style>{styleCss}</style>
      <div className="grid grid-cols-9 gap-5">
        {/* filter side design  */}
        <div className="md:col-span-2 w-full items-end md:block hidden">
          <div className="w-full bg-gray-100 border-2 border-gray-200 text-black  my-6 pl-6 pt-7 pb-6 ">
            <h1 className="font-semibold ">FILTER BY</h1>
            {category?.map((item: any) => (
              <SingleCat key={item?.id} item={item} />
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

        {/* filter side design finishes  */}
        <div className="relative md:col-span-7 col-span-9 ">
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

          <div className="mt-4 mb-6">
            <Product
              id={data}
              dataId={dataId}
              page={pageShop}
              sort={sort}
              open={open}
              grid={grid}
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
                <Pagination data={data} paginate={paginate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFive;

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
  id,
}: any) => {
  const [showSk, setShowSk] = useState(true);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const { category } = useTheme();

  useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shop_load === 1 && page,
    dataId,
    setPaginate,
    setProducts,
    sort,
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
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
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
            {category?.map((item: any) => (
              <SingleCat key={item?.id} item={item} />
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
              <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-5 sm:grid-cols-2 grid-cols-2 gap-2 mt-10">
                {products?.map((item: any, key: any) => (
                  <motion.div
                    key={key}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card42 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
            <AnimatePresence>
              {grid === "V" && (
                <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                  {products?.map((item: any, key: number) => (
                    <motion.div
                      key={key}
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
            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-5 sm:grid-cols-2 grid-cols-2 gap-2 mt-10">
              {products?.map((item: any, key: number) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card42 item={item} />
                </motion.div>
              ))}
            </div>
          )}
          <AnimatePresence>
            {grid === "V" && (
              <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                {products?.map((item: any, key: number) => (
                  <motion.div
                    key={key}
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
              className="xl:w-96 lg:w-80 md:w-52 w-32 lg:cursor-pointer h-8 px-2 p-0 text-sm border-gray-200 focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none flex items-center"
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
          <Bars3Icon
            onClick={() => setGrid("V")}
            className="h-6 w-6 text-hover lg:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
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
  const activeColor = `text-[${design?.header_color}] flex-1 text-sm  font-medium`;
  const inactiveColor = "flex-1 text-sm  font-medium text-gray-900";
  const activesub = `text-[${design?.header_color}] pb-2 text-sm`;
  const inactivesub = "pb-2 text-sm text-gray-500";

  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;

  return (
    <>
      <style>{styleCss}</style>
      <div className="w-full flex py-3 lg:cursor-pointer category-page">
        <Link
          style={id == item?.id ? { color: `${design.header_color}` } : {}}
          href={"/category/" + item?.id}
          className={id == item?.id ? activeColor : inactiveColor}
        >
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
            {item?.cat?.map((sub: any, key: number) => (
              <div className="py-2 category-page" key={key}>
                <Link href={"/category/" + sub?.id}>
                  <p
                    style={
                      id == sub?.id ? { color: `${design.header_color}` } : {}
                    }
                    className={id == sub?.id ? activesub : inactivesub}
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
