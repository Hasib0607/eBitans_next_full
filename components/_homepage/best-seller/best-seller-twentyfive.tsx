"use client";

import Card50 from "@/components/card/card50";
import SectionHeadingTwentyFive from "@/components/section-heading/section-heading-twenty-five";
import useHeaderSettings from "@/utils/query/use-header-settings";

const BestSellerTwentyFive = ({ best_sell_product, store_id, design }: any) => {
  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.custom_design || {};
  const bestSellProduct = cDesign?.best_sell_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = bestSellProduct;

  return (
    <div className="sm:px-10 px-5">
      <SectionHeadingTwentyFive title={title} title_color={title_color} />

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-3 gap-4">
        {best_sell_product
          ?.slice(0, 10)
          ?.map((item: any) => (
            <Card50
              item={item}
              key={item?.id}
              store_id={store_id}
              design={design}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSellerTwentyFive;
