"use client";
import { useEffect, useState } from "react";

import Card49 from "@/components/card/card49";
import SectionHeadingTwentyFour from "@/components/section-heading/section-heading-twenty-four";
import httpReq from "@/utils/http/axios/http.service";
import "./product-twentyfour.css";

const ProductTwentyFour = ({ product, store_id, design, category }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function handleCategory() {
      try {
        const response = await httpReq.post(`getcatproducts`, {
          id: category[id].id,
        });
        if (!response?.error) {
          setProducts(response?.data?.data);
        } // the API response object
        else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleCategory();
  }, [category, id]);

  const styleCss = `
    .active-cat-twenty-four {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
        
    }
 `;

  console.log(products, "prd");

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>

      <div>
        <SectionHeadingTwentyFour
          title={"POPULAR PRODUCTS"}
          subtitle={
            "In fact, the stress factor in the eros is the sad element. The course of the family, I want to decorate cartoons, sometimes there is no pain."
          }
        />
      </div>

      <div className="flex flex-wrap gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5 justify-center">
        {category?.slice(0, 5).map((item: any, index: any) => (
          <div key={item.id}>
            <h1
              className={`${
                active === index ? "active-cat-twenty-four" : ""
              } px-5 py-1 pb-6 border-b-2 border-transparent`}
              onClick={() => {
                setActive(index);
                setId(index);
              }}
            >
              {item.name}
            </h1>
          </div>
        ))}
      </div>
      <div className="h-[2px] w-full bg-gray-300 mb-5 -mt-0.5"></div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.slice(0, 8).map((productData: any) => (
            <div key={productData.id}>
              <Card49 item={productData} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-500 text-center py-10 text-4xl">
          No Products Available
        </div>
      )}
    </div>
  );
};

export default ProductTwentyFour;
