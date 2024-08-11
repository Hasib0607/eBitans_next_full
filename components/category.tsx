// "use client";
import React from "react";
import CategorySevenNew from "./_category-page/category/category-seven-new";
import getUrl from "@/utils/get-url";
import { getSubdomainName } from "@/lib";
import CategoryEight from "./_category-page/category/category-eight-old";
import CategoryNine from "./_category-page/category/category-nine";
import CategoryTen from "./_category-page/category/category-ten";
import CategoryEleven from "./_category-page/category/category-eleven";
import CategoryTwelve from "./_category-page/category/category-twelve";
import CategoryThirteen from "./_category-page/category/category-thirteen";
import CategoryFourteen from "./_category-page/category/category-fourteen";
import CategorySixteen from "./_category-page/category/category-sixteen";
import CategorySeventeen from "./_category-page/category/category-seventeen";
import CategoryEighteen from "./_category-page/category/category-eighteen";
import CategoryNineteen from "./_category-page/category/category-nineteen";
import CategoryTwenty from "./_category-page/category/category-twenty";
import CategoryTwentyOne from "./_category-page/category/category-twentyone";
import CategoryTwentyTwo from "./_category-page/category/category-twentytwo";
import CategoryTwentyThree from "./_category-page/category/category-twentythree";
import CategoryTwentyFour from "./_category-page/category/category-twentyfour";
import CategoryTwentyFive from "./_category-page/category/category-twentyfive";
import CategoryTwentySix from "./_category-page/category/category-twentysix";
import CategoryTwentySeven from "./_category-page/category/category-twentyseven";
import CategoryTwentyEight from "./_category-page/category/category-twentyeight";
import CategoryTwentyNine from "./_category-page/category/category-twentynine";
import CategoryThirty from "./_category-page/category/category-thirty";
import CategoryThirtyThree from "./_category-page/category/category-thirtythree";
import CategoryThirtyFour from "./_category-page/category/category-thirtyfour";
import CategoryThirtyFive from "./_category-page/category/category-thirtyfive";
import CategoryThirtySix from "./_category-page/category/category-thirtysix";
import CategoryThirtySeven from "./_category-page/category/category-thirtyseven";
import CategoryThirtyEight from "./_category-page/category/category-thirtyeight";
import CategoryThirtyNine from "./_category-page/category/category-thirtynine";
import CategoryForty from "./_category-page/category/category-forty";
import CategoryOne from "./_category-page/category/category-one";
import CategoryTwo from "./_category-page/category/category-two";
import CategoryThree from "./_category-page/category/category-three";
import CategoryFive from "./_category-page/category/category-five";
import CategoryFour from "./_category-page/category/category-four";
import CategorySix from "./_category-page/category/category-six";

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
