"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/use-theme";
import Pagination from "./pagination";
import FilterByColor from "@/components/filter-by-color";
import FilterByPrice from "@/components/filter-by-price";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import Card32 from "@/components/card/card32";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const CategoryFourteen = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, design } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
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
    .btn-hover:hover {
        color:   ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid transparent;
    }
    .filter {
      color: ${design?.text_color};
      background:${design?.header_color};
    }
    .text-hover:hover {
      color: ${design?.header_color};
    }
  
  `;
  return (
    <div>
      <style>{styleCss}</style>
      {/* banner section  */}
      <div className="h-80 bg-gray-100 w-full flex flex-col gap-3 justify-center items-center">
        <div>
          <h1 className="text-5xl font-medium">Products</h1>
        </div>
        <div className="flex gap-1 items-center">
          <p>Home</p>
          <IoIosArrowForward className="text-xs mt-1" />
          <p className="font-medium">{shops?.name}</p>
        </div>
      </div>

      {/* main section  */}

      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="grid grid-cols-4 gap-8">
          <div className="lg:col-span-3 col-span-4 ">
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center pb-3">
              <div
                onClick={() => setOpen(!open)}
                className={`px-7 btn-hover md:order-first py-1 flex gap-3 items-center lg:cursor-pointer ${
                  open === true
                    ? "filter border-transparent text-white"
                    : "bg-white border-[1px] border-black"
                }`}
              >
                <BiFilterAlt className="text-xl" />
                <p className="text-lg uppercase ">Filter</p>
              </div>

              <div className="text-gray-500 font-thin order-3 md:order-2">
                There are {paginate ? paginate?.total : 0} products{" "}
              </div>

              {/* sorting product  */}
              <div className="md:order-last">
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

            {/* filter category  */}
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

            <div className="grid grid-cols-1 gap-4 pt-10">
              <Product
                id={data}
                dataId={dataId}
                page={pageShop}
                sort={sort}
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

          {/* category side  */}
          <div className="col-span-1 lg:block hidden">
            <div className="flex items-center gap-3">
              <p className="h-[40px] w-[5px] bg-black"></p>
              <h1 className="text-xl">Categories</h1>
              <p className="h-[1px] w-full bg-gray-300"></p>
            </div>
            <div>
              {category?.map((item: any, idx: number) => (
                <SingleCat item={item} key={idx} />
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
        </div>
      </div>
    </div>
  );
};

export default CategoryFourteen;

const Product = ({
  products,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
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
            <div className="">
              {products.map((item: any, key: number) => (
                <div key={key}>
                  <Card32 item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          <div className="">
            {products.map((item: any, key: any) => (
              <div key={key}>
                <Card32 item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Filter = ({ onChange }: any) => {
  return (
    <div>
      {/* Short by  */}
      <div className="">
        <select
          onChange={onChange}
          className="lg:cursor-pointer px-8 text-base border-black flex items-center focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
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
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);

  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;
  return (
    <>
      <style>{styleCss}</style>
      <div className="w-full flex px-4 py-3 lg:cursor-pointer category-page">
        <Link
          href={"/category/" + item?.id}
          className={`flex-1 text-sm font-medium text-hover text-gray-900`}
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
      <div className=" px-4">
        <div className="h-[1px] bg-gray-400 w-full"></div>
      </div>
      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any, key: number) => (
              <div className="py-2 category-page" key={key}>
                <Link href={"/category/" + sub?.id}>
                  <p className={`pb-2 text-sm text-hover text-gray-500`}>
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
