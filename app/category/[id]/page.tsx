import SubCategoryComponent from "@/components/category";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";

export async function generateMetadata() {
  const url = getUrl();
  const { headersetting } = await getSubdomainName(url, "headersetting");

  const websiteName = capitalizeFirstLetter(headersetting?.website_name);
  return {
    title: `${websiteName} | Category`,
    icons: { icon: imgUrl + headersetting?.favicon },
  };
}

const SubcategoryPage = async () => {
  return <SubCategoryComponent />;
};

export default SubcategoryPage;
