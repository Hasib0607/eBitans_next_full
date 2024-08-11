"use client";
import Card16 from "@/components/card/card16";
import SectionHeadingTen from "@/components/section-heading/section-heading-ten";
import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";

const ProductTwo = ({ category, design, store_id }: any) => {
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
      color:  red;
    }
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
      <style>{styleCss}</style>
      <div className="">
        <SectionHeadingTen
          title={"Our Products"}
          subtitle={"Add our products to your weekly lineup"}
        />
        <div className="flex flex-wrap gap-y-3 gap-x-5 text-lg justify-center pb-8 lg:cursor-pointer uppercase">
          {category?.slice(0, 3).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${active === index ? "active-cat" : ""} `}
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
          <div className="grid grid-cols-2 xl:grid-cols-5 xl3:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-5">
            {products?.slice(0, 10).map((productData: any) => (
              <Card16
                item={productData}
                key={productData?.id}
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

export default ProductTwo;
