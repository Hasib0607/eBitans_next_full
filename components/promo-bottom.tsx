import React from "react";
import PromoBottomDefault from "@/components/promotions-bottom/promo-bottom-default";
import PromoBottomOne from "./promotions-bottom/promo-bottom-one";
import PromoBottomTwo from "./promotions-bottom/promo-bottom-two";
import PromoBottomThree from "./promotions-bottom/promo-bottom-three";
import PromoBottomFour from "./promotions-bottom/promo-bottom-four";
import PromoBottomSix from "./promotions-bottom/promo-bottom-six";
import PromoBottomSeven from "./promotions-bottom/promo-bottom-seven";
import PromoBottomEight from "./promotions-bottom/promo-bottom-eight";
import PromoBottomNine from "./promotions-bottom/promo-bottom-nine";
import PromoBottomTen from "./promotions-bottom/promo-bottom-ten";
import PromoBottomEleven from "./promotions-bottom/promo-bottom-eleven";
import PromoBottomTwelve from "./promotions-bottom/promo-bottom-twelve";
import PromoBottomThirteen from "./promotions-bottom/promo-bottom-thirteen";
import PromoBottomFourteen from "./promotions-bottom/promo-bottom-fourteen";
import PromoBottomFifteen from "./promotions-bottom/promo-bottom-fifteen";
import PromoBottomSixteen from "./promotions-bottom/promo-bottom-sixteen";
import PromoBottomNineteen from "./promotions-bottom/promo-bottom-nineteen";
import PromoBottomTwenty from "./promotions-bottom/promo-bottom-twenty";
import PromoBottomTwentyOne from "./promotions-bottom/promo-twentyone";
import PromoBottomTwentyTwo from "./promotions-bottom/promo-bottom-twentytwo";
import PromoBottomTwentyThree from "./promotions-bottom/promo-bottom-twentythree";
import PromoBottomTwentyFour from "./promotions-bottom/promo-bottom-twentyfour";
import PromoBottomTwentySix from "./promotions-bottom/promo-bottom-twentysix";
import PromoBottomTwentySeven from "./promotions-bottom/promo-bottom-twentyseven";
import PromoBottomTwentyEight from "./promotions-bottom/promo-bottom-twentyeight";
import PromoBottomThirty from "./promotions-bottom/promo-bottom-thirty";
import PromoBottomThirtyOne from "./promotions-bottom/promo-bottom-thirtyone";
import PromoBottomThirtyThree from "./promotions-bottom/promo-bottom-thirtythree";
import PromoBottomThirtyFour from "./promotions-bottom/promo-bottom-thirtyfour";
import PromoBottomThirtyFive from "./promotions-bottom/promo-bottom-thirtyfive";
import PromoBottomThirtySix from "./promotions-bottom/promo-bottom-thirtysix";
import PromoBottomThirtySeven from "./promotions-bottom/promo-bottom-thirtyseven";

const PromoBottom = ({ banner, theme, brand }: any) => {
  return (
    <>
      {theme === "one" && <PromoBottomOne banner={banner} />}
      {theme === "two" && <PromoBottomTwo banner={banner} />}
      {theme === "three" && <PromoBottomThree banner={banner} />}
      {theme === "four" && <PromoBottomFour banner={banner} />}
      {theme === "six" && <PromoBottomSix banner={banner} />}
      {theme === "seven" && <PromoBottomSeven banner={banner} />}
      {theme === "eight" && <PromoBottomEight banner={banner} />}
      {theme === "nine" && <PromoBottomNine banner={banner} />}
      {theme === "ten" && <PromoBottomTen banner={banner} />}
      {theme === "eleven" && <PromoBottomEleven banner={banner} />}
      {theme === "twelve" && <PromoBottomTwelve banner={banner} />}
      {theme === "thirteen" && <PromoBottomThirteen banner={banner} />}
      {theme === "fourteen" && <PromoBottomFourteen banner={banner} />}
      {theme === "fifteen" && <PromoBottomFifteen banner={banner} />}
      {theme === "sixteen" && <PromoBottomSixteen banner={banner} />}
      {theme === "nineteen" && <PromoBottomNineteen banner={banner} />}
      {theme === "twenty" && <PromoBottomTwenty banner={banner} />}
      {theme === "twentyone" && <PromoBottomTwentyOne banner={banner} />}
      {theme === "twentytwo" && <PromoBottomTwentyTwo banner={banner} />}
      {theme === "twentythree" && <PromoBottomTwentyThree banner={banner} />}
      {theme === "twentyfour" && <PromoBottomTwentyFour banner={banner} />}
      {theme === "twentysix" && (
        <PromoBottomTwentySix banner={banner} brand={brand} />
      )}
      {theme === "twentyseven" && <PromoBottomTwentySeven banner={banner} />}
      {theme === "twentyeight" && <PromoBottomTwentyEight banner={banner} />}
      {theme === "twentynine" && <PromoBottomTwentySeven banner={banner} />}
      {theme === "thirty" && <PromoBottomThirty banner={banner} />}
      {theme === "thirtyone" && <PromoBottomThirtyOne banner={banner} />}
      {theme === "thirtytwo" && <PromoBottomThirtyOne banner={banner} />}
      {theme === "thirtythree" && <PromoBottomThirtyThree banner={banner} />}
      {theme === "thirtyfour" && <PromoBottomThirtyFour banner={banner} />}
      {theme === "thirtyfive" && <PromoBottomThirtyFive banner={banner} />}
      {theme === "thirtysix" && <PromoBottomThirtySix banner={banner} />}
      {theme === "thirtyseven" && <PromoBottomThirtySeven banner={banner} />}
      {theme === "thirtynine" && <PromoBottomThirtySeven banner={banner} />}
    </>
  );

  // <PromoBottomDefault banner={banner} />;
};

export default PromoBottom;
