"use client";
import Card56 from "@/components/card/card56";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "./pagination";

const CategoryTwentySix = () => {
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
    .shop-cat{
    border: 2px solid ${design?.header_color};
  }
  .shop-cat-dot{
    background: ${design?.header_color};
  }
 `;

  return (
    <div>
      <Location category={shops} cat={cat} />

      <div className="sm:container px-5">
        <style>{styleCss}</style>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className=" hidden lg:block col-span-3">
            <div className="w-full h-max relative">
              <h3 className="font-bold text-[#252525] text-2xl  mb-4 pb-[10px] w-max">
                Product Categories
              </h3>
              <div className="shop-cat rounded-md">
                {category?.map((item: any) => (
                  <SingleCat
                    key={item?.id}
                    item={item}
                    select={select}
                    setSelect={setSelect}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white my-6 p-4 shop-cat rounded-md">
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
            <div className="bg-white p-4 shop-cat rounded-md mb-5">
              <FilterByPrice
                id={data?.id}
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

export default CategoryTwentySix;

const Product = ({
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
              {products?.map((item: any, key: number) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
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
          {products?.map((item: any, key: number) => (
            <motion.div
              key={key}
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

const Filter = ({ paginate, onChange }: any) => {
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

const SingleCat = ({ item, setSelect, select }: any) => {
  // const [show, setShow] = useState(false)
  const { id }: any = useParams<{ id: string }>();
  const { design } = useTheme();
  const activeColor = `text-[${design?.header_color}] `;
  const inactiveColor = "text-gray-500 ";
  const activesub = `text-[${design?.header_color}] pl-8`;
  const inactivesub = `text-gray-600 pl-8`;
  return (
    <div className="border-b py-2">
      <div className="w-full">
        <div className="flex items-center gap-2 pl-4 py-1">
          <p className="w-1.5 h-1.5 rounded-full shop-cat-dot"></p>
          <Link
            onClick={() => setSelect(item.id)}
            href={"/category/" + item.id}
          >
            <p>
              <span
                style={
                  parseInt(id) === parseInt(item?.id)
                    ? { color: `${design.header_color}` }
                    : {}
                }
                className={id == item?.id ? activeColor : inactiveColor}
              >
                {item.name}
              </span>
            </p>
          </Link>
          {/* {item?.cat ? <div className="px-4 h-full">
                        {show ? <MinusIcon onClick={() => setShow(!show)} className='h-4 w-4 lg:cursor-pointer text-gray-800' /> :
                            <PlusIcon onClick={() => setShow(!show)} className='h-4 w-4 lg:cursor-pointer text-gray-800' />}
                    </div> : null} */}
        </div>
        <div>
          <div className={`overflow-hidden`}>
            {item?.cat?.map((sub: any, key: number) => (
              <div className="" key={key}>
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
        </div>
      </div>
    </div>
  );
};
