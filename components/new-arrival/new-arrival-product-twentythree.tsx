import React from "react";
import SectionHeadingTwentyThree from "../section-heading/section-heading-twentythree";
import Card47 from "../card/card47";

const NewArrivalProductTwentyThree = ({ product, design, store_id }: any) => {
  const styleCss = `
    .active-cat {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="">
        <div>
          <SectionHeadingTwentyThree title={"NEW ARRIVALS"} design={design} />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {product?.slice(0, 8).map((productData: any) => (
          <div key={productData.id}>
            {" "}
            <Card47 item={productData} design={design} store_id={store_id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProductTwentyThree;
