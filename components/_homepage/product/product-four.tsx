"use client";
import ProductCardTwo from "@/components/card/product-card/product-card-two";
import SectionHeading from "@/components/section-heading/section-heading";
import useHeaderSettings from "@/utils/query/use-header-settings";

const ProductFour = ({ product, design, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const { title, title_color } = data?.data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  if (product.length === 0) {
    return;
  }

  return (
    <div className="bg-gray-50 sm:py-10 py-5">
      <div className="sm:container px-5 mx-auto">
        <div className="py-6">
          <SectionHeading
            title_color={title_color || "#000"}
            text={title || "Products"}
            design={design}
          />
        </div>
        <div className="shadow-lg drop-shadow-lg bg-white ">
          <div className="">
            <div className="flex justify-center py-5 sm:py-10  ">
              <div className="flex flex-wrap gap-8 justify-center">
                {product
                  ?.slice(0, 10)
                  .map((item: any) => (
                    <ProductCardTwo
                      item={item}
                      key={item.id}
                      design={design}
                      store_id={store_id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFour;
