"use client";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Card63 from "../card/card63";

const NewArrivalProductThirtySix = ({ product, design, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const cDesign = data?.data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="text-center py-10 flex items-center justify-center">
        <p style={{ color: title_color }} className="text-xl xl:text-2xl">
          {title}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-2.5 lg:gap-0">
        {product
          ?.slice(0, 10)
          .map((productData: any) => (
            <Card63
              item={productData}
              key={productData.id}
              design={design}
              store_id={store_id}
            />
          ))}
      </div>
    </div>
  );
};

export default NewArrivalProductThirtySix;
