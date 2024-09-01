import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import CategoryEight from "./_category-page/category/category-eight-old";
import CategoryEighteen from "./_category-page/category/category-eighteen";
import CategoryEleven from "./_category-page/category/category-eleven";
import CategoryFive from "./_category-page/category/category-five";
import CategoryForty from "./_category-page/category/category-forty";
import CategoryFour from "./_category-page/category/category-four";
import CategoryFourteen from "./_category-page/category/category-fourteen";
import CategoryNine from "./_category-page/category/category-nine";
import CategoryNineteen from "./_category-page/category/category-nineteen";
import CategoryOne from "./_category-page/category/category-one";
import CategorySevenNew from "./_category-page/category/category-seven-new";
import CategorySeventeen from "./_category-page/category/category-seventeen";
import CategorySix from "./_category-page/category/category-six";
import CategorySixteen from "./_category-page/category/category-sixteen";
import CategoryTen from "./_category-page/category/category-ten";
import CategoryThirteen from "./_category-page/category/category-thirteen";
import CategoryThirty from "./_category-page/category/category-thirty";
import CategoryThirtyEight from "./_category-page/category/category-thirtyeight";
import CategoryThirtyFive from "./_category-page/category/category-thirtyfive";
import CategoryThirtyFour from "./_category-page/category/category-thirtyfour";
import CategoryThirtyNine from "./_category-page/category/category-thirtynine";
import CategoryThirtySeven from "./_category-page/category/category-thirtyseven";
import CategoryThirtySix from "./_category-page/category/category-thirtysix";
import CategoryThirtyThree from "./_category-page/category/category-thirtythree";
import CategoryThree from "./_category-page/category/category-three";
import CategoryTwelve from "./_category-page/category/category-twelve";
import CategoryTwenty from "./_category-page/category/category-twenty";
import CategoryTwentyEight from "./_category-page/category/category-twentyeight";
import CategoryTwentyFive from "./_category-page/category/category-twentyfive";
import CategoryTwentyFour from "./_category-page/category/category-twentyfour";
import CategoryTwentyNine from "./_category-page/category/category-twentynine";
import CategoryTwentyOne from "./_category-page/category/category-twentyone";
import CategoryTwentySeven from "./_category-page/category/category-twentyseven";
import CategoryTwentySix from "./_category-page/category/category-twentysix";
import CategoryTwentyThree from "./_category-page/category/category-twentythree";
import CategoryTwentyTwo from "./_category-page/category/category-twentytwo";
import CategoryTwo from "./_category-page/category/category-two";

const SubCategoryComponent = async () => {
  const url = getUrl();
  const {
    design: { shop_page: theme },
  } = await getSubdomainName(url, "design");
  return (
    <>
      {theme === "one" && <CategoryOne />}
      {theme === "two" && <CategoryTwo />}
      {theme === "three" && <CategoryThree />}
      {theme === "four" && <CategoryFour />}
      {theme === "five" && <CategoryFive />}
      {theme === "six" && <CategorySix />}
      {theme === "seven" && <CategorySevenNew />}
      {theme === "eight" && <CategoryEight />}
      {theme === "nine" && <CategoryNine />}
      {theme === "ten" && <CategoryTen />}
      {theme === "eleven" && <CategoryEleven />}
      {theme === "twelve" && <CategoryTwelve />}
      {theme === "thirteen" && <CategoryThirteen />}
      {theme === "fourteen" && <CategoryFourteen />}
      {theme === "sixteen" && <CategorySixteen />}
      {theme === "seventeen" && <CategorySeventeen />}
      {theme === "eighteen" && <CategoryEighteen />}
      {theme === "nineteen" && <CategoryNineteen />}
      {theme === "twenty" && <CategoryTwenty />}
      {theme === "twentyone" && <CategoryTwentyOne />}
      {theme === "twentytwo" && <CategoryTwentyTwo />}
      {theme === "twentythree" && <CategoryTwentyThree />}
      {theme === "twentyfour" && <CategoryTwentyFour />}
      {theme === "twentyfive" && <CategoryTwentyFive />}
      {theme === "twentysix" && <CategoryTwentySix />}
      {theme === "twentyseven" && <CategoryTwentySeven />}
      {theme === "twentyeight" && <CategoryTwentyEight />}
      {theme === "twentynine" && <CategoryTwentyNine />}
      {theme === "thirty" && <CategoryThirty />}
      {theme === "thirtyone" && <CategoryThirty />}
      {theme === "thirtythree" && <CategoryThirtyThree />}
      {theme === "thirtyfour" && <CategoryThirtyFour />}
      {theme === "thirtyfive" && <CategoryThirtyFive />}
      {theme === "thirtysix" && <CategoryThirtySix />}
      {theme === "thirtyseven" && <CategoryThirtySeven />}
      {theme === "thirtyeight" && <CategoryThirtyEight />}
      {theme === "thirtynine" && <CategoryThirtyNine />}
      {theme === "forty" && <CategoryForty />}
    </>
  );
};

export default SubCategoryComponent;
