"use client";

import Card56 from "@/components/card/card56";
import Card58 from "@/components/card/card58";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number; // or whatever properties your product has
  name: string;
  // Add more fields as needed
}

interface Category {
  id: number;
  name: string;
}

interface CategoryProducts {
  [key: string]: Product[]; // The key is the category name, and the value is an array of products
}

const ProductTwentyEight = ({
  category,
  design,
  store_id,
  product,
}: {
  category: any;
  design: any;
  store_id: any;
  product: any;
}) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState(0);

  const { data, error } = useHeaderSettings();
  const { category: categories }: { category: Category[] } = useTheme();
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>(
    {}
  ); // Type defined here

  const router = useRouter();

  useEffect(() => {
    async function handleCategory() {
      try {
        const productsData: CategoryProducts = {}; // Type defined here

        const promises = categories.map(async (c: Category) => {
          // Using Category type
          const response = await httpReq.post(`getcatproducts?page=1`, {
            id: c.id,
          });

          productsData[c.name] = response?.error ? [] : response?.data?.data;
        });

        await Promise.all(promises);
        setCategoryProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    }

    handleCategory();
  }, [categories]);

  const styleCss = `
    .active-cat-twenty-four {
        color: ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .sec-twenty-nine {
        border-bottom: 2px solid ${design?.header_color};
    }
  `;

  const { title, title_color, button_color } =
    data?.data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>

      <div className="my-5 w-full relative flex flex-col lg2:flex-row justify-between lg2:items-center">
        <div className=" flex flex-wrap gap-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 justify-center pt-10">
          {categories
            .filter(
              (category: Category) =>
                categoryProducts[category?.name]?.length > 0
            )
            .map((category: Category) => (
              <div key={category.id} className="mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="py-5 md:py-10 font-semibold text-lg">
                    {category.name}
                  </h2>
                  <div>
                    <button
                      style={{ backgroundColor: button_color }}
                      className=" text-white px-4 py-2 rounded transition duration-300 hover:bg-opacity-75"
                      onClick={() => router.push(`/category/${category?.id}`)}
                    >
                      Load More
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 xl3:grid-cols-6 gap-2 sm:gap-5">
                  {categoryProducts[category?.name]
                    ?.slice(0, 8)
                    ?.map((productData: Product) => (
                      <div key={productData.name}>
                        <Card56 item={productData} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <div className="absolute h-[1px] bg-gray-300 w-full top-[39px]"></div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {products.slice(0, 8).map((productData: Product) => (
            <div key={productData.id}>
              <Card58 item={productData} design={design} store_id={store_id} />
            </div>
          ))}
        </div>
      ) : (
        // <div className="text-red-500 text-center py-10 text-4xl">
        //   No Products Available
        // </div>
        null
      )}
    </div>
  );
};

export default ProductTwentyEight;
