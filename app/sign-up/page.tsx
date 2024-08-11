import Register from "@/components/register";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";

import React from "react";

export async function generateMetadata() {
  const url = getUrl();
  const {
    headersetting: { website_name, favicon },
  } = await getSubdomainName(url, "headersetting");
  const websiteName = capitalizeFirstLetter(website_name);

  return {
    title: `${websiteName} | Register`,
    icons: { icon: imgUrl + favicon },
  };
}

const Signup = async () => {
  return <Register />;
};

export default Signup;
