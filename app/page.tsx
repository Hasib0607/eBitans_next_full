import HomepageLoad from "@/components/gtm/homepage-load";
// import { Search } from "@/components/headers/header-one/header-down";
import HomePage from "@/components/home";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
// import AllMobileBottomMenu from "./mobileBottomMenu";
// import MobileNavThree from "./mobileNavs/three/mobileNavThree";

export async function generateMetadata() {
  try {
    const url = getUrl();
    const { headersetting } = await getSubdomainName(url, "headersetting");
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);
    return {
      title: `${websiteName} | Home`,
      icons: { icon: imgUrl + headersetting?.favicon },
    };
  } catch (error) {
    // console.error("Error generating metadata:", error);
    return {
      title: "Home",
    };
  }
}

export default async function Home() {
  return (
    <>
      <HomePage />
      {/* <AllMobileBottomMenu/> */}
      <HomepageLoad />
      {/* <MobileNavThree/> */}
    </>
  );
}
