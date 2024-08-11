import dynamic from "next/dynamic";
const DynamicDefaultProduct = dynamic(
  () => import("@/components/_homepage/product/product-default"),
  {
    ssr: false,
    loading: DefaultProduct,
  }
);
const DynamicProductEleven = dynamic(
  () => import("@/components/_homepage/product/product-eleven"),
  {
    ssr: false,
  }
);
const DynamicProductThirtyThree = dynamic(
  () => import("@/components/_homepage/product/product-thirtythree"),
  {
    ssr: false,
  }
);

import DefaultProduct from "@/components/_homepage/product/product-default";
import { NINETEEN, SEVENTEEN, SIXTEEN, THIRTY, TWENTY } from "../consts";
import ProductFive from "./_homepage/product/product-five";
import ProductFour from "./_homepage/product/product-four";
import ProductFourteen from "./_homepage/product/product-fourteen";
import ProductNineteen from "./_homepage/product/product-nineteen";
import ProductOne from "./_homepage/product/product-one";
import ProductSeventeen from "./_homepage/product/product-seventeen";
import ProductSixteen from "./_homepage/product/product-sixteen";
import ProductThirty from "./_homepage/product/product-thirty";
import ProductThirtyEight from "./_homepage/product/product-thirtyeight";
import ProductThirtyFive from "./_homepage/product/product-thirtyfive";
import ProductThirtyFour from "./_homepage/product/product-thirtyfour";
import ProductThirtyNine from "./_homepage/product/product-thirtynine";
import ProductThirtySeven from "./_homepage/product/product-thirtyseven";
import ProductThirtySix from "./_homepage/product/product-thirtysix";
import ProductThree from "./_homepage/product/product-three";
import ProductTwenty from "./_homepage/product/product-twenty";
import ProductTwentyEight from "./_homepage/product/product-twentyeight";
import ProductTwentyFour from "./_homepage/product/product-twentyfour";
import ProductTwentyNine from "./_homepage/product/product-twentynine";
import ProductTwentyOne from "./_homepage/product/product-twentyone";
import ProductTwentySeven from "./_homepage/product/product-twentyseven";
import ProductTwentySix from "./_homepage/product/product-twentysix";
import ProductTwo from "./_homepage/product/product-two";

const Product = ({
  product,
  best_sell_product,
  feature_product,
  store_id,
  design,
  theme,
  category,
  headerSetting,
}: any) => {
  return (
    <>
      {theme === "default" && <DynamicDefaultProduct product={product} />}
      {theme === "one" && (
        <ProductOne
          product={product}
          best_seller_product={best_sell_product}
          feature_product={feature_product}
          store_id={store_id}
          design={design}
        />
      )}
      {theme === "two" && (
        <ProductTwo
          category={category}
          product={product}
          best_seller_product={best_sell_product}
          feature_product={feature_product}
          store_id={store_id}
          design={design}
        />
      )}
      {theme === "three" && (
        <ProductThree store_id={store_id} design={design} product={product} />
      )}
      {theme === "four" && (
        <ProductFour store_id={store_id} design={design} product={product} />
      )}
      {theme === "five" && (
        <ProductFive store_id={store_id} design={design} product={product} />
      )}
      {theme === "seven" && (
        <ProductTwenty category={category} design={design} />
      )}
      {theme === "ten" && (
        <ProductFive store_id={store_id} design={design} product={product} />
      )}
      {theme === "eleven" && (
        <DynamicProductEleven
          product={product}
          design={design}
          best_sell_product={best_sell_product}
          feature_product={feature_product}
        />
      )}
      {theme === "fourteen" && (
        <ProductFourteen
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === SIXTEEN && (
        <ProductSixteen product={product} design={design} store_id={store_id} />
      )}
      {theme === SEVENTEEN && (
        <ProductSeventeen
          product={product}
          design={design}
          store_id={store_id}
          category={category}
        />
      )}
      {theme === NINETEEN && (
        <ProductNineteen product={product} store_id={store_id} />
      )}
      {theme === TWENTY && (
        <ProductTwenty product={product} category={category} design={design} />
      )}
      {theme === "twentyone" && (
        <ProductTwentyOne
          design={design}
          store_id={store_id}
          headerSetting={headerSetting}
          product={product}
          category={category}
        />
      )}
      {theme === "twentyfour" && (
        <ProductTwentyFour
          design={design}
          store_id={store_id}
          headerSetting={headerSetting}
          product={product}
          category={category}
        />
      )}
      {theme === "twentysix" && (
        <ProductTwentySix
          design={design}
          store_id={store_id}
          category={category}
        />
      )}
      {theme === "twentyseven" && (
        <ProductTwentySeven
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentyeight" && (
        <ProductTwentyEight
          product={product}
          design={design}
          store_id={store_id}
          category={category}
        />
      )}

      {theme === "twentynine" && (
        <ProductTwentyNine
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === THIRTY && (
        <ProductThirty
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyone" && (
        <ProductThirty
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtythree" && (
        <DynamicProductThirtyThree
          product={product}
          design={design}
          best_sell_product={best_sell_product}
          feature_product={feature_product}
        />
      )}
      {theme === "thirtyfour" && (
        <ProductThirtyFour
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyfive" && (
        <ProductThirtyFive
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtysix" && (
        <ProductThirtySix
          design={design}
          store_id={store_id}
          product={product}
        />
      )}
      {theme === "thirtyseven" && (
        <ProductThirtySeven
          design={design}
          store_id={store_id}
          product={product}
        />
      )}
      {theme === "thirtyeight" && (
        <ProductThirtyEight
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtynine" && (
        <ProductThirtyNine
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
    </>
  );
};

export default Product;
