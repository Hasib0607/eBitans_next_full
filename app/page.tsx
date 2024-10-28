import HomepageLoad from "@/components/gtm/homepage-load";
// import { Search } from "@/components/headers/header-one/header-down";
import HomePage from "@/components/home";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import Heading from "@/utils/heading";
// import AllMobileBottomMenu from "./mobileBottomMenu";
// import MobileNavThree from "./mobileNavs/three/mobileNavThree";

// export async function generateMetadata() {
//   try {
//     const url = getUrl();
//     const { headersetting } = await getSubdomainName(url, "headersetting");
//     const websiteName = capitalizeFirstLetter(headersetting?.website_name);
//     return {
//       title: `${websiteName} | Home`,
//       icons: { icon: imgUrl + headersetting?.favicon },
//     };
//   } catch (error) {
//     // console.error("Error generating metadata:", error);
//     return {
//       title: "Home",
//     };
//   }
// }

export default async function Home() {
  const url = getUrl();
  const { headersetting } = await getSubdomainName(url, "headersetting");

  // Extract the relevant fields from headersetting
  const title = `${capitalizeFirstLetter(headersetting?.website_name)}`;
  const description = headersetting?.short_description || "eBbitans is a platform where you can create an E-commerce website for your business with just a few clicks.";
  const keywords = "eBitans, eCommerce builder platform";
  const favicon = headersetting.favicon || null;
  const logo = headersetting.logo || null;

  return (
    <>
      <Heading
        title={title}
        description={description}
        keywords={keywords}
        favicon={favicon}
        logo={logo}
      />
      <HomePage />
      {/* <AllMobileBottomMenu/> */}
      <HomepageLoad />
      {/* <MobileNavThree/> */}
    </>
  );
}
