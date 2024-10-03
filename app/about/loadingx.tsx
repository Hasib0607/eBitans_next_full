import SpinerFive from "@/components/spinner/spiner-five";
import SpinerFour from "@/components/spinner/spiner-four";
import SpinerOne from "@/components/spinner/spiner-one";
import SpinerSix from "@/components/spinner/spiner-six";
import SpinerThree from "@/components/spinner/spiner-three";
import SpinerTwo from "@/components/spinner/spiner-two";

import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";

const Loading = async () => {
  const url = getUrl();
  const data = await getSubdomainName(url);
  const { design } = data;

  const No_Of_Loading_Spinner = design?.header || "one";

  const renderLoader = () => {
    switch (No_Of_Loading_Spinner) {
      case "one":
        return <SpinerOne />;
      case "two":
        return <SpinerTwo />;
      case "three":
        return <SpinerThree />;
      case "four":
        return <SpinerFour />;
      case "five":
        return <SpinerFive />;
      case "six":
        return <SpinerSix />;
      case "seven":
        return <SpinerOne />;
      case "eight":
        return <SpinerTwo />;
      case "nine":
        return <SpinerThree />;
      case "ten":
        return <SpinerFour />;
      case "eleven":
        return <SpinerFive />;
      case "twelve":
        return <SpinerSix />;
      case "thirteen":
        return <SpinerOne />;
      case "fourteen":
        return <SpinerTwo />;
      case "fifteen":
        return <SpinerThree />;
      case "sixteen":
        return <SpinerFour />;
      case "seventeen":
        return <SpinerFive />;
      case "eighteen":
        return <SpinerSix />;
      case "nineteen":
        return <SpinerOne />;
      case "twenty":
        return <SpinerTwo />;
      case "twentyone":
        return <SpinerThree />;
      case "twentytwo":
        return <SpinerFour />;
      case "twentythree":
        return <SpinerFive />;
      case "twentyfour":
        return <SpinerSix />;
      case "twentyfive":
        return <SpinerOne />;
      case "twentysix":
        return <SpinerTwo />;
      case "twentyseven":
        return <SpinerThree />;
      case "twentyeight":
        return <SpinerFour />;
      case "twentynine":
        return <SpinerFive />;
      case "thirty":
        return <SpinerSix />;
      case "thirtyone":
        return <SpinerOne />;
      case "thirtytwo":
        return <SpinerTwo />;
      case "thirtythree":
        return <SpinerThree />;
      case "thirtyfour":
        return <SpinerFour />;
      case "thirtyfive":
        return <SpinerFive />;
      case "thirtysix":
        return <SpinerSix />;
      case "thirtyseven":
        return <SpinerOne />;
      case "thirtyeight":
        return <SpinerTwo />;
      case "thirtynine":
        return <SpinerThree />;
      case "forty":
        return <SpinerFour />;
      default:
        return (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {renderLoader()}
    </div>
  );
};

export default Loading;
