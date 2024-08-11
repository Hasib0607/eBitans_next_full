"use client";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "./pagination";
import Skeleton from "react-loading-skeleton";
import httpReq from "@/utils/http/axios/http.service";
import Card44 from "@/components/card/card44";
import Link from "next/link";

const CategoryTwenty = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState({});
  const [products, setProducts] = useState([]);
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

  return (
    <div>
      <div className="sm:container px-5 sm:py-10 py-5 ">
        <div className="">
          <div className="mt-8 hidden md:flex border-b-2">
            <div className="flex gap-x-10 flex-wrap gap-y-2">
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

export default CategoryTwenty;

const Product = ({
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
      // const colorFilter = activeColor ? encodeURIComponent(activeColor) : "";
      // const priceFilter = Number(val) !== 0 ? Number(val) : "";
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
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8">
                  {products?.map((product: any) => (
                    <Card44 key={product.id} item={product} />
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
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8">
              {products?.map((product: any) => (
                <Card44 key={product.id} item={product} />
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

const SingleCat = ({ item, select, setSelect }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div onMouseLeave={() => setShow(false)} className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        className="w-full flex items-center gap-x-2 relative pb-3"
      >
        <Link
          onClick={() => setSelect(item.id)}
          href={"/category/" + item.id}
          className="text-gray-500 w-max"
        >
          {" "}
          <p>{item.name}</p>{" "}
          <p
            className={`${
              select === item.id ? "block" : "hidden"
            } h-[2px] w-full bg-black absolute bottom-0 left-0`}
          ></p>
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
              <div className="" key={key}>
                <Link
                  onClick={() => setSelect(item.id)}
                  href={"/category/" + sub?.id}
                >
                  <li className="text-sm text-gray-500 w-max">{sub?.name}</li>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
