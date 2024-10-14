"use client";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { TiHome } from "react-icons/ti";
import { motion } from "framer-motion";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Pagination from "./pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import Card66 from "@/components/card/card66";
import Link from "next/link";

const CategoryThirtyEight = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, design, subcategory } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  const [sort, setSort] = useState("");
  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState({});
  const [cat, setCat] = useState({});
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

  const styleCss = `
    .btn-card:hover {
        background:${design?.header_color};
        color:${design?.text_color};
        }
    .text-hover:hover {
        color:  ${design?.header_color};
        } 
`;
  const temp = subcategory?.find(
    (c: any) => parseInt(c?.id) === parseInt(data?.id)
  );
  const subCat = subcategory?.filter(
    (c: any) => parseInt(c?.parent) === parseInt(temp ? temp?.parent : data?.id)
  );

  return (
    <div className="bg-[#F2F4F8]">
      <style>{styleCss}</style>

      <div className="bg-white">
        <Location shops={shops} cat={cat} />
      </div>
      <div className="py-3 lg:block hidden bg-white">
        <div className="flex flex-wrap items-center gap-3 sm:container px-5 ">
          {subCat?.map((item: any, key: number) => (
            <SubCat key={item?.id} item={item} />
          ))}
        </div>
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
          <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
            <Filter
              onChange={(e: any) => {
                setSort(e.target.value);
                setPage(1);
                setHasMore(true);
              }}
              setGrid={setGrid}
              setOpen={setOpen}
              shops={shops}
              cat={cat}
              open={open}
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
                paginate={paginate}
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

export default CategoryThirtyEight;

const Product = ({
  products,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  dataId,
  grid,
  setCat,
  setColors,
  activeColor,
  val,
  setPage,
  shop_load,
  setHasMore,
  hasMore,
  paginate,
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3">
              {products?.map((item: any, key: number) => (
                <motion.div
                  key={key}
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
          {products?.map((item: any, key: number) => (
            <motion.div
              key={key}
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

const Location = ({ shops, cat }: any) => {
  return (
    <div className="w-full text-[#414141] sm:container flex gap-1 items-center justify-start py-3 text-sm px-5">
      <Link href="/">
        <TiHome className="text-lg" />
      </Link>
      <p> / Shop / {shops?.name || cat?.name}</p>
    </div>
  );
};

const Filter = ({ paginate, onChange, shops, cat }: any) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center mb-8">
      <div className="bg-white px-4 py-2">
        <span>{shops?.name || cat?.name}</span>{" "}
        <span>({paginate ? paginate?.total : 0}) </span>
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

const SubCat = ({ item }: any) => {
  return (
    <>
      <Link href={"/category/" + item?.id}>
        <div className="py-2 px-5 text-center w-max border rounded-full bg-white">
          <p className={`text-sm text-gray-600`}>{item?.name}</p>
        </div>
      </Link>
    </>
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
