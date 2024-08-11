"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import ShopWrapper from "@/components/shop-wrapper";
import ProductCardTwo from "@/components/card/product-card/product-card-two";
import Pagination from "@/components/_category-page/category/pagination";

const Four = ({ data }: any) => {
  const { module } = useTheme();
  const paginateModule = module?.find((item: any) => item?.modulus_id === 105);
  const [products, setProducts] = useState<any>([]);
  const [paginate, setPaginate] = useState<any>({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const shop_load = parseInt(paginateModule?.status);
  const pageShop = shop_load === 1 ? data?.page : page;

  const shop = {
    name: "Shop",
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop_load === 1 && page, setPaginate, setProducts]);

  const fetchData = async () => {
    // get the data from the api
    const { data, error } = await httpReq.get(
      `shoppage/products${
        pageShop
          ? shop_load === 1
            ? pageShop
            : `?page=${pageShop}`
          : `?page=1`
      }&name=${"siam.localhost:3000"}`
    );

    if (error) {
      setPaginate(null);
      setProducts([]);
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
    } else if (data?.current_page === 1) {
      setProducts([]);
      setHasMore(false);
      setPaginate(data);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
      <ShopWrapper categories={shop}>
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
                <p className="text-center mt-5 text-xl font-bold mb-5">
                  No More Products
                </p>
              }
            >
              <div className="flex flex-wrap gap-4 justify-center my-10">
                {products?.map((product: any, idx: any) => (
                  <ProductCardTwo key={product.id} item={product} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <div>
            {products?.length ? (
              <div className="flex flex-wrap gap-4 justify-center my-10">
                {products?.map((product: any, idx: any) => (
                  <ProductCardTwo key={product.id} item={product} />
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
      </ShopWrapper>
      {shop_load === 1 && (
        <div className="my-5">
          <Pagination paginate={paginate} />
        </div>
      )}
    </div>
  );
};

export default Four;
