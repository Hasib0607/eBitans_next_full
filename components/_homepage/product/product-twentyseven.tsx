"use client";
import Card51 from "@/components/card/card51";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";

const ProductTwentySeven = ({ category, design, store_id }: any) => {
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
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5  w-full">
      <style>{styleCss}</style>
      <div className='flex flex-col "text-2xl md:text-3xl text-black font-semibold mb-6 mt-14'>
        <div className="xl:text-5xl text-2xl md:text-3xl">
          <p>What&apos;s trending now</p>
        </div>
        <div className="flex gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5">
          {category?.slice(0, 3).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${
                  active === index ? "bg-gray-800 text-white" : ""
                } px-2 py-1 rounded-full`}
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
      </div>
      <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-2">
          {products?.slice(0, 8).map((productData: any) => (
            <div key={productData.id}>
              {" "}
              <Card51 item={productData} design={design} store_id={store_id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-red-500 text-center py-10 text-xl">
          No Products Available
        </div>
      )}
    </div>
  );
};

export default ProductTwentySeven;
