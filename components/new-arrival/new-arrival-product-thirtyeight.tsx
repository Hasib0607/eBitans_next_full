import React from "react";
import Card65 from "../card/card65";

const NewArrivalProductThirtyEight = ({ product, design, store_id }: any) => {
  if (product.length === 0) {
    return null;
  }
  return (
    <div className="py-5 sm:py-10 bg-[#F2F4F8]">
      <div className="container px-5">
        <div className="text-center pb-10">
          <p className="font-bold text-[20px]">New Arrival Products</p>
          <p className="text-[15px] mt-1">Check & Get Your Desired Product!</p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center">
            {product?.slice(0, 12).map((item: any, id: any) => (
              <Card65
                item={item}
                design={design}
                store_id={store_id}
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalProductThirtyEight;
