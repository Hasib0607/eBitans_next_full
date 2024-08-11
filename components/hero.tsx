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

const Hero = ({ theme, slider, design }: any) => {
  const SelectedHeroComponent =
    heroComponents[theme] || heroComponents["default"];
  return <SelectedHeroComponent slider={slider} design={design} />;
};
export default Hero;
