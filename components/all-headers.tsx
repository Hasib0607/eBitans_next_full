import dynamic from "next/dynamic";

const headers: any = {
  default: dynamic(() => import("@/components/headers/header-default")),
  one: dynamic(() => import("@/components/headers/header-one/header-one")),
  two: dynamic(() => import("@/components/headers/header-two/header-two")),
  three: dynamic(
    () => import("@/components/headers/header-three/header-three")
  ),
  four: dynamic(() => import("@/components/headers/header-four/header-four")),
  five: dynamic(() => import("@/components/headers/header-five/header-five")),
  six: dynamic(() => import("@/components/headers/header-six/header-six")),
  seven: dynamic(
    () => import("@/components/headers/header-seven/header-seven")
  ),
  eight: dynamic(
    () => import("@/components/headers/header-eight/header-eight")
  ),
  nine: dynamic(() => import("@/components/headers/header-nine/header-nine")),
  ten: dynamic(() => import("@/components/headers/header-ten/header-ten")),
  eleven: dynamic(
    () => import("@/components/headers/header-eleven/header-eleven")
  ),
  twelve: dynamic(
    () => import("@/components/headers/header-twelve/header-twelve")
  ),
  thirteen: dynamic(
    () => import("@/components/headers/header-thirteen/header-thirteen")
  ),
  fourteen: dynamic(
    () => import("@/components/headers/header-fourteen/header-fourteen")
  ),
  fifteen: dynamic(
    () => import("@/components/headers/header-fifteen/header-fifteen")
  ),
  sixteen: dynamic(
    () => import("@/components/headers/header-sixteen/header-sixteen")
  ),
  seventeen: dynamic(
    () => import("@/components/headers/header-seventeen/header-seventeen")
  ),
  eighteen: dynamic(
    () => import("@/components/headers/header-eighteen/header-eighteen")
  ),
  nineteen: dynamic(
    () => import("@/components/headers/header-nineteen/header-nineteen")
  ),
  twenty: dynamic(
    () => import("@/components/headers/header-twenty/header-twenty")
  ),
  twentyone: dynamic(
    () => import("@/components/headers/header-twentyone/header-twentyone")
  ),
  twentytwo: dynamic(
    () => import("@/components/headers/header-twentytwo/header-twentytwo")
  ),
  twentythree: dynamic(
    () => import("@/components/headers/header-twentythree/header-twentythree")
  ),
  twentyfour: dynamic(
    () => import("@/components/headers/header-twentyfour/header-twentyfour")
  ),
  twentyfive: dynamic(
    () => import("@/components/headers/header-twentyfive/header-twentyfive")
  ),
  twentysix: dynamic(
    () => import("@/components/headers/header-twentysix/header-twentysix")
  ),
  twentyseven: dynamic(
    () => import("@/components/headers/header-twentyseven/header-twentyseven")
  ),
  twentyeight: dynamic(
    () => import("@/components/headers/header-twentyeight/header-twentyeight")
  ),
  twentynine: dynamic(
    () => import("@/components/headers/header-twentynine/header-twentynine")
  ),
  thirty: dynamic(
    () => import("@/components/headers/header-thirty/header-thirty")
  ),
  thirtyone: dynamic(
    () => import("@/components/headers/header-thirtyone/header-thirtyone")
  ),
  thirtythree: dynamic(
    () => import("@/components/headers/header-thirtythree/header-thirtythree")
  ),
  thirtyfour: dynamic(
    () => import("@/components/headers/header-thirtyfour/header-thirtyfour")
  ),
  thirtyfive: dynamic(
    () => import("@/components/headers/header-thirtyfive/header-thirtyfive")
  ),
  thirtysix: dynamic(
    () => import("@/components/headers/header-thirtysix/header-thirtysix")
  ),
  thirtyseven: dynamic(
    () => import("@/components/headers/header-thirtyseven/header-thirtyseven")
  ),
  thirtyeight: dynamic(
    () => import("@/components/headers/header-thirtyeight/header-thirtyeight")
  ),
  thirtynine: dynamic(
    () => import("@/components/headers/header-thirtynine/header-thirtynine")
  ),
  forty: dynamic(
    () => import("@/components/headers/header-forty/header-forty")
  ),
};

const AllHeaders = ({ design, headerSetting }: any) => {
  // const HeaderComponent = headers[design?.header];

  const HeaderComponent = headers["seven"];

  return (
    <>
      {HeaderComponent ? (
        <HeaderComponent design={design} headerSetting={headerSetting} />
      ) : (
        <p>Header not found</p>
      )}
    </>
  );
};

export default AllHeaders;
