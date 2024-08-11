"use client";
import Card29 from "@/components/card/card29";
import SectionHeadingSixteen from "@/components/section-heading/section-heading-sixteen";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";

const ProductFourteen = ({ category, design, store_id }: any) => {
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
    .active-cat {
      color:  ${design.header_color};
      border-bottom: 2px solid ${design.header_color};
      
  }

    `;

  console.log(category[id], "cat");

  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5 mx-auto">
      <style>{styleCss}</style>
      <div className="bg-white">
        <SectionHeadingSixteen title={"Products"} subtitle={""} />
        <div className="flex sm:gap-x-5 gap-x-2 justify-center pb-8 lg:cursor-pointer uppercase">
          {category?.slice(0, 4).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${
                  active === index ? "active-cat" : ""
                } font-medium text-sm sm:text-base`}
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

        {products?.length > 0 ? (
          <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:gap-5 gap-1 ">
            {products?.slice(0, 8).map((productData: any) => (
              <Card29
                item={productData}
                key={productData.id}
                design={design}
                store_id={store_id}
              />
            ))}
          </div>
        ) : (
          <div className="text-red-500 text-center py-10 text-xl">
            No Products Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFourteen;
