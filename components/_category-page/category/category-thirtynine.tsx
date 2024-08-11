"use client";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "./pagination";
import httpReq from "@/utils/http/axios/http.service";
import Skeleton from "react-loading-skeleton";
import Card68 from "@/components/card/card68";
import Link from "next/link";

const CategoryThirtyNine = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dataId, setDataId] = useState(null);
  const [sort, setSort] = useState("");
  const [shops, setShops] = useState<any>({});
  const [cat, setCat] = useState<any>({});

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setDataId(data);
  }, [data]);

  return (
    <div>
      <div className="sm:container px-5">
        <div className="pt-10">
          <div className="mb-5 text-xl lg:text-3xl">
            <h1>{shops?.name || cat?.name}</h1>
          </div>
          <div className="flex justify-between gap-3">
            <div className="hidden lg:flex gap-x-10 flex-wrap gap-y-2">
              {category?.map((item: any) => (
                <SingleCat item={item} key={item?.id} />
              ))}
            </div>
            <div className="w-max">
              <Filter
                onChange={(e: any) => {
                  setSort(e.target.value);
                  setPage(1);
                  setHasMore(true);
                }}
                paginate={paginate}
              />
            </div>
          </div>
          <div className="mt-10">
            <div className="flex-1">
              <Product
                id={data}
                dataId={dataId}
                page={pageShop}
                products={products}
                setProducts={setProducts}
                setPaginate={setPaginate}
                setPage={setPage}
                shop_load={shop_load}
                setHasMore={setHasMore}
                hasMore={hasMore}
                sort={sort}
                setShops={setShops}
                setCat={setCat}
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

export default CategoryThirtyNine;

const Product = ({
  id,
  products,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  dataId,
  setCat,
  setPage,
  shop_load,
  setHasMore,
  hasMore,
}: any) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const { category, subcategory } = useTheme();
  // console.log(page, "page");

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
                <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:gap-8">
                  {products?.map((product: any) => (
                    <Card68 key={product.id} item={product} />
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
            <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:gap-8">
              {products?.map((product: any) => (
                <Card68 key={product.id} item={product} />
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

const Filter = ({ paginate, onChange }: any) => {
  return (
    <div className="flex justify-between items-center">
      {/* Short by  */}
      <div className="">
        <select
          onChange={onChange}
          className="h-9 min-w-[200px] w-full duration-500 lg:cursor-pointer border-0 focus:border focus:border-black focus:outline-0 ring-0 focus:ring-0 text-sm flex-1 bg-white"
        >
          <option>Featured</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="lh">Low - High</option>
          <option value="hl">High - Low</option>
        </select>
      </div>
      <div className="px-4 py-2 text-sm w-full">
        <p className="w-max">{paginate ? paginate?.total : 0} products </p>
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
        border-bottom: 2px solid black;
       }
    `;
  return (
    <div onMouseLeave={() => setShow(false)} className="relative">
      <style>{styleCss}</style>
      <div
        onMouseEnter={() => setShow(true)}
        className="w-full flex items-center gap-x-2 relative category-page"
      >
        <Link
          href={"/category/" + item.id}
          className="text-gray-500 w-max text-sm"
        >
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div className="lg:cursor-pointer">
            {show ? (
              <MdKeyboardArrowUp className="text-xl text-gray-800" />
            ) : (
              <MdKeyboardArrowDown className="text-xl text-gray-800" />
            )}
          </div>
        ) : null}
      </div>

      {show && item?.cat && (
        <>
          <div
            onMouseLeave={() => setShow(false)}
            className="absolute top-8 left-0 z-[8] bg-white px-5 py-2"
          >
            {item?.cat?.map((sub: any, key: number) => (
              <div className="category-page" key={key}>
                <Link
                  href={"/category/" + sub?.id}
                  className="text-xs text-gray-500"
                >
                  <li className="w-max">{sub?.name}</li>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
