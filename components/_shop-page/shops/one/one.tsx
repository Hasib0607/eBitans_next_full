"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import Skeleton from "@/components/loader/skeleton";
import ProductCardOne from "@/components/card/product-card/product-card-one";
import Pagination from "./pagination";

const One = ({ data }: any) => {
  const { category, module } = useTheme();
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);
  const [paginate, setPaginate] = useState<any>({});
  const [val, setVal] = useState<any>(0);
  const [colors, setColors] = useState<any>(null);
  const [activeColor, setActiveColor] = useState<any>(null);
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<any>(true);
  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);
  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop_load === 1 && page, activeColor, setColors, activeColor, val]);

  const fetchData = async () => {
    // get the data from the api
    const { colors, data, error } = await httpReq.get(
      `shoppage/products${
        pageShop
          ? shop_load === 1
            ? pageShop
            : `?page=${pageShop}`
          : `?page=1`
      }&name=${"siam.localhost:3000"}&priceFilter=${
        Number(val) !== 0 ? Number(val) : ""
      }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`
    );
    // console.log(data);
    if (error) {
      setPaginate(null);
      setProducts([]);
      setColors(colors);
      return null;
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
      setColors(colors);
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

  return (
    <>
      <div className="sm:container px-5 sm:py-10 py-5 ">
        <div className="">
          <div className="text-sm md:mt-6 my-4 ">
            <ul className="flex items-center gap-x-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>{">"}</li>
              <li>Shop</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sm:container px-5 pb-10">
        <div className="grid grid-cols-12">
          <div className="hidden lg:block lg:col-span-3">
            <div className="flex flex-col gap-4">
              <div className="border border-gray-100 p-4 bg-white rounded shadow">
                <Title text={"Category"} color={"black"} />
                <TitleBorder />

                <nav className="list-none mb-6 space-y-3 px-4">
                  {category?.map((item: any) => (
                    <Link1
                      key={item?.id}
                      text={item?.name}
                      href={"/category/" + item?.id}
                    />
                  ))}
                </nav>
              </div>
              <div className="border border-gray-100 p-4 bg-white rounded shadow">
                <FilterByColor
                  setActiveColor={setActiveColor}
                  colors={colors}
                  activeColor={activeColor}
                  shop_load={shop_load}
                  setPage={setPage}
                  setHasMore={setHasMore}
                />
              </div>
              <div className="border border-gray-100 p-4 bg-white rounded shadow">
                <FilterByPrice
                  setVal={setVal}
                  val={val}
                  setPage={setPage}
                  setHasMore={setHasMore}
                />
              </div>
            </div>
          </div>
          {load ? (
            <div className="col-span-12 lg:col-span-9">
              <Skeleton />
            </div>
          ) : (
            <div className="col-span-12 lg:col-span-9 w-full">
              <div className="flex items-center justify-start mb-3">
                <div className="bg-gray-300 py-1 px-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{paginate?.from}</span> to{" "}
                    <span className="font-medium">{paginate?.to}</span> of{" "}
                    <span className="font-medium">{paginate?.total}</span>{" "}
                    results
                  </p>
                </div>
              </div>
              {/* main products in here  */}
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
                          // wrapperClassName=""
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
                    <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                      {products?.map((i: any) => (
                        <ProductCardOne key={i.id} item={i} />
                      ))}
                    </div>
                  </InfiniteScroll>
                </div>
              ) : (
                <div>
                  {products?.length ? (
                    <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                      {products?.map((i: any) => (
                        <ProductCardOne key={i.id} item={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center h-[400px] items-center">
                      <h3 className=" font-sans font-semibold text-3xl text-gray-400 ">
                        Product Not Found!
                      </h3>
                    </div>
                  )}
                </div>
              )}

              {shop_load === 1 && (
                <div className="my-5">
                  <Pagination paginate={paginate} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default One;

const Link1 = ({ text, href }: any) => {
  return (
    <motion.li
      whileHover={{
        x: 8,
        transition: { duration: 0.5 },
        color: "#f27820",
      }}
      exit={{
        x: 0,
        transition: { duration: 0.5 },
      }}
    >
      <Link href={href} className={`hover_text text-gray-900`}>
        {text}
      </Link>
    </motion.li>
  );
};

const Title = ({ text, children, color }: any) => {
  const { design } = useTheme();
  return (
    <h3
      style={{ fontSize: "22px" }}
      className="font-semibold flex gap-1 text-black"
    >
      <span style={{ color: color ? color : design?.text_color }}>{text}</span>
      {children}
    </h3>
  );
};

const TitleBorder = () => {
  return (
    <>
      <div className="relative">
        <div className="divider relative"></div>
        <div className="w-2/12 bg-orange-500 h-1 text-left flex justify-start absolute left-0 top-1"></div>
      </div>
    </>
  );
};
