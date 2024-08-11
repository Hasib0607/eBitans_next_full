import React from "react";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import Card5 from "@/components/card/card5";

const ProductFive = ({ product, store_id }: any) => {
  if (product.length === 0) {
    return;
  }
  return (
    <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-white ">
      <div className="container px-5 mx-auto">
        <SectionHeadingFive
          title={"Recently Added"}
          subtitle={"Our products to weekly line up"}
        />
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            {product?.slice(0, 12).map((item: any, id: any) => (
              <Card5 item={item} key={id} store_id={store_id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFive;
