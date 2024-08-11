"use client";
import DefaultPromo from "@/components/promotions/promo-default";
import PromoOne from "./promotions/promo-one";
import PromoTwo from "./promotions/promo-two";
import PromoThree from "./promotions/promo-three";
import PromoFour from "./promotions/promo-four";
import PromoFive from "./promotions/promo-five";
import PromoSix from "./promotions/promo-six";
import PromoSeven from "./promotions/promo-seven";
import PromoTen from "./promotions/promo-ten";
import {
  EIGHT,
  EIGHTEEN,
  ELEVEN,
  FOURTEEN,
  NINE,
  NINETEEN,
  SIXTEEN,
  THIRTEEN,
  THIRTY,
  THIRTY_EIGHT,
  THIRTY_FIVE,
  THIRTY_FOUR,
  THIRTY_NINE,
  THIRTY_ONE,
  THIRTY_SEVEN,
  THIRTY_SIX,
  THIRTY_THREE,
  TWELVE,
  TWENTY,
  TWENTY_EIGHT,
  TWENTY_FIVE,
  TWENTY_FOUR,
  TWENTY_NINE,
  TWENTY_ONE,
  TWENTY_SEVEN,
  TWENTY_SIX,
  TWENTY_THREE,
  TWENTY_TWO,
} from "../consts";
import PromoEight from "./promotions/promo-eight";
import PromoNine from "./promotions/promo-nine";
import PromoEleven from "./promotions/promo-eleven";
import PromoTwelve from "./promotions/promo-twelve";
import PromoThirteen from "./promotions/promo-thirteen";
import PromoFourteen from "./promotions/promo-fourteen";
import PromoSixteen from "./promotions/promo-sixteen";
import PromoEighteen from "./promotions/promo-eighteen";
import PromoNineteen from "./promotions/promo-nineteen";
import PromoTwenty from "./promotions/promo-twenty";
import PromoTwentyOne from "./promotions/promo-tweentyone";
import PromoTwentyTwo from "./promotions/promo-twentytwo";
import PromoTwentyThree from "./promotions/promo-twentythree";
import PromoTwentyFour from "./promotions/promo-twentyfour";
import PromoTwentyFive from "./promotions/promo-twentyfive";
import PromoTwentySix from "./promotions/promo-twentysix";
import PromoTwentySeven from "./promotions/promo-twentyseven";
import PromoTwentyEight from "./promotions/promo-twenty-eight";
import PromoTwentyNine from "./promotions/promo-twentynine";
import PromoThirty from "./promotions/promo-thirty";
import PromoThirtyOne from "./promotions/promo-thirtyone";
import PromoThirtyThree from "./promotions/promo-thirtythree";
import PromoThirtyFour from "./promotions/promo-thirtyfour";
import PromoThirtyFive from "./promotions/promo-thirtyfive";
import PromoThirtySix from "./promotions/promo-thirtysix";
import PromoThirtySeven from "./promotions/promo-thirtyseven";
import PromoThirtyEight from "./promotions/promo-thirtyeight";
import PromoThirtyNine from "./promotions/promo-thirtynine";

const Promo = ({ banner, theme, design, store_id }: any) => {
  return (
    <>
      {theme === "default" && <DefaultPromo banner={banner} />}
      {theme === "one" && <PromoOne banner={banner} />}
      {theme === "two" && <PromoTwo banner={banner} />}
      {theme === "three" && <PromoThree banner={banner} />}
      {theme === "four" && <PromoFour design={design} banner={banner} />}
      {theme === "five" && <PromoFive banner={banner} />}
      {theme === "six" && <PromoSix banner={banner} />}
      {theme === "seven" && <PromoSeven banner={banner} />}
      {theme === EIGHT && <PromoEight banner={banner} />}
      {theme === NINE && <PromoNine banner={banner} />}
      {theme === "ten" && <PromoTen banner={banner} />}
      {theme === ELEVEN && <PromoEleven design={design} banner={banner} />}
      {theme === TWELVE && <PromoTwelve banner={banner} />}
      {theme === THIRTEEN && <PromoThirteen banner={banner} />}
      {theme === FOURTEEN && <PromoFourteen banner={banner} />}
      {theme === SIXTEEN && <PromoSixteen banner={banner} />}
      {theme === EIGHTEEN && <PromoEighteen banner={banner} />}
      {theme === NINETEEN && <PromoNineteen banner={banner} />}
      {theme === TWENTY && <PromoTwenty banner={banner} />}
      {theme === TWENTY_ONE && <PromoTwentyOne banner={banner} />}
      {theme === TWENTY_TWO && <PromoTwentyTwo banner={banner} />}
      {theme === TWENTY_THREE && <PromoTwentyThree banner={banner} />}
      {theme === TWENTY_FOUR && <PromoTwentyFour banner={banner} />}
      {theme === TWENTY_FIVE && (
        <PromoTwentyFive store_id={store_id} banner={banner} />
      )}
      {theme === TWENTY_SIX && <PromoTwentySix banner={banner} />}
      {theme === TWENTY_SEVEN && <PromoTwentySeven banner={banner} />}
      {theme === TWENTY_EIGHT && <PromoTwentyEight banner={banner} />}
      {theme === TWENTY_NINE && <PromoTwentyNine banner={banner} />}
      {theme === THIRTY && <PromoThirty banner={banner} />}
      {theme === THIRTY_ONE && <PromoThirtyOne banner={banner} />}
      {theme === THIRTY_THREE && <PromoThirtyThree banner={banner} />}
      {theme === THIRTY_FOUR && <PromoThirtyFour banner={banner} />}
      {theme === THIRTY_FIVE && (
        <PromoThirtyFive banner={banner} design={design} />
      )}
      {theme === THIRTY_SIX && <PromoThirtySix banner={banner} />}
      {theme === THIRTY_SEVEN && <PromoThirtySeven banner={banner} />}
      {theme === THIRTY_EIGHT && <PromoThirtyEight banner={banner} />}
      {theme === THIRTY_NINE && <PromoThirtyNine banner={banner} />}
    </>
  );
};

export default Promo;
