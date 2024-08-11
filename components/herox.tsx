// import HeroDefault from "@/components/_homepage/hero/hero-default";
// import HeroEight from "@/components/_homepage/hero/hero-eight";
// import HeroEighteen from "@/components/_homepage/hero/hero-eighteen";
// import HeroEleven from "@/components/_homepage/hero/hero-eleven";
// import HeroFive from "@/components/_homepage/hero/hero-five";
// import HeroFour from "@/components/_homepage/hero/hero-four";
// import HeroFourteen from "@/components/_homepage/hero/hero-fourteen";
// import HeroNine from "@/components/_homepage/hero/hero-nine";
// import HeroNineteen from "@/components/_homepage/hero/hero-nineteen";
// import HeroOne from "@/components/_homepage/hero/hero-one";
// import HeroSeven from "@/components/_homepage/hero/hero-seven";
// import HeroSeventeen from "@/components/_homepage/hero/hero-seventeen";
// import HeroSix from "@/components/_homepage/hero/hero-six";
// import HeroSixteen from "@/components/_homepage/hero/hero-sixteen";
// import HeroTen from "@/components/_homepage/hero/hero-ten";
// import HeroThirteen from "@/components/_homepage/hero/hero-thirteen";
// import HeroThirtyEight from "@/components/_homepage/hero/hero-thirty-eight";
// import HeroThirtyFive from "@/components/_homepage/hero/hero-thirty-five";
// import HeroThirtyFour from "@/components/_homepage/hero/hero-thirty-four";
// import HeroThirtyNine from "@/components/_homepage/hero/hero-thirty-nine";
// import HeroThirtyOne from "@/components/_homepage/hero/hero-thirty-one";
// import HeroThirtySeven from "@/components/_homepage/hero/hero-thirty-seven";
// import HeroThirtySix from "@/components/_homepage/hero/hero-thirty-six";
// import HeroThirtyThree from "@/components/_homepage/hero/hero-thirty-three";
// import HeroThree from "@/components/_homepage/hero/hero-three";
// import HeroThirty from "@/components/_homepage/hero/hero-thrity";
// import HeroTwentyTwo from "@/components/_homepage/hero/hero-tweent-two";
// import HeroTwentyOne from "@/components/_homepage/hero/hero-tweenty";
// import HeroTwelve from "@/components/_homepage/hero/hero-twelve";
// import HeroTwentyEight from "@/components/_homepage/hero/hero-twenty-eight";
// import HeroTwentyFive from "@/components/_homepage/hero/hero-twenty-five";
// import HeroTwentyFour from "@/components/_homepage/hero/hero-twenty-four";
// import HeroTwentyNine from "@/components/_homepage/hero/hero-twenty-nine";
// import HeroTwentySeven from "@/components/_homepage/hero/hero-twenty-seven";
// import HeroTwentySix from "@/components/_homepage/hero/hero-twenty-six";
// import HeroTwentyThree from "@/components/_homepage/hero/hero-twenty-three";
// import HeroTwo from "@/components/_homepage/hero/hero-two";
// import dynamic from "next/dynamic";
// import {
//   EIGHT,
//   EIGHTEEN,
//   ELEVEN,
//   FOURTEEN,
//   NINE,
//   NINETEEN,
//   SEVEN,
//   SEVENTEEN,
//   SIXTEEN,
//   TEN,
//   THIRTEEN,
//   THIRTY,
//   THIRTY_EIGHT,
//   THIRTY_FIVE,
//   THIRTY_FOUR,
//   THIRTY_NINE,
//   THIRTY_ONE,
//   THIRTY_SEVEN,
//   THIRTY_SIX,
//   THIRTY_THREE,
//   TWELVE,
//   TWENTY,
//   TWENTY_EIGHT,
//   TWENTY_FIVE,
//   TWENTY_FOUR,
//   TWENTY_NINE,
//   TWENTY_ONE,
//   TWENTY_SEVEN,
//   TWENTY_SIX,
//   TWENTY_THREE,
//   TWENTY_TWO,
// } from "@/consts";

