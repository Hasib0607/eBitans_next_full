"use client"; // Marks this file as a Client Component

import { useGetSettingQuery } from "@/redux/features/home/homeApi";
import getDomain from "@/utils/getDomain";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Product = dynamic(() => import("@/components/product"), {
  ssr: false,
});

interface Props {
  category?: any;
  design?: any;
  store_id?: any;
}

const ProductMain = ({ category, design, store_id }: Props) => {
  const [product, setProduct] = useState<any>([]);
  const [featureProduct, setFeatureProduct] = useState<any>([]);
  const [bestSellProduct, setBestSellProduct] = useState<any>([]);
  const [url, setUrl] = useState<any>(getDomain());
  const [skip, setSkip] = useState<any>(true);

  const {
    data: productData,
    isLoading: productLoading,
    isSuccess: productSuccess,
  } = useGetSettingQuery({ domain: url, slug: "product" }, { skip: skip });
  const {
    data: featureProductData,
    isLoading: featureLoading,
    isSuccess: featureSuccess,
  } = useGetSettingQuery(
    { domain: url, slug: "feature_product" },
    { skip: skip }
  );
  const {
    data: bestSellProductData,
    isLoading: bestSellLoading,
    isSuccess: bestSellSuccess,
  } = useGetSettingQuery(
    { domain: url, slug: "best_sell_product" },
    { skip: skip }
  );

  useEffect(() => {
    const siteURL = getDomain();
    if (siteURL != "") {
      setUrl(siteURL);
      setSkip(false);
    }
  }, []);

  useEffect(() => {
    if (productData) {
      const getProductData = productData?.data || [];
      setProduct(getProductData);
    }
  }, [productSuccess, productData]);

  useEffect(() => {
    if (featureProductData) {
      const getFeatureProductData = featureProductData?.data || [];
      setFeatureProduct(getFeatureProductData);
    }
  }, [featureSuccess, featureProductData]);

  useEffect(() => {
    if (bestSellProductData) {
      const getBestSellProductData = bestSellProductData?.data || [];
      setBestSellProduct(getBestSellProductData);
    }
  }, [bestSellSuccess, bestSellProductData]);

  return (
    <Product
      theme={design?.product}
      design={design}
      store_id={store_id}
      product={product}
      best_sell_product={bestSellProduct}
      feature_product={featureProduct}
      category={category}
    />
  );
};

export default ProductMain;
