"use client";
// import Pagination from "@/components/_category-page/category/pagination";
import ProductCardTwo from "@/components/card/product-card/product-card-two";
import ShopWrapper from "@/components/shop-wrapper";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "../one/pagination";

const Four = ({ data }: any) => {
  const { module } = useTheme();
  const [products, setProducts] = useState<any>([]);
  const [paginate, setPaginate] = useState<any>({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [paginatePage, setPaginatePage] = useState("?page=1");
  const [paginateModule, setPaginateModule] = useState(false);

  const getPaginateModule = module?.find(
    (item: any) => item?.modulus_id === 105
  );
  const shop_load = parseInt(getPaginateModule?.status);

  useEffect(() => {
    setLoading(true);
    const pageShopVal = !Number.isNaN(shop_load) ? shop_load : 0;

    if (!Number.isNaN(shop_load) && (pageShopVal == 0 || pageShopVal == 1)) {
      const moduleVal = pageShopVal == 1 ? true : false;
      setPaginateModule(moduleVal);
      setLoading(false);
    }
  }, [shop_load]);

  const shop = {
    name: "Shop",
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateModule && paginatePage, setPaginate, setProducts]);

  const fetchData = async () => {
    // get the data from the api
    const { data, error } = await httpReq.get(
      `shoppage/products${
        page ? (paginateModule ? paginatePage : `?page=${page}`) : `?page=1`
      }&name=${window.location.host.startsWith("www.") ? window.location.host.slice(4) : window.location.host}`
    );

    if (error) {
      setPaginate(null);
      setProducts([]);
      return null;
    } else if (data?.data?.length > 0) {
      if (!paginateModule) {
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
        {!loading && !paginateModule ? (
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
                <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
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
      {!loading && paginateModule && (
        <div className="my-5">
          <Pagination setPage={setPaginatePage} paginate={paginate} />
        </div>
      )}
    </div>
  );
};

export default Four;