import dynamic from "next/dynamic";

const heroComponents: any = {
  one: dynamic(() => import("@/components/_homepage/hero/hero-one"), {
    ssr: false,
  }),
  two: dynamic(() => import("@/components/_homepage/hero/hero-two"), {
    ssr: false,
  }),
  three: dynamic(() => import("@/components/_homepage/hero/hero-three"), {
    ssr: false,
  }),
  four: dynamic(() => import("@/components/_homepage/hero/hero-four"), {
    ssr: false,
  }),
  five: dynamic(() => import("@/components/_homepage/hero/hero-five"), {
    ssr: false,
  }),
  six: dynamic(() => import("@/components/_homepage/hero/hero-six"), {
    ssr: false,
  }),
  seven: dynamic(() => import("@/components/_homepage/hero/hero-seven"), {
    ssr: false,
  }),
  eight: dynamic(() => import("@/components/_homepage/hero/hero-eight"), {
    ssr: false,
  }),
  nine: dynamic(() => import("@/components/_homepage/hero/hero-nine"), {
    ssr: false,
  }),
  ten: dynamic(() => import("@/components/_homepage/hero/hero-ten"), {
    ssr: false,
  }),
  eleven: dynamic(() => import("@/components/_homepage/hero/hero-eleven"), {
    ssr: false,
  }),
  twelve: dynamic(() => import("@/components/_homepage/hero/hero-twelve"), {
    ssr: false,
  }),
  thirteen: dynamic(() => import("@/components/_homepage/hero/hero-thirteen"), {
    ssr: false,
  }),
  fourteen: dynamic(() => import("@/components/_homepage/hero/hero-fourteen"), {
    ssr: false,
  }),
  sixteen: dynamic(() => import("@/components/_homepage/hero/hero-sixteen"), {
    ssr: false,
  }),
  seventeen: dynamic(
    () => import("@/components/_homepage/hero/hero-seventeen"),
    { ssr: false }
  ),
  eighteen: dynamic(() => import("@/components/_homepage/hero/hero-eighteen"), {
    ssr: false,
  }),
  nineteen: dynamic(() => import("@/components/_homepage/hero/hero-nineteen"), {
    ssr: false,
  }),
  twenty: dynamic(
    () => import("@/components/_homepage/hero/hero-tweenty-one"),
    { ssr: false }
  ),
  twentyone: dynamic(
    () => import("@/components/_homepage/hero/hero-tweenty-one"),
    { ssr: false }
  ),
  twentytwo: dynamic(
    () => import("@/components/_homepage/hero/hero-tweent-two"),
    { ssr: false }
  ),
  twentythree: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-three"),
    { ssr: false }
  ),
  twentyfour: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-four"),
    { ssr: false }
  ),
  twentyfive: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-five"),
    { ssr: false }
  ),
  twentysix: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-six"),
    { ssr: false }
  ),
  twentyseven: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-seven"),
    { ssr: false }
  ),
  twentyeight: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-eight"),
    { ssr: false }
  ),
  twentynine: dynamic(
    () => import("@/components/_homepage/hero/hero-twenty-nine"),
    { ssr: false }
  ),
  thirty: dynamic(() => import("@/components/_homepage/hero/hero-thrity"), {
    ssr: false,
  }),
  thirtyone: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-one"),
    { ssr: false }
  ),
  thirtythree: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-three"),
    { ssr: false }
  ),
  thirtyfour: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-four"),
    { ssr: false }
  ),
  thirtyfive: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-five"),
    { ssr: false }
  ),
  thirtysix: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-six"),
    { ssr: false }
  ),
  thirtyseven: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-seven"),
    { ssr: false }
  ),
  thirtyeight: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-eight"),
    { ssr: false }
  ),
  thirtynine: dynamic(
    () => import("@/components/_homepage/hero/hero-thirty-nine"),
    { ssr: false }
  ),
  default: dynamic(() => import("@/components/_homepage/hero/hero-default"), {
    ssr: false,
  }),
};

// const HeroComponent = heroComponents[theme] || heroComponents["default"];

