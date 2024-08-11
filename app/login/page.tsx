import React from "react";

import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import Signin from "@/components/signin";

export async function generateMetadata() {
  const url = getUrl();
  const {
    headersetting: { website_name, favicon },
  } = await getSubdomainName(url, "headersetting");
  const websiteName = capitalizeFirstLetter(website_name);

  return {
    title: `${websiteName} | Login`,
    icons: { icon: imgUrl + favicon },
  };
}

const LoginPage = async () => {
  return <Signin />;
};

export default LoginPage;
