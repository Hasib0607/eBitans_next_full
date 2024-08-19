import ProductDetails from "@/components/product-details";

type Props = {
  params: { productID: string; slug: string };
};

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const url = getUrl();
//   const subDomainData = await getSubdomainName(url, "headersetting");
//   const { store_id, headersetting } = subDomainData;
//   const product = await getProductDetails({
//     store_id,
//     product_id: params.productID,
//   });
//   const { name } = product;
//   const websiteName = capitalizeFirstLetter(headersetting?.website_name);
//   return {
//     title: `${websiteName} | ${name}`,
//     icons: { icon: imgUrl + headersetting?.favicon },
//   };
// }

const SingleProductDetails = async ({ params }: Props) => {
  return (
    <div>
      <ProductDetails />
    </div>
  );
};

export default SingleProductDetails;
