"use client";
import Card58 from "@/components/card/card58";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "@/components/loader/skeleton";
import ProductSkeleton from "@/components/loader/product-skeleton";

interface Product {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface CategoryProducts {
  [key: string]: Product[];
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
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>(
    {}
  );
  const { data, error, isLoading } = useHeaderSettings(); // Hook managing header settings
  const { category: categories, themeLoading } = useTheme(); // Hook managing theme with loading state
  const [loadingProducts, setLoadingProducts] = useState(true); // Separate loading state for products
  const router = useRouter();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  useEffect(() => {
    async function handleCategory() {
      try {
        setLoadingProducts(true); // Start product loading state
        const productsData: CategoryProducts = {};

        const promises = categories.map(async (c: Category) => {
          const response = await httpReq.post(`getcatproducts?page=1`, {
            id: c.id,
          });
          productsData[c.name] = response?.error ? [] : response?.data?.data;
        });

        await Promise.all(promises);
        setCategoryProducts(productsData);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoadingProducts(false); // End product loading state
      }
    }

    if (categories && categories.length > 0) {
      handleCategory();
    }
  }, [categories]);

  const styleCss = `
    .active-cat-twenty-four {
        color: ${bgColor};
        border-bottom: 2px solid ${bgColor};
    }
    .sec-twenty-nine {
        border-bottom: 2px solid ${bgColor};
    }
  `;

  // Show loading skeleton if theme or header settings are still loading
  if (isLoading || themeLoading || loadingProducts) {
    return (
      <div className="col-span-12 lg:col-span-9">
        <ProductSkeleton />
      </div>
    );
  }

  // Show error message if data fetch fails
  if (error) {
    return (
      <p className="text-center text-red-500">Error loading header settings.</p>
    );
  }

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>

      <div className="my-5 w-full relative flex flex-col lg2:flex-row justify-between lg2:items-center">
        <div className="flex flex-wrap gap-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 justify-center pt-10">
          {categories &&
            categories
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
                        style={{ backgroundColor: bgColor, color: textColor }}
                        className="text-white px-4 py-2 rounded transition duration-300 hover:bg-opacity-75"
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
                        <div key={productData.id}>
                          <Card58 item={productData} />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
        </div>
        <div className="absolute h-[1px] bg-gray-300 w-full top-[39px]"></div>
      </div>
    </div>
  );
};

export default ProductTwentyEight;