// const Hero = ({ slider, theme, design }: any) => {
//   return (
//     <>
//       {theme === "one" && <DynamicHeroOne slider={slider} />}
//       {theme === "two" && <HeroTwo slider={slider} design={design} />}
//       {theme === "three" && <HeroThree slider={slider} design={design} />}
//       {theme === "four" && <HeroFour slider={slider} />}
//       {theme === "five" && <HeroFive slider={slider} />}
//       {theme === "six" && <HeroSix slider={slider} design={design} />}
//       {theme === SEVEN && <HeroSeven slider={slider} design={design} />}
//       {theme === EIGHT && <HeroEight slider={slider} />}
//       {theme === NINE && <HeroNine slider={slider} design={design} />}
//       {theme === TEN && <HeroTen slider={slider} design={design} />}
//       {theme === ELEVEN && <HeroEleven slider={slider} design={design} />}
//       {theme === TWELVE && <HeroTwelve slider={slider} design={design} />}
//       {theme === THIRTEEN && <HeroThirteen slider={slider} />}
//       {theme === FOURTEEN && <HeroFourteen slider={slider} design={design} />}
//       {theme === SIXTEEN && <HeroSixteen slider={slider} design={design} />}
//       {theme === SEVENTEEN && <HeroSeventeen slider={slider} design={design} />}
//       {theme === EIGHTEEN && <HeroEighteen slider={slider} />}
//       {theme === NINETEEN && <HeroNineteen slider={slider} design={design} />}
//       {theme === TWENTY && <HeroTwentyOne slider={slider} design={design} />}
//       {theme === TWENTY_ONE && (
//         <HeroTwentyOne slider={slider} design={design} />
//       )}
//       {theme === TWENTY_TWO && (
//         <HeroTwentyTwo slider={slider} design={design} />
//       )}
//       {theme === TWENTY_THREE && (
//         <HeroTwentyThree slider={slider} design={design} />
//       )}
//       {theme === TWENTY_FOUR && (
//         <HeroTwentyFour slider={slider} design={design} />
//       )}
//       {theme === TWENTY_FIVE && (
//         <HeroTwentyFive slider={slider} design={design} />
//       )}
//       {theme === TWENTY_SIX && (
//         <HeroTwentySix slider={slider} design={design} />
//       )}
//       {theme === TWENTY_SEVEN && (
//         <HeroTwentySeven slider={slider} design={design} />
//       )}
//       {theme === TWENTY_EIGHT && (
//         <HeroTwentyEight slider={slider} design={design} />
//       )}
//       {theme === TWENTY_NINE && (
//         <HeroTwentyNine slider={slider} design={design} />
//       )}
//       {theme === THIRTY && <HeroThirty slider={slider} design={design} />}
//       {theme === THIRTY_ONE && (
//         <HeroThirtyOne slider={slider} design={design} />
//       )}
//       {/* no thirty two */}
//       {theme === THIRTY_THREE && (
//         <HeroThirtyThree slider={slider} design={design} />
//       )}
//       {theme === THIRTY_FOUR && (
//         <HeroThirtyFour slider={slider} design={design} />
//       )}
//       {theme === THIRTY_FIVE && <HeroThirtyFive slider={slider} />}
//       {theme === THIRTY_SIX && (
//         <HeroThirtySix slider={slider} design={design} />
//       )}
//       {theme === THIRTY_SEVEN && (
//         <HeroThirtySeven slider={slider} design={design} />
//       )}
//       {theme === THIRTY_EIGHT && (
//         <HeroThirtyEight slider={slider} design={design} />
//       )}
//       {theme === THIRTY_NINE && (
//         <HeroThirtyNine slider={slider} design={design} />
//       )}
//       {theme === "default" && <DynamicHeroDefault slider={slider} />}
//     </>
//   );
// };

const Hero = ({ theme, slider, design }: any) => {
  const SelectedHeroComponent =
    heroComponents[theme] || heroComponents["default"];
  return <SelectedHeroComponent slider={slider} design={design} />;
};
export default Hero;
