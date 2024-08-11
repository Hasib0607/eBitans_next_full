"use client";
import useTheme from "@/hooks/use-theme";
import dynamic from "next/dynamic";
import {
  EIGHTEEN,
  FOURTEEN,
  NINETEEN,
  SEVENTEEN,
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
import FooterEight from "./footers/footer-eight";
import FooterEighteen from "./footers/footer-eighteen";
import FooterEleven from "./footers/footer-eleven";
import FooterFour from "./footers/footer-four";
import FooterFourteen from "./footers/footer-fourteen";
import FooterNineteen from "./footers/footer-nineteen";
import FooterOne from "./footers/footer-one";
import FooterSeven from "./footers/footer-seven";
import FooterSeventeen from "./footers/footer-seventeen";
import FooterSix from "./footers/footer-six";
import FooterSixteen from "./footers/footer-sixteen";
import FooterThirteen from "./footers/footer-thirteen";
import FooterThirty from "./footers/footer-thirty";
import FooterThirtyFive from "./footers/footer-thirtyfive";
import FooterThirtyFour from "./footers/footer-thirtyfour";
import FooterThirtySeven from "./footers/footer-thirtyseven";
import FooterThirtySix from "./footers/footer-thirtysix";
import FooterThree from "./footers/footer-three";
import FooterTwenty from "./footers/footer-twenty";
import FooterTwentyFive from "./footers/footer-twentyfive";
import FooterTwentyNine from "./footers/footer-twentynine";
import FooterTwentyOne from "./footers/footer-twentyone";
import FooterTwentySeven from "./footers/footer-twentyseven";
import FooterTwentySix from "./footers/footer-twentysix";
import FooterTwentyThree from "./footers/footer-twentythree";
import FooterTwentyTwo from "./footers/footer-twentytwo";
import FooterTwo from "./footers/footer-two";
const DynamicFooterDefault = dynamic(
  () => import("@/components/footers/footer-default"),
  {
    ssr: false,
  }
);
const DynamicFooterFive = dynamic(
  () => import("@/components/footers/footer-five"),
  {
    ssr: false,
  }
);

const DynamicFooterNine = dynamic(
  () => import("@/components/footers/footer-nine"),
  {
    ssr: false,
  }
);
const DynamicFooterTwelve = dynamic(
  () => import("@/components/footers/footer-twelve"),
  {
    ssr: false,
  }
);
const DynamicFooterTwentyFour = dynamic(
  () => import("@/components/footers/footer-twentyfour"),
  {
    ssr: false,
  }
);

const DynamicFooterThirtyEight = dynamic(
  () => import("@/components/footers/footer-thirtyeight"),
  {
    ssr: false,
  }
);

const DynamicFooterForty = dynamic(
  () => import("@/components/footers/footer-forty"),
  {
    ssr: false,
  }
);

const Footer = () => {
  const { headerSetting, category, design, store_id, menu, page } = useTheme();

  return (
    <>
      {design?.footer === "default" && (
        <DynamicFooterDefault
          headerSetting={headerSetting}
          category={category}
        />
      )}

      {design?.footer === "one" && (
        <FooterOne
          headerSetting={headerSetting}
          category={category}
          design={design}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === "two" && (
        <FooterTwo
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "three" && (
        <FooterThree
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}
      {design?.footer === "four" && (
        <FooterFour
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "five" && (
        <DynamicFooterFive
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "six" && (
        <FooterSix
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "seven" && (
        <FooterSeven
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "eight" && (
        <FooterEight
          category={category}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "nine" && (
        <DynamicFooterNine
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "ten" && (
        <DynamicFooterNine
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "eleven" && (
        <FooterEleven
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === "twelve" && (
        <DynamicFooterTwelve
          category={category}
          design={design}
          page={page}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === THIRTEEN && (
        <FooterThirteen
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
        />
      )}

      {design?.footer === FOURTEEN && (
        <FooterFourteen
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === SIXTEEN && (
        <FooterSixteen
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === SEVENTEEN && (
        <FooterSeventeen
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === EIGHTEEN && (
        <FooterEighteen
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === NINETEEN && (
        <FooterNineteen
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === TWENTY && (
        <FooterTwenty
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === TWENTY_ONE && (
        <FooterTwentyOne
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === TWENTY_TWO && (
        <FooterTwentyTwo
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === TWENTY_THREE && (
        <FooterTwentyThree
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === TWENTY_FOUR && (
        <DynamicFooterTwentyFour
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === TWENTY_FIVE && (
        <FooterTwentyFive
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === TWENTY_SIX && (
        <FooterTwentySix
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === TWENTY_SEVEN && (
        <FooterTwentySeven headerSetting={headerSetting} />
      )}
      {design?.footer === TWENTY_EIGHT && (
        <FooterTwentySeven headerSetting={headerSetting} />
      )}
      {design?.footer === TWENTY_NINE && (
        <FooterTwentyNine
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY && (
        <FooterThirty
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_ONE && (
        <FooterThirty
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_THREE && (
        <FooterThirty
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_FOUR && (
        <FooterThirtyFour
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_FIVE && (
        <FooterThirtyFive
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_SIX && (
        <FooterThirtySix
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
      {design?.footer === THIRTY_SEVEN && (
        <FooterThirtySeven
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_EIGHT && (
        <DynamicFooterThirtyEight
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === THIRTY_NINE && (
        <DynamicFooterThirtyEight
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}

      {design?.footer === "forty" && (
        <DynamicFooterForty
          design={design}
          category={category}
          headerSetting={headerSetting}
          store_id={store_id}
          menu={menu}
          page={page}
        />
      )}
    </>
  );
};

export default Footer;
