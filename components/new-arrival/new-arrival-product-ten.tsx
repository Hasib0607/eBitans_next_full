"use client";
import useHeaderSettings from "@/utils/query/use-header-settings";
import axios from "axios";
import { useEffect, useState } from "react";
import Card15 from "../card/card15";
import SectionHeadingTen from "../section-heading/section-heading-ten";

const NewArrivalProductTen = ({ category, design, store_id }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState<any>([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function handleCategory() {
      try {
        const response: any = await axios.post<any>(
          process.env.NEXT_PUBLIC_API_URL + `getcatproducts`,
          {
            id: category[id].id,
          }
        );
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

  // const bgColor = design?.header_color;

  const styleCss = `
    .active-cat {
      color:  red;
  }

    `;

  const { data, error } = useHeaderSettings();
  const cDesign = data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <SectionHeadingTen
        title={title || "New Arrivals"}
        subtitle={""}
        title_color={title_color || "#000"}
      />

      <div className="flex gap-5 text-lg justify-center pb-8 lg:cursor-pointer uppercase">
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

      {products?.data?.length > 0 ? (
        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-4">
          {products?.data?.slice(0, 10).map((productData: any) => {
            return (
              <Card15
                item={productData}
                design={design}
                store_id={store_id}
                key={productData?.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-red-500 text-center py-10 text-xl">
          No Products Available
        </div>
      )}
    </div>
  );
};

export default NewArrivalProductTen;
