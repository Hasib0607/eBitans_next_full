import Signin from "@/components/signin";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";

export async function generateMetadata() {
  const url = getUrl();
  const { headersetting } = await getSubdomainName(url, "headersetting");
  const websiteName = capitalizeFirstLetter(headersetting?.website_name);

  return {
    title: `${websiteName} | Login`,
    icons: { icon: imgUrl + headersetting?.favicon },
  };
}

const LoginPage = async () => {
  return <Signin />;
};

export default LoginPage;
