"use client" // Marks this file as a Client Component

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import FeaturedCategory with ssr: false to make it a Client Component
const FeaturedCategory = dynamic(() => import("@/components/featured-category"), {
    ssr: false, // Disable SSR for this component
});

interface Props {
    category?: any;
    design?: any;
    store_id?: any;
}

const FeaturedCategoryMain = ({ category, design, store_id }: Props) => {
    const [product, setProduct] = useState<any>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const domain = window.location.host.startsWith("www.")
                ? window.location.host.slice(4)
                : window.location.host;

            if (domain != "") {
                const head = "product";

                axios.post(
                    process.env.NEXT_PUBLIC_API_URL + "getsubdomain/name",
                    {
                        name: domain,
                        head: head,
                    }
                ).then((response) => {
                    const productData = response?.data?.product || [];
                    setProduct(productData);
                }).then((err) => {
                    // console.log("error get product", err);
                });
            }
        }
    }, []);
       
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
