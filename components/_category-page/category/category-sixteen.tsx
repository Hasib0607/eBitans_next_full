"use client";
import { useEffect, useState } from "react";

import FilterCat from "@/components/_shop-page/shops/sixteen/filter-cat";
import Card26 from "@/components/card/card26";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { useParams } from "next/navigation";
import { IoFilter } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "./pagination";

const CategorySixteen = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { module, design } = useTheme();

  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [paginate, setPaginate] = useState<any>({});
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
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
    .border-filter {
        border: 1px solid ${design?.header_color};
    }

`;

  return (
    <div>
      <style>{styleCss}</style>
      {/* main section  */}

      <div className="sm:container px-5 sm:py-10 py-5 flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
        {/* <div className="text-gray-500 font-thin order-3 md:order-2">
          There are {paginate ? paginate?.total : 0} products{" "}
        </div> */}
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
          className={`z-[4] bg-white border-r-2 fixed left-0 sm:w-96 w-40 sm:px-10 pl-2 bottom-0 top-[70px] duration-1000 ${
            open ? "left-0" : "sm:-left-96 -left-40"
          }`}
        >
          <FilterCat />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={`${
            open ? "sm:left-96 left-40" : "left-0"
          } text-white hidden lg:flex flex-col items-center duration-1000 fixed top-[170px] bg-color px-4 py-4 z-[2] rounded-tr-lg rounded-br-lg`}
        >
          <IoFilter className="text-xl" />
          Filter
        </button>

        <div className="sm:container px-5 sm:py-10 py-5">
          <Product
            id={data}
            dataId={dataId}
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
            <Pagination data={data} paginate={paginate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySixteen;

const Product = ({
  products,
  sort,
  page,
  setProducts,
  setPaginate,
  setShops,
  dataId,
  setPage,
  shop_load,
  setHasMore,
  hasMore,
  id,
}: any) => {
  const [showSk, setShowSk] = useState(true);
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
      //   const colorFilter = activeColor ? encodeURIComponent(activeColor) : "";
      //   const priceFilter = Number(val) !== 0 ? Number(val) : "";
      const apiUrl = `getcatproducts${pageQuery}&filter=${sort}`;

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
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
              {products?.map((item: any, key: number) => (
                <div key={key}>
                  <Card26 item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
            {products?.map((item: any, key: number) => (
              <div key={key}>
                <Card26 item={item} />
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
