import SubCategoryComponent from "@/components/category";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";

export async function generateMetadata() {
  const url = getUrl();
  const {
    headersetting: { website_name, favicon },
  } = await getSubdomainName(url, "headersetting");

  const websiteName = capitalizeFirstLetter(website_name);
  return {
    title: `${websiteName} | Category`,
    icons: { icon: imgUrl + favicon },
  };
}

const SubcategoryPage = async () => {
  return <SubCategoryComponent />;
};

export default SubcategoryPage;
