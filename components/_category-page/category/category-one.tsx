"use client";
import ProductCardOne from "@/components/card/product-card/product-card-one";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import Pagination from "./pagination";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const CategoryOne = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [paginate, setPaginate] = useState<any>({});
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
    setDataId(data?.id);
  }, [data?.id]);

  useEffect(() => {
    setLoad(true);
    fetchData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shop_load === 1 && page,
    category,
    setPaginate,
    dataId,
    setProducts,
    setColors,
    activeColor,
    val,
  ]);

  const fetchData = async (id: any) => {
    try {
      const pageQuery = page
        ? shop_load === 1
          ? page
          : `?page=${page}`
        : `?page=1`;
      const colorFilter = activeColor ? encodeURIComponent(activeColor) : "";
      const priceFilter = Number(val) !== 0 ? Number(val) : "";
      const apiUrl = `getcatproducts${pageQuery}&priceFilter=${priceFilter}&colorFilter=${colorFilter}`;

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
            // setProducts((prevProducts: any) => [...prevProducts, ...data.data]);
          }
          setPage(page + 1);
        } else {
          setProducts(data.data);
        }

        setPaginate(data);
        setLoad(false);
        // setError(null);
      } else {
        setHasMore(false);
        setLoad(false);
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setHasMore(false);
      setLoad(false);
      //   setError(error);
    }
  };

  return (
    <>
      <div className="sm:container px-5 sm:py-10 py-5 dark:bg-black">
        <div className="">
          <div className="text-sm breadcrumbs md:mt-6 my-4 ">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Category</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sm:container px-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="hidden lg:block lg:col-span-3">
            <div className="flex flex-col gap-4">
              <div className="border border-gray-100 p-4 bg-white rounded shadow">
                <Title text={"Category"} color={"black"} />
                <TitleBorder />
                <nav className="list-none mb-6 space-y-3 px-4">
                  {category?.map((item: any) => (
                    <SingleCat
                      key={item?.id}
                      item={item}
                      setSelect={setSelect}
                      select={select}
                      setPage={setPage}
                      setHasMore={setHasMore}
                    />
                  ))}
                </nav>
              </div>
            </div>
            <div className="border border-gray-100 bg-white rounded shadow my-6 p-4">
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
            <div className="border border-gray-100 bg-white rounded shadow p-4">
              <FilterByPrice
                id={data?.id}
                setVal={setVal}
                val={val}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            {/* <div className="flex items-center justify-start mb-3">
                            <div className='bg-gray-300 dark:bg-black py-1 px-3 rounded-lg'>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{paginate?.from}</span> to <span className="font-medium">{paginate?.to}</span> of{' '}
                                    <span className="font-medium">{paginate?.total}</span> results
                                </p>
                            </div>
                        </div> */}

            {load ? (
              <div className="col-span-12 lg:col-span-9">
                <Skeleton />
              </div>
            ) : (
              <div className="col-span-12 lg:col-span-9 w-full">
                <div className="flex items-center justify-start mb-3">
                  <div className="bg-gray-300 dark:bg-black py-1 px-3 rounded-lg">
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
                      next={() => fetchData(data)}
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
      </div>
    </>
  );
};

export default CategoryOne;

const SingleCat = ({ item, select, setSelect, setPage, setHasMore }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <div className="w-full border mb-2">
        <div className="flex items-center px-4 py-3">
          <Link
            onClick={() => {
              setSelect(item.id);
              setPage(1);
              setHasMore(true);
            }}
            href={"/category/" + item.id}
            className={`flex-1 hover:ml-4 duration-300 text-lg font-medium ${
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
                    onClick={() => {
                      setSelect(sub.id);
                      setPage(1);
                      setHasMore(true);
                    }}
                    href={"/category/" + sub?.id}
                  >
                    {" "}
                    <p
                      className={`py-2 hover:ml-4 duration-300 px-4 text-sm ${
                        select === sub.id ? "text-red-500" : "text-gray-500"
                      }`}
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
