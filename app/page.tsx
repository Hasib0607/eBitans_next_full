import React from "react";
import HomePage from "@/components/home";
import getUrl from "../utils/get-url";
import { getSubdomainName } from "@/lib";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { imgUrl } from "@/site-settings/siteUrl";

export async function generateMetadata() {
  const url = getUrl();
  const {
    headersetting: { website_name, favicon },
  } = await getSubdomainName(url, "headersetting");
  const websiteName = capitalizeFirstLetter(website_name);

  return {
    title: `${websiteName} | Home`,
    icons: { icon: imgUrl + favicon },
  };
}

export default async function Home() {
  return <HomePage />;
}
