"use client" // Marks this file as a Client Component

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FeatureProduct = dynamic(() => import("@/components/feature-product"), {
    ssr: false,
  });

interface Props {
    banner?: any;
    design?: any;
    store_id?: any;
}

const FeaturedProductMain = ({ banner, design, store_id }: Props) => {
    const [product, setProduct] = useState<any>([]);
    const [featureProduct, setFeatureProduct] = useState<any>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const domain = window.location.host.startsWith("www.")
                ? window.location.host.slice(4)
                : window.location.host;

            if (domain != "") {
                const head = "product,feature_product";

                axios.post(
                    process.env.NEXT_PUBLIC_API_URL + "getsubdomain/name",
                    {
                        name: domain,
                        head: head,
                    }
                ).then((response) => {
                    const productData = response?.data?.product || [];
                    setProduct(productData)

                    const FeatureProductData = response?.data?.feature_product || [];
                    setFeatureProduct(FeatureProductData);
                }).then((err) => {
                    // console.log("error get product", err);
                });
            }
        }
    }, []);
       
    return (
        <FeatureProduct
          theme={design?.feature_product}
          feature_product={featureProduct}
          design={design}
          store_id={store_id}
          product={product}
          banner={banner}
        />
    );
};

export default FeaturedProductMain;
