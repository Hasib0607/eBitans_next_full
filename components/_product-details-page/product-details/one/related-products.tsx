import React from "react";
import ProductCardOne from "@/components/card/product-card/product-card-one";

const RelatedProducts = ({ product }: any) => {
  return (
    <div className="my-7">
      <div className="my-3">
        <h4 className="text-black font-semibold text-lg">
          {"Related Products"}
        </h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl2:grid-cols-5 xl:grid-cols-6 gap-2">
        {product?.slice(0, 6).map((p: any) => (
          <ProductCardOne key={p?.id} item={p} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
