import React from "react";
import SectionHeadingSeven from "../section-heading/section-heading-seven";
import Card17 from "../card/card17";

const NewArrivalProductTwelve = ({ product, design, store_id }: any) => {
  let arrayItem = product.slice(0, 10);
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <SectionHeadingSeven title={"New Arrivals"} subtitle={""} />
      <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 lg2:grid-cols-4 md:grid-cols-3 gap-5 ">
        {arrayItem?.map((productData: any) => (
          <Card17
            item={productData}
            design={design}
            store_id={store_id}
            key={productData.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProductTwelve;
