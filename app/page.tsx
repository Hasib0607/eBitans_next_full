import HomepageLoad from "@/components/gtm/homepage-load";
// import { Search } from "@/components/headers/header-one/header-down";
import HomePage from "@/components/home";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import Heading from "@/utils/heading";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  if (!subDomainData) {
    throw new Error("Subdomain data not found");
  }
  // Check if subdomainData and headersetting exist
  const headersetting = subDomainData?.headersetting || {};

  const favicon = imgUrl + headersetting?.favicon;
  // Extract the relevant fields from headersetting
  const title = `${capitalizeFirstLetter(headersetting?.website_name)}`;
  const description =
    headersetting?.short_description ||
    "eBbitans is a platform where you can create an E-commerce website for your business with just a few clicks.";
 

  return {
    title: `${title} `,
    description: `${description}`,
    icons: { icon: imgUrl + headersetting?.favicon },
    keywords: ` ${title}, `,
    openGraph: {
      title: `${title} `,
      description: `description`,
      url,
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: `${websiteName} | ${name}`,
    //   description: description || `Buy ${name} at ${websiteName}`,
    //   image: productImageUrl || fallbackImage, // Use product image or fallback
    // },
  };
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
