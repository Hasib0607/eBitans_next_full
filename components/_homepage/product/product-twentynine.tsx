"use client";
import Card53 from "@/components/card/card53";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { useEffect, useState } from "react";

const ProductTwentyNine = ({ category, design, store_id }: any) => {
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

      <div className="my-5 w-full relative flex flex-col lg2:flex-row justify-between lg2:items-center">
        <div className="z-[1] relative">
          <h3
            style={{ color: title_color }}
            className="text-lg md:text-xl text-black pb-[10px] w-max font-bold capitalize sec-twenty-nine"
          >
            {title || "Top Selling Products"}
          </h3>
        </div>
        <div className="flex flex-wrap gap-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 justify-center pt-10 lg2:pt-0">
          {category?.slice(0, 5).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${
                  active === index ? "active-cat-twenty-four" : ""
                } px-5 pb-[16px] border-b-2 border-transparent z-[1] relative`}
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
        <div className="absolute h-[1px] bg-gray-300 w-full top-[39px]"></div>
      </div>

      {/* <div className='h-[2px] w-full bg-gray-300 mb-5 -mt-0.5'></div> */}
      {products?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {products?.slice(0, 8).map((productData: any) => (
            <div key={productData.id}>
              {" "}
              <Card53 item={productData} design={design} store_id={store_id} />
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

export default ProductTwentyNine;
