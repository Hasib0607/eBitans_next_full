import HomepageLoad from "@/components/gtm/homepage-load";
// import { Search } from "@/components/headers/header-one/header-down";
import HomePage from "@/components/home";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import { Metadata } from "next";
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

export async function generateMetadata(): Promise<Metadata> {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  if (!subDomainData) {
    throw new Error("Subdomain data not found");
  }
  // Check if subdomainData and headersetting exist
  const headersetting = subDomainData?.headersetting || {};
  console.log(headersetting)
  const favicon = imgUrl + headersetting?.favicon;
  const logo = imgUrl + headersetting?.logo;
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
      description: `${description}`,
      images: [
        {
          url: logo,
          width: 800,
          height: 600,
          alt: `${logo} image`,
        },
      ],
      url,
    },
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
