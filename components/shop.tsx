import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import Eight from "./_shop-page/shops/eight/eight";
import Eighteen from "./_shop-page/shops/eighteen/eighteen";
import Five from "./_shop-page/shops/five/five";
import Forty from "./_shop-page/shops/forty/forty";
import Four from "./_shop-page/shops/four/four";
import Fourteen from "./_shop-page/shops/fourteen/fourteen";
import Nine from "./_shop-page/shops/nine/nine";
import Nineteen from "./_shop-page/shops/nineteen/nineteen";
import One from "./_shop-page/shops/one/one";
import Seven from "./_shop-page/shops/seven/seven";
import Seventeen from "./_shop-page/shops/seventeen/seventeen";
import Six from "./_shop-page/shops/six/six";
import Sixteen from "./_shop-page/shops/sixteen/sixteen";
import Ten from "./_shop-page/shops/ten/ten";
import Thirteen from "./_shop-page/shops/thirteen/thirteen";
import ThirtyEight from "./_shop-page/shops/thirty-eight/thirty-eight";
import ThirtyFive from "./_shop-page/shops/thirty-five/thirty-five";
import ThirtyFour from "./_shop-page/shops/thirty-four/thirty-four";
import ThirtyNine from "./_shop-page/shops/thirty-nine/thirty-nine";
import ThirtySeven from "./_shop-page/shops/thirty-seven/thirty-seven";
import ThirtySix from "./_shop-page/shops/thirty-six/thirty-six";
import ThirtyThree from "./_shop-page/shops/thirty-three/thirty-three";
import Thirty from "./_shop-page/shops/thirty/thirty";
import Three from "./_shop-page/shops/three/three";
import Twelve from "./_shop-page/shops/twelve/twelve";
import TwentyEight from "./_shop-page/shops/twenty-eight/twenty-eight";
import TwentyFive from "./_shop-page/shops/twenty-five/twenty-five";
import TwentyFour from "./_shop-page/shops/twenty-four/twenty-four";
import TwentyNine from "./_shop-page/shops/twenty-nine/twenty-nine";
import TwentyOne from "./_shop-page/shops/twenty-one/twenty-one";
import TwentySeven from "./_shop-page/shops/twenty-seven/twenty-seven";
import TwentySix from "./_shop-page/shops/twenty-six/twenty-six";
import TwentyThree from "./_shop-page/shops/twenty-three/twenty-three";
import Twenty from "./_shop-page/shops/twenty/twenty";
import Twentytwo from "./_shop-page/shops/twentytwo/twenty-two";
import Two from "./_shop-page/shops/two/two";

const ShopComponent = async () => {
  const url = getUrl();
  const {
    design: { shop_page },
  } = await getSubdomainName(url, "design");

  return <Eight />;
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
