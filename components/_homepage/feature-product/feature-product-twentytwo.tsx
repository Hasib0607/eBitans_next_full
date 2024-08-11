import React from "react";
import ProductCardFive from "@/components/card/product-card/product-card-five";
import ProductCardSix from "@/components/card/product-card/product-card-six";
import ProductCardSeven from "@/components/card/product-card/product-card-seven";
import ProductCardEight from "@/components/card/product-card/product-card-eight";
import ProductCardNine from "@/components/card/product-card/product-card-nine";

const FeatureProductTwentyTwo = ({ product }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="grid lg:grid-cols-10 grid-cols-1 ">
        <div className="flex justify-center lg:justify-end lg:col-span-2 col-span-4 lg:mt-[120px] mb-10 pr-4">
          <div>
            <h1 className="text-3xl font-semibold">copy the look</h1>
            <div className="flex justify-end">
              <div
                className="w-[30%] mt-3"
                style={{ border: "2px solid black" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 col-span-4">
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
            <div className="lg:col-span-2 col-span-4 gap-4">
              <ProductCardFive item={product[0]} />
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <ProductCardSix item={product[1]} />
                <ProductCardSeven item={product[2]} />
              </div>
            </div>

            <div className="lg:col-span-1 col-span-4 gap-4">
              <ProductCardEight item={product[3]} />
              <ProductCardNine item={product[4]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductTwentyTwo;
