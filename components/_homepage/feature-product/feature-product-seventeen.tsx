import React from "react";
import image from "./img/17/show_divider_4_69x61.png";
import "./feature-product-seventeen.css";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import Card34 from "@/components/card/card34";

const FeatureProductSeventeen = ({
  feature_product,
  design,
  store_id,
}: any) => {
  const styleCss = `
  
 `;
  return (
    <div className="pt-10">
      <style>{styleCss}</style>
      <div className="flex justify-center ">
        <SectionHeadingSeventeen text={"Popular Cupcake Flavors"} />
      </div>
      <div className="flex justify-center pt-2">
        <img src={image.src} alt="" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-14">
        {feature_product?.slice(0, 8).map((data: any, index: any) => (
          <div
            key={data?.id}
            className={`${
              index === 0
                ? "bg-[#FFEAF4] bg-image1"
                : index === 1
                ? "bg-[#F1E0A6] bg-image2"
                : index === 2
                ? "bg-[#FFFAD9] bg-image1"
                : index === 3
                ? "bg-[#FFE4D5] bg-image2"
                : index === 4
                ? "bg-[#F9F2D6] bg-image2"
                : index === 5
                ? "bg-[#EAE9C3] bg-image1"
                : index === 6
                ? "bg-[#F9F2D6] bg-image2"
                : index === 7
                ? "bg-[#FFE9BC] bg-image1"
                : null
            } h-full w-full `}
          >
            <Card34
              item={data}
              key={data?.key}
              design={design}
              store_id={store_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProductSeventeen;
