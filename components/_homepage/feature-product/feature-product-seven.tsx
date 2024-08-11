import React from "react";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import ProductCardThreeSingleCard from "@/components/card/product-card/product-card-three-single";
import ProductCardThreeMultipleCard from "@/components/card/product-card/product-card-three-multiple";
import ProductCardThreeSecondSinglePage from "@/components/card/product-card/product-card-three-second-single";

const FeatureProductSeven = ({ feature_product, store_id }: any) => {
  return (
    <div className="container px-5 bg-white py-8">
      <SectionHeadingSeven title={"Featured Products"} subtitle={""} />
      <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-3 md:gap-3">
        <ProductCardThreeSingleCard
          item={feature_product[0]}
          store_id={store_id}
        />
        <ProductCardThreeMultipleCard
          item1={feature_product[1]}
          item3={feature_product[2]}
          store_id={store_id}
        />
        <ProductCardThreeSecondSinglePage
          item={feature_product[3]}
          store_id={store_id}
        />
      </div>
    </div>
  );
};

export default FeatureProductSeven;
