import React from "react";
import Seven from "@/components/_shop-page/shops/seven/seven";
import Eight from "@/components/_shop-page/shops/eight/eight";
import One from "@/components/_shop-page/shops/one/one";
import Two from "@/components/_shop-page/shops/two/two";
import Three from "@/components/_shop-page/shops/three/three";
import Four from "@/components/_shop-page/shops/four/four";
import Five from "@/components/_shop-page/shops/five/five";
import Six from "@/components/_shop-page/shops/six/six";
import Nine from "@/components/_shop-page/shops/nine/nine";
import Ten from "@/components/_shop-page/shops/ten/ten";
import Twelve from "@/components/_shop-page/shops/twelve/twelve";
import Thirteen from "@/components/_shop-page/shops/thirteen/thirteen";
import Fourteen from "@/components/_shop-page/shops/fourteen/fourteen";
import Sixteen from "@/components/_shop-page/shops/sixteen/sixteen";
import Seventeen from "@/components/_shop-page/shops/seventeen/seventeen";
import Eighteen from "@/components/_shop-page/shops/eighteen/eighteen";
import Nineteen from "@/components/_shop-page/shops/nineteen/nineteen";
import Twenty from "@/components/_shop-page/shops/twenty/twenty";
import TwentyOne from "@/components/_shop-page/shops/twenty-one/twenty-one";
import Twentytwo from "@/components/_shop-page/shops/twentytwo/twenty-two";
import TwentyThree from "@/components/_shop-page/shops/twenty-three/twenty-three";
import TwentyFour from "@/components/_shop-page/shops/twenty-four/twenty-four";
import TwentyFive from "@/components/_shop-page/shops/twenty-five/twenty-five";
import TwentySix from "@/components/_shop-page/shops/twenty-six/twenty-six";
import TwentySeven from "@/components/_shop-page/shops/twenty-seven/twenty-seven";
import TwentyEight from "@/components/_shop-page/shops/twenty-eight/twenty-eight";
import TwentyNine from "@/components/_shop-page/shops/twenty-nine/twenty-nine";
import Thirty from "@/components/_shop-page/shops/thirty/thirty";
import ThirtyThree from "@/components/_shop-page/shops/thirty-three/thirty-three";
import ThirtyFour from "@/components/_shop-page/shops/thirty-four/thirty-four";
import ThirtyFive from "@/components/_shop-page/shops/thirty-five/thirty-five";
import ThirtySix from "@/components/_shop-page/shops/thirty-six/thirty-six";
import ThirtySeven from "@/components/_shop-page/shops/thirty-seven/thirty-seven";
import ThirtyEight from "@/components/_shop-page/shops/thirty-eight/thirty-eight";
import ThirtyNine from "@/components/_shop-page/shops/thirty-nine/thirty-nine";
import Forty from "@/components/_shop-page/shops/forty/forty";
import getUrl from "@/utils/get-url";
import { getSubdomainName } from "@/lib";

const ShopComponent = async () => {
  const url = getUrl();
  const {
    design: { shop_page },
  } = await getSubdomainName(url, "design");

  return (
    <>
      {shop_page === "default" && <One data={{}} />}
      {shop_page === "one" && <One data={{}} />}
      {shop_page === "two" && <Two data={{}} />}
      {shop_page === "three" && <Three data={{}} />}
      {shop_page === "four" && <Four data={{}} />}
      {shop_page === "five" && <Five data={{}} />}
      {shop_page === "six" && <Six data={{}} />}
      {shop_page === "seven" && <Seven />}
      {shop_page === "eight" && <Eight />}
      {shop_page === "nine" && <Nine data={{}} />}
      {shop_page === "ten" && <Ten data={{}} />}
      {shop_page === "eleven" && <Eight />}
      {shop_page === "twelve" && <Twelve data={{}} />}
      {shop_page === "thirteen" && <Thirteen data={{}} />}
      {shop_page === "fourteen" && <Fourteen data={{}} />}
      {shop_page === "sixteen" && <Sixteen data={{}} />}
      {shop_page === "seventeen" && <Seventeen data={{}} />}
      {shop_page === "eighteen" && <Eighteen data={{}} />}
      {shop_page === "nineteen" && <Nineteen data={{}} />}
      {shop_page === "twenty" && <Twenty data={{}} />}
      {shop_page === "twentyone" && <TwentyOne data={{}} />}
      {shop_page === "twentytwo" && <Twentytwo data={{}} />}
      {shop_page === "twentythree" && <TwentyThree data={{}} />}
      {shop_page === "twentyfour" && <TwentyFour data={{}} />}
      {shop_page === "twentyfive" && <TwentyFive data={{}} />}
      {shop_page === "twentysix" && <TwentySix data={{}} />}
      {shop_page === "twentyseven" && <TwentySeven data={{}} />}
      {shop_page === "twentyeight" && <TwentyEight data={{}} />}
      {shop_page === "twentynine" && <TwentyNine data={{}} />}
      {shop_page === "thirty" && <Thirty data={{}} />}
      {shop_page === "thirtyone" && <Thirty data={{}} />}
      {shop_page === "thirtythree" && <ThirtyThree data={{}} />}
      {shop_page === "thirtyfour" && <ThirtyFour data={{}} />}
      {shop_page === "thirtyfive" && <ThirtyFive data={{}} />}
      {shop_page === "thirtysix" && <ThirtySix data={{}} />}
      {shop_page === "thirtyseven" && <ThirtySeven data={{}} />}
      {shop_page === "thirtyeight" && <ThirtyEight data={{}} />}
      {shop_page === "thirtynine" && <ThirtyNine data={{}} />}
      {shop_page === "forty" && <Forty data={{}} />}
    </>
  );
};

export default ShopComponent;
