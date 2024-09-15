import HomepageLoad from "@/components/gtm/homepage-load";
import HomePage from "@/components/home";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";

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
    console.error("Error generating metadata:", error);
    return {
      title: "Home",
    };
  }
}

export default async function Home() {
  return (
    <>
      <HomePage />
      <HomepageLoad />
    </>
  );
}
