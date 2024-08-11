import ShopComponent from "@/components/shop";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import React from "react";

export async function generateMetadata() {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  const { headersetting } = subDomainData;
  const websiteName = capitalizeFirstLetter(headersetting.website_name);

  return {
    title: `${websiteName} | Shop`,
    icons: { icon: imgUrl + headersetting.favicon },
  };
}

const ShopPage = () => {
  return <ShopComponent />;
};

export default ShopPage;
