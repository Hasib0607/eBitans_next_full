import HomepageLoad from "@/components/gtm/homepage-load";
import HomePage from "@/components/home";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const url = getUrl();
  //new one start
  const subDomainData = await getSubdomainName(url, "headersetting");
  if (!subDomainData) {
    console.warn("Subdomain data not found, using default settings.");
    // Provide default settings or skip the metadata generation
    return { title: "Default Title", description: "Default Description" };
  }
  //new condition end

  // Check if subdomainData and headersetting exist
  const headersetting = subDomainData?.headersetting || {};
  // const favicon = imgUrl + headersetting?.favicon;
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
    < >
      <HomePage />
      <HomepageLoad />
    </>
  );
}
