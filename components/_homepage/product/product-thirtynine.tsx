"use client";
import Card67 from "@/components/card/card67";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { useEffect, useState } from "react";

const ProductThirtyNine = ({ category, design, store_id }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);
  const [animate, setAnimate] = useState(false);

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

  const { data, error } = useHeaderSettings();
  const { title, title_color } = data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  return (
    <div className="">
      <div className="sm:container px-5 sm:py-10 py-5 w-full">
        <style>{styleCss}</style>

        <div className="w-full relative flex flex-col gap-5">
          <div className="text-center pb-10">
            <p
              style={{ color: title_color }}
              className="font-semibold text-[24px]"
            >
              {title || "Products"}
            </p>
          </div>
          <div
            className={`flex justify-center items-center flex-wrap gap-x-16 gap-y-3 lg:cursor-pointer font-medium mb-5`}
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
          <div
            className={`${
              animate ? "translate-y-0" : "translate-y-[25px]"
            } duration-1000 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-4 justify-center`}
          >
            {products?.slice(0, 12).map((productData: any) => (
              <div key={productData.id}>
                <Card67
                  item={productData}
                  design={design}
                  store_id={store_id}
                />
              </div>
            ))}
          </div>
        ) : (
          // </ScrollTrigger>
          <div className="text-red-500 text-center py-10 text-xl">
            No Products Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductThirtyNine;
