import FeatureProductFive from "@/components/_homepage/feature-product/feature-product-five";
import FeatureProductEighteen from "./_homepage/feature-product/feature-product-eighteen";
import FeatureProductFour from "./_homepage/feature-product/feature-product-four";
import FeatureProductNine from "./_homepage/feature-product/feature-product-nine";
import FeatureProductNineteen from "./_homepage/feature-product/feature-product-nineteen";
import FeatureProductSeven from "./_homepage/feature-product/feature-product-seven";
import FeatureProductSeventeen from "./_homepage/feature-product/feature-product-seventeen";
import FeatureProductSix from "./_homepage/feature-product/feature-product-six";
import FeatureProductSixteen from "./_homepage/feature-product/feature-product-sixteen";
import FeatureProductThirteen from "./_homepage/feature-product/feature-product-thirteen";
import FeatureProductThirty from "./_homepage/feature-product/feature-product-thirty";
import FeatureProductThirtyEight from "./_homepage/feature-product/feature-product-thirtyeight";
import FeatureProductThirtyFive from "./_homepage/feature-product/feature-product-thirtyfive";
import FeatureProductThirtyFour from "./_homepage/feature-product/feature-product-thirtyfour";
import FeatureProductThirtyNine from "./_homepage/feature-product/feature-product-thirtynine";
import FeatureProductThirtySeven from "./_homepage/feature-product/feature-product-thirtyseven";
import FeatureProductThirtySix from "./_homepage/feature-product/feature-product-thirtysix";
import FeatureProductThirtyThree from "./_homepage/feature-product/feature-product-thirtythree";
import FeatureProductTwelve from "./_homepage/feature-product/feature-product-twelve";
import FeatureProductTwenty from "./_homepage/feature-product/feature-product-twenty";
import FeatureProductTwentyEight from "./_homepage/feature-product/feature-product-twentyeight";
import FeatureProductTwentyFive from "./_homepage/feature-product/feature-product-twentyfive";
import FeatureProductTwentyFour from "./_homepage/feature-product/feature-product-twentyfour";
import FeatureProductTwentyNine from "./_homepage/feature-product/feature-product-twentynine";
import FeatureProductTwentyOne from "./_homepage/feature-product/feature-product-twentyone";
import FeatureProductTwentySeven from "./_homepage/feature-product/feature-product-twentyseven";
import FeatureProductTwentySix from "./_homepage/feature-product/feature-product-twentysix";
import FeatureProductTwentyThree from "./_homepage/feature-product/feature-product-twentythree";
import FeatureProductTwentyTwo from "./_homepage/feature-product/feature-product-twentytwo";
import FeatureProductEleven from "./_homepage/feature-product/feature-product-eleven";

const FeatureProduct = ({
  feature_product,
  theme,
  design,
  store_id,
  product,
  banner,
}: any) => {
  return (
    <>
      {theme === "two" && (
        <FeatureProductFour
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "four" && (
        <FeatureProductFour
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "five" && (
        <FeatureProductFive feature_product={feature_product} />
      )}
      {theme === "six" && (
        <FeatureProductSix product={product} store_id={store_id} />
      )}
      {theme === "seven" && (
        <FeatureProductSeven
          store_id={store_id}
          feature_product={feature_product}
        />
      )}
      {theme === "nine" && (
        <FeatureProductNine feature_product={feature_product} design={design} />
      )}
      {theme === "eleven" && (
        <FeatureProductEleven
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twelve" && (
        <FeatureProductTwelve
          feature_product={feature_product}
          design={design}
        />
      )}
      {theme === "thirteen" && (
        <FeatureProductThirteen
          feature_product={feature_product}
          store_id={store_id}
        />
      )}
      {theme === "sixteen" && (
        <FeatureProductSixteen
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}

      {theme === "seventeen" && (
        <FeatureProductSeventeen
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "eighteen" && (
        <FeatureProductEighteen
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "nineteen" && (
        <FeatureProductNineteen
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twenty" && (
        <FeatureProductTwenty
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentyone" && (
        <FeatureProductTwentyOne
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentytwo" && <FeatureProductTwentyTwo product={product} />}
      {theme === "twentythree" && (
        <FeatureProductTwentyThree
          feature_product={feature_product}
          design={design}
        />
      )}
      {theme === "twentyfour" && (
        <FeatureProductTwentyFour
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentyfive" && (
        <FeatureProductTwentyFive
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentysix" && (
        <FeatureProductTwentySix
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentyseven" && (
        <FeatureProductTwentySeven
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentyeight" && (
        <FeatureProductTwentyEight
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "twentynine" && (
        <FeatureProductTwentyNine
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirty" && (
        <FeatureProductThirty
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyone" && (
        <FeatureProductThirty
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtythree" && (
        <FeatureProductThirtyThree
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyfour" && (
        <FeatureProductThirtyFour
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyfive" && (
        <FeatureProductThirtyFive
          banner={banner}
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtysix" && (
        <FeatureProductThirtySix
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyseven" && (
        <FeatureProductThirtySeven
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtyeight" && (
        <FeatureProductThirtyEight
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirtynine" && (
        <FeatureProductThirtyNine
          feature_product={feature_product}
          design={design}
          store_id={store_id}
        />
      )}
    </>
  );
};

export default FeatureProduct;
