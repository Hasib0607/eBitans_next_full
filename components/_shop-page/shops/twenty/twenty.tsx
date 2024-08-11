"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import Pagination from "@/components/_category-page/category/pagination";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import Card44 from "@/components/card/card44";
import Link from "next/link";

const Twenty = ({ data }: any) => {
  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<any>(true);

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  return (
    <div className="">
      <div className="sm:container px-5 sm:py-10 py-5 ">
        <div className="">
          <div className="mt-8 hidden lg:flex border-b-2">
            <div className="flex gap-x-10 flex-wrap gap-y-2">
              {category?.map((item: any) => (
                <SingleCat item={item} key={item?.id} />
              ))}
            </div>
          </div>
          <div className="mt-10">
            <div className="flex-1">
              <Product
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
                <Pagination paginate={paginate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Twenty;

const Product = ({
  products,
  grid,
  page,
  setProducts,
  setPaginate,
  setShops,
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
  }, [shop_load === 1 && page, setShops]);

  const fetchData = async () => {
    // get the data from the api
    const { data, error } = await httpReq.get(
      `shoppage/products${
        page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
      }&name=${"siam.localhost:3000"}`
    );

    if (error) {
      setPaginate(null);
      setProducts([]);
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
                  //   wrapperClassName=""
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
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8">
              {products.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card44 item={item} />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {products.map((item: any) => (
              <motion.div
                key={item?.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, ease: "linear" }}
              >
                <Card44 item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div onMouseLeave={() => setShow(false)} className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        className="w-full flex items-center gap-x-2 relative pb-3"
      >
        <Link href={"/category/" + item.id} className="text-gray-500 w-max">
          {" "}
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
            {item?.cat?.map((sub: any, idx: any) => (
              <div key={idx} className="">
                <Link href={"/category/" + sub?.id}>
                  {" "}
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
