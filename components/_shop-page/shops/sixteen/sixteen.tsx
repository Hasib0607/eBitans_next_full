"use client";
import useTheme from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import FilterCat from "./filter-cat";
import httpReq from "@/utils/http/axios/http.service";
import Pagination from "@/components/_category-page/category/pagination";
import OvalLoader from "@/components/loader/oval-loader";
import Card26 from "@/components/card/card26";

const Sixteen = ({ data }: any) => {
  const { design, module } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [open, setOpen] = useState<any>(false);
  const [sort, setSort] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<any>(true);

  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

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
  .border-filter {
    border: 1px solid ${design?.header_color};
}

`;

  return (
    <div>
      <style>{styleCss}</style>
      {/* main section  */}

      <div className="sm:container px-5 sm:py-10 py-5 flex flex-col gap-4 md:gap-0 md:flex-row justify-between md:items-center pb-3">
        <div className="text-gray-500 font-thin order-3 md:order-2">
          There are {paginate ? paginate?.total : 0} products{" "}
        </div>
        <div className="md:order-last ">
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
      <div className="">
        <div
          className={`z-[4] bg-white hidden lg:block border-r-2 fixed left-0 sm:w-96 w-40 sm:px-10 pl-2 bottom-0 top-[70px] duration-1000 ${
            open ? "left-0" : "sm:-left-96 -left-40"
          }`}
        >
          <FilterCat />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={`${
            open ? "sm:left-96 left-40" : "left-0"
          } hidden lg:flex text-white  flex-col items-center duration-1000 lg:fixed top-[170px] bg-color px-4 py-4 z-[2] rounded-tr-lg rounded-br-lg`}
        >
          <IoFilter className="text-xl" />
          Filter
        </button>

        <div className="sm:container px-5 sm:py-10 py-5">
          <Product
            page={pageShop}
            sort={sort}
            products={products}
            setProducts={setProducts}
            setPaginate={setPaginate}
            setPage={setPage}
            shop_load={shop_load}
            setHasMore={setHasMore}
            hasMore={hasMore}
          />
        </div>

        {/* pagination  */}
        {shop_load === 1 && (
          <div className="my-5">
            <Pagination paginate={paginate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sixteen;

const Product = ({
  products,
  sort,
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
  }, [shop_load === 1 && page, setShops, sort]);

  const fetchData = async () => {
    // get the data from the api
    const { data, error } = await httpReq.get(
      `shoppage/products${
        page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
      }&name=${"siam.localhost:3000"}&filter=${sort}`
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
                  // wrapperClassName=""
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
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
              {products.map((item: any) => (
                <div key={item?.id}>
                  <Card26 item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
          {products.map((item: any) => (
            <div key={item?.id}>
              <Card26 item={item} />
            </div>
          ))}
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
          className="lg:cursor-pointer px-8 text-base border-filter flex items-center focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
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
