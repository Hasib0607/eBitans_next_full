// Subcategory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import ProductCardTwo from "@/components/card/product-card/product-card-two";
import Skeleton from "@/components/loader/skeleton";
import Pagination from "../category/pagination";

interface Product {
  id: number;
  // Add other product properties as needed
}

interface PaginationData {
  current_page: number;
  last_page: number;
  data: Product[];
}

const Subcategory: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginate, setPaginate] = useState<PaginationData | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts(subcategoryId);
  }, [subcategoryId, page]);

  const fetchProducts = async (id: string) => {
    try {
      const response = await httpReq.post(`getsubcatproducts`, { id, page });
      const { data, error } = response;

      if (data) {
        setProducts((prevProducts) => [...prevProducts, ...data.data]);
        setPaginate(data);
        setHasMore(data.current_page < data.last_page);
        setLoad(false);
        setError(null);
      } else {
        setHasMore(false);
        setLoad(false);
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setLoad(false);
      setError(error.message);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (load) return <Skeleton />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="subcategory-container">
      <h2 className="text-center text-2xl font-bold">Subcategory Products</h2>
      <div className="flex flex-wrap gap-4 justify-center my-10">
        {products.map((product) => (
          <ProductCardTwo key={product.id} item={product} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center my-5">
          <button onClick={loadMore} className="load-more-button">
            Load More
          </button>
        </div>
      )}
      {paginate && <Pagination data={paginate} />}
    </div>
  );
};

export default Subcategory;
