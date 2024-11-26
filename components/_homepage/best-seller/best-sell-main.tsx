"use client"; // Marks this file as a Client Component

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BestSellerProduct = dynamic(
  () => import("@/components/best-seller-product"),
  {
    ssr: false,
  }
);

interface Props {
  banner?: any;
  design?: any;
  store_id?: any;
}

const BestSellMain = ({ banner, design, store_id }: Props) => {
  const [product, setProduct] = useState<any>([]);
  const [bestSellProduct, setBestSellProduct] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const domain = window.location.host.startsWith("www.")
        ? window.location.host.slice(4)
        : window.location.host;

      if (domain != "") {
        const head = "product,feature_product";

        axios
          .post(process.env.NEXT_PUBLIC_API_URL + "getsubdomain/name", {
            name: domain,
            head: head,
          })
          .then((response) => {
            const productData = response?.data?.product || [];
            setProduct(productData);

            const BestSellProductData = response?.data?.best_sell_product || [];
            setBestSellProduct(BestSellProductData);
          })
          .then((err) => {
            // console.log("error get product", err);
          });
      }
    }
  }, []);

  return (
    <BestSellerProduct
      theme={design?.best_sell_product}
      best_sell_product={bestSellProduct}
      design={design}
      store_id={store_id}
      product={product}
      banner={banner}
    />
  );
};

export default BestSellMain;
