"use client";

import Card54 from "@/components/card/card54";
import SectionHeadingThirty from "@/components/section-heading/section-heading-thirty";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { useEffect, useState } from "react";

const ProductThirty = ({ category, design, store_id }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);

  const { data, error } = useHeaderSettings();

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
    .sec-twenty-nine{
        border-bottom: 2px solid ${design?.header_color};
    }
 `;

  const { title, title_color } = data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="my-5 w-full relative flex flex-col gap-5">
        <div className="">
          <SectionHeadingThirty
            title={title || "Shop Across Popular Category"}
            title_color={title_color || "#000"}
          />
        </div>
        <div
          className={`flex flex-wrap gap-x-16 gap-y-3 lg:cursor-pointer text-xl font-medium ${
            design?.template_id === "34" ? "text-gray-300" : "text-gray-600"
          } pt-5 lg2:pt-0`}
        >
          {category?.slice(0, 5).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${
                  active === index ? "active-cat-twenty-four" : ""
                } pb-2 border-b-2 border-transparent z-[1] relative`}
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

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.slice(0, 8).map((productData: any) => (
            <div key={productData.id}>
              {" "}
              <Card54 item={productData} design={design} store_id={store_id} />
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

export default ProductThirty;
