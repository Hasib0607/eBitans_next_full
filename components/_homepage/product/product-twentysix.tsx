"use client";
import Card56 from "@/components/card/card56";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductTwentySix = ({ category, design, store_id }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(0);

  const router = useRouter();

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
    .active-cat-ps {
        color:  ${design?.header_color};
    }
 `;

  const { title, title_color } = data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-5">
        <div className="pb-2 md:pb-0 text-2xl">
          <p style={{ color: title_color }}>{title || "POPULAR PRODUCTS"}</p>
        </div>
        <div className="flex flex-wrap gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600">
          {category?.slice(0, 5).map((item: any, index: any) => (
            <div key={item.id}>
              <li
                className={`${
                  active === index ? "active-cat-ps" : ""
                } px-2 py-1 rounded`}
                onClick={() => {
                  setActive(index);
                  setId(index);
                }}
              >
                {item.name}
              </li>
            </div>
          ))}
        </div>
      </div>
      {products?.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 xl3:grid-cols-6 gap-2 sm:gap-5">
            {products?.slice(0, 8).map((productData: any) => (
              <div key={productData.id}>
                <Card56
                  item={productData}
                  design={design}
                  store_id={store_id}
                />
              </div>
            ))}
          </div>
          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push("/category")}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        </>
      ) : (
        <div className="text-red-500 text-center py-10 text-4xl">
          No Products Available
        </div>
      )}
    </div>
  );
};

export default ProductTwentySix;
