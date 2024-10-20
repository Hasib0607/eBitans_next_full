import ProductDetails from "@/components/product-details";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getProductDetails, getSubdomainName } from "@/lib";
import { imgUrl } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import { Metadata, ResolvingMetadata } from "next";
import ViewContentGtm from "./ViewContentGtm";
import { redirect } from 'next/navigation';

type Props = {
  params: { productID: string; slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  const store_id = subDomainData?.store_id;
  const headersetting = subDomainData?.headersetting;
  const product = await getProductDetails({
    store_id,
    product_id: params.productID,
  });

  if(product == undefined || product == null){
    redirect('/');
  }
  const { name } = product;
  const websiteName = capitalizeFirstLetter(headersetting?.website_name);
  return {
    title: `${websiteName} | ${name}`,
    icons: { icon: imgUrl + headersetting?.favicon },
  };
}

const SingleProductDetails = async ({ params }: Props) => {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  const { store_id } = subDomainData;
  const product = await getProductDetails({
    store_id,
    product_id: params.productID,
  });

  if(product == undefined || product == null){
    redirect('/');
  }

  return (
    <div>
      <ViewContentGtm product={product} />
      <ProductDetails />
      {/* <ProductDetailsTest /> */}
    </div>
  );
};

export default SingleProductDetails;
