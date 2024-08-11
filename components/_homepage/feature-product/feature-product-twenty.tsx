import React from "react";
import SectionHeadingEighteen from "@/components/section-heading/section-heading-eighteen";
import Card44 from "@/components/card/card44";

const FeatureProductTwenty = ({ feature_product, store_id, design }: any) => {
  // console.log(feature_product);
  return (
    <div className="sm:container px-5 sm:py-10 py-5 relative">
      <SectionHeadingEighteen title={"Featured Products"} subtitle={""} />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        {feature_product?.slice(0, 3)?.map((productData: any) => (
          <Card44
            item={productData}
            key={productData.id}
            store_id={store_id}
            design={design}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureProductTwenty;
