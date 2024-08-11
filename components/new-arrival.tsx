import dynamic from "next/dynamic";
const NewArrivalProductNineDynamic = dynamic(
  () => import("@/components/new-arrival/new-arrival-product-nine"),
  {
    ssr: false,
    loading: NewArrivalProductNine,
  }
);

import NewArrivalProductSeven from "@/components/new-arrival/new-arrival-product-seven";
import {
  FOURTEEN,
  NINE,
  SEVENTEEN,
  TEN,
  THIRTY_EIGHT,
  THIRTY_FIVE,
  THIRTY_FOUR,
  THIRTY_NINE,
  THIRTY_ONE,
  THIRTY_SEVEN,
  THIRTY_SIX,
  TWELVE,
  TWENTY_NINE,
  TWENTY_SEVEN,
  TWENTY_THREE,
  TWENTY_TWO,
} from "../consts";
import NewArrivalProductsEight from "./new-arrival/new-arrival-product-eight";
import NewArrivalProductFive from "./new-arrival/new-arrival-product-five";
import NewArrivalProductFourteen from "./new-arrival/new-arrival-product-fourteen";
import NewArrivalProductNine from "./new-arrival/new-arrival-product-nine";
import NewArrivalProductSeventeen from "./new-arrival/new-arrival-product-seventeen";
import NewArrivalProductSix from "./new-arrival/new-arrival-product-six";
import NewArrivalProductTen from "./new-arrival/new-arrival-product-ten";
import NewArrivalProductThirteeen from "./new-arrival/new-arrival-product-thirteen";
import NewArrivalProductThirtyFour from "./new-arrival/new-arrival-product-thirty-four";
import NewArrivalProductThirtyEight from "./new-arrival/new-arrival-product-thirtyeight";
import NewArrivalProductThirtyFive from "./new-arrival/new-arrival-product-thirtyfive";
import NewArrivalProductThirtyNine from "./new-arrival/new-arrival-product-thirtynine";
import NewArrivalProductThirtyOne from "./new-arrival/new-arrival-product-thirtyone";
import NewArrivalProductThirtySeven from "./new-arrival/new-arrival-product-thirtyseven";
import NewArrivalProductThirtySix from "./new-arrival/new-arrival-product-thirtysix";
import NewArrivalProductTwelve from "./new-arrival/new-arrival-product-twelve";
import NewArrivalProductTwentyNine from "./new-arrival/new-arrival-product-twentynine";
import NewArrivalProductTwentySeven from "./new-arrival/new-arrival-product-twentyseven";
import NewArrivalProductTwentyThree from "./new-arrival/new-arrival-product-twentythree";
import NewArrivalProductTwentyTwo from "./new-arrival/new-arrival-product-twentytwo";

const NewArrival = ({ product, theme, design, store_id, category }: any) => {

  return   <NewArrivalProductThirtySeven
  product={product}
  store_id={store_id}
  design={design}
/>


 
  return (
    <>
      {theme === "default" && <NewArrivalProductFive product={product} />}
      {theme === "two" && <NewArrivalProductFive product={product} />}
      {theme === "three" && <NewArrivalProductFive product={product} />}
      {theme === "four" && <NewArrivalProductFive product={product} />}
      {theme === "five" && <NewArrivalProductFive product={product} />}
      {theme === "six" && (
        <NewArrivalProductSix
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "seven" && (
        <NewArrivalProductSeven product={product} store_id={store_id} />
      )}
      {theme === "eight" && (
        <NewArrivalProductsEight product={product} design={design} />
      )}
      {theme === NINE && (
        <NewArrivalProductNineDynamic product={product} design={design} />
      )}
      {theme === TEN && (
        <NewArrivalProductTen
          category={category}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === TWELVE && (
        <NewArrivalProductTwelve
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === "thirteen" && (
        <NewArrivalProductThirteeen
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === FOURTEEN && (
        <NewArrivalProductFourteen
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === SEVENTEEN && (
        <NewArrivalProductSeventeen
          product={product}
          design={design}
          store_id={store_id}
        />
      )}
      {theme === TWENTY_TWO && (
        <NewArrivalProductTwentyTwo product={product} store_id={store_id} />
      )}

      {theme === TWENTY_THREE && (
        <NewArrivalProductTwentyThree
          product={product}
          store_id={store_id}
          design={design}
        />
      )}
      {theme === TWENTY_SEVEN && (
        <NewArrivalProductTwentySeven
          product={product}
          store_id={store_id}
          design={design}
        />
      )}
      {theme === TWENTY_NINE && (
        <NewArrivalProductTwentyNine
          product={product}
          store_id={store_id}
          design={design}
        />
      )}

      {theme === THIRTY_ONE && (
        <NewArrivalProductThirtyOne
          product={product}
          store_id={store_id}
          design={design}
        />
      )}
      {theme === THIRTY_FOUR && (
        <NewArrivalProductThirtyFour
          product={product}
          store_id={store_id}
          design={design}
        />
      )}

      {theme === THIRTY_FIVE && (
        <NewArrivalProductThirtyFive
          product={product}
          store_id={store_id}
          design={design}
        />
      )}

      {theme === THIRTY_SIX && (
        <NewArrivalProductThirtySix
          product={product}
          store_id={store_id}
          design={design}
        />
      )}

      {theme === THIRTY_SEVEN && (
        <NewArrivalProductThirtySeven
          product={product}
          store_id={store_id}
          design={design}
        />
      )}

      {theme === THIRTY_EIGHT && (
        <NewArrivalProductThirtyEight
          product={product}
          store_id={store_id}
          design={design}
        />
      )}

      {theme === THIRTY_NINE && (
        <NewArrivalProductThirtyNine
          product={product}
          store_id={store_id}
          design={design}
        />
      )}
    </>
  );
};

export default NewArrival;
