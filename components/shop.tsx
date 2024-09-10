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
// up sesh
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
  const data = await getSubdomainName(url, "design");
  const design = data?.design || {};
  const shop_page = design?.shop_page;

  return (
    <>
      {shop_page === "default" && <One />}
      {shop_page === "one" && <One />}
      {shop_page === "two" && <Two />}
      {shop_page === "three" && <Three />}
      {shop_page === "four" && <Four />}
      {shop_page === "five" && <Five />}
      {shop_page === "six" && <Six />}
      {shop_page === "seven" && <Seven />}
      {shop_page === "eight" && <Eight />}
      {shop_page === "nine" && <Nine />}
      {shop_page === "ten" && <Ten />}
      {shop_page === "eleven" && <Eight />}
      {shop_page === "twelve" && <Twelve />}
      {shop_page === "thirteen" && <Thirteen />}
      {shop_page === "fourteen" && <Fourteen />}
      {shop_page === "sixteen" && <Sixteen />}
      {shop_page === "seventeen" && <Seventeen />}
      {shop_page === "eighteen" && <Eighteen />}
      {shop_page === "nineteen" && <Nineteen />}
      {shop_page === "twenty" && <Twenty />}
      {shop_page === "twentyone" && <TwentyOne />}
      {shop_page === "twentytwo" && <Twentytwo />}
      {shop_page === "twentythree" && <TwentyThree />}
      {shop_page === "twentyfour" && <TwentyFour />}
      {shop_page === "twentyfive" && <TwentyFive />}
      {shop_page === "twentysix" && <TwentySix />}
      {shop_page === "twentyseven" && <TwentySeven />}
      {shop_page === "twentyeight" && <TwentyEight />}
      {shop_page === "twentynine" && <TwentyNine />}
      {shop_page === "thirty" && <Thirty />}
      {shop_page === "thirtyone" && <Thirty />}
      {shop_page === "thirtythree" && <ThirtyThree />}
      {shop_page === "thirtyfour" && <ThirtyFour />}
      {shop_page === "thirtyfive" && <ThirtyFive />}
      {shop_page === "thirtysix" && <ThirtySix />}
      {shop_page === "thirtyseven" && <ThirtySeven />}
      {shop_page === "thirtyeight" && <ThirtyEight />}
      {shop_page === "thirtynine" && <ThirtyNine />}
      {shop_page === "forty" && <Forty />}
    </>
  );
};

export default ShopComponent;
