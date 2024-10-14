"use client";
import React, { useEffect, useState } from "react";
import "./category-four.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import { catImg } from "@/site-settings/siteUrl";
import Shop from "./shopx";
import ProductCardTwo from "@/components/card/product-card/product-card-two";
import Pagination from "./pagination";

const CategoryFour = () => {
  const { id: data }: any = useParams<{ id: string }>();
  const { category, module, subcategory } = useTheme();
  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);

  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState<any>({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [paginate, setPaginate] = useState({});
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
    dataId,
    setPaginate,
    setProducts,
    setShops,
    subcategory,
  ]);

  const fetchData = async (id: any) => {
    try {
      const pageQuery = page
        ? shop_load === 1
          ? page
          : `?page=${page}`
        : `?page=1`;
      //   const colorFilter = activeColor ? encodeURIComponent(activeColor) : "";
      //   const priceFilter = Number(val) !== 0 ? Number(val) : "";
      const apiUrl = `getcatproducts${pageQuery}`;

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
            // setProducts((prevProducts: any) => [...prevProducts, ...data.data]);
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
      {products.length === 0 ? (
        <div className="bg-gray-100">
          <div className="mx-auto">
            <img src={catImg} className="w-full min-h-[150px]" alt="" />
          </div>
          <div className="sm:container px-5 sm:py-10 py-5">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <a href="/">Categories</a>
                </li>

                <li className="font-bold tracking-wider ">{shops?.name}</li>
              </ul>
            </div>
          </div>
          <div className="divider text-black">{shops?.name}</div>

          <div
            className="flex sm:container px-5 sm:py-10 py-5 justify-center mt-20"
            style={{ minHeight: "50vh" }}
          >
            <h2 className="font-bold text-4xl text-center text-gray-400">
              No Product Available
            </h2>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="mx-auto">
            <img
              src={catImg + shops?.banner}
              className="w-full min-h-[150px]"
              alt=""
            />
          </div>
          <Shop categories={shops}>
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
                    <p className="text-center mt-5 text-xl font-bold mb-5">
                      No More Products
                    </p>
                  }
                >
                  <div className="flex flex-wrap gap-4 justify-center my-10">
                    {products?.map((product: any) => (
                      <ProductCardTwo key={product.id} item={product} />
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-4 justify-center my-10">
                  {products?.map((product: any) => (
                    <ProductCardTwo key={product.id} item={product} />
                  ))}
                </div>
              </div>
            )}
          </Shop>
          {shop_load === 1 && (
            <div className="my-5">
              <Pagination data={data} paginate={paginate} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryFour;
