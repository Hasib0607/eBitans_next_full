import ProductDetails from "@/components/product-details";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";
import { getProductDetails, getSubdomainName } from "@/lib";
import { imgUrl, productImg } from "@/site-settings/siteUrl";
import getUrl from "@/utils/get-url";
import { Metadata, ResolvingMetadata } from "next";
import ViewContentGtm from "./ViewContentGtm";
import { redirect } from "next/navigation";
type Props = {
  params: { productID: string; slug: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  if (!subDomainData) {
    throw new Error("Subdomain data not found");
  }
  const store_id = subDomainData?.store_id;
  const headersetting = subDomainData?.headersetting;
  if (!store_id || !headersetting) {
    throw new Error("Store ID or Header setting not available");
  }
  const product = await getProductDetails({
    store_id,
    product_id: params.productID,
  });
  if (!product) {
    throw new Error("Product not found");
  }

  if (product == undefined || product == null) {
    redirect("/");
  }
  const { name, description, seo_keywords, image } = product;
  // console.log(product);
  const websiteName = capitalizeFirstLetter(headersetting?.website_name);
  // Ensure image is a string and not an array
  const imageURL = Array.isArray(image) ? image[0] : image;
  const productImageUrl = `${productImg + imageURL}`;

  const fallbackImage = imgUrl + "default-product-image.jpg";
  return {
    title: `${websiteName} | ${name}`,
    description: stripHtmlTags(description) || `Buy ${name} at ${websiteName}`,
    icons: { icon: imgUrl + headersetting?.favicon },
    keywords: seo_keywords || `${name}, ${websiteName}, `,
    openGraph: {
      title: `${websiteName} | ${name}`,
      description: description || `Check out ${name} on ${websiteName}`,
      url,
      images: [
        {
          url: productImageUrl || fallbackImage,
          width: 800,
          height: 600,
          alt: `${name} image`,
        },
      ],
    },
  };
}

function stripHtmlTags(htmlString: any) {
  return htmlString.replace(/<[^>]*>/g, "") || "";
}

const SingleProductDetails = async ({ params }: Props) => {
  const url = getUrl();
  const subDomainData = await getSubdomainName(url, "headersetting");
  if (!subDomainData) {
    throw new Error("Subdomain data not found");
  }
  const { store_id } = subDomainData;
  if (!store_id) {
    throw new Error("Store ID not available");
  }
  const product = await getProductDetails({
    store_id,
    product_id: params.productID,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return (
    <div>
      <ViewContentGtm product={product} />
      <ProductDetails />
    </div>
  );
};
export default SingleProductDetails;
