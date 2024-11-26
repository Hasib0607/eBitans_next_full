"use client" // Marks this file as a Client Component

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const NewArrival = dynamic(() => import("@/components/new-arrival"));

interface Props {
    category?: any;
    design?: any;
    store_id?: any;
}

const NewArrivalProductMain = ({ category, design, store_id }: Props) => {
    const [product, setProduct] = useState<any>([]);

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
                    setProduct(productData);

                }).then((err) => {
                    // console.log("error get product", err);
                });
            }
        }
    }, []);
       
    return (
        <NewArrival
          product={product}
          theme={design?.new_arrival}
          design={design}
          store_id={store_id}
          category={category}
        />
    );
};

export default NewArrivalProductMain;
