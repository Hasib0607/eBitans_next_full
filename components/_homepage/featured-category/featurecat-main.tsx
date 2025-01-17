"use client"; // Marks this file as a Client Component

import { useGetSettingQuery } from "@/redux/features/home/homeApi";
import getDomain from "@/utils/getDomain";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import FeaturedCategory with ssr: false to make it a Client Component
const FeaturedCategory = dynamic(
  () => import("@/components/featured-category"),
  {
    ssr: false, // Disable SSR for this component
  }
);

interface Props {
  category?: any;
  design?: any;
  store_id?: any;
}

const FeaturedCategoryMain = ({ category, design, store_id }: Props) => {
  const [product, setProduct] = useState<any>([]);
  const [url, setUrl] = useState<any>(getDomain());
  const [skip, setSkip] = useState<any>(true);

  const {
    data: productData,
    isLoading: productLoading,
    isSuccess: productSuccess,
  } = useGetSettingQuery({ domain: url, slug: "product" }, { skip: skip });

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

  return (
    <FeaturedCategory
      theme={design?.feature_category}
      category={category}
      design={design}
      product={product}
      store_id={store_id}
    />
  );
};

export default FeaturedCategoryMain;
