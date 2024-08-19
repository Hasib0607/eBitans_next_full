import CheckoutComponent from "./checkout-component";

// export async function generateMetadata() {
//   const url = getUrl();
//   const subDomainData = await getSubdomainName(url, "headersetting");
//   const { headersetting } = subDomainData;
//   const websiteName = capitalizeFirstLetter(headersetting?.website_name);

//   return {
//     title: `${websiteName} | Checkout`,
//     icons: { icon: imgUrl + headersetting?.favicon },
//   };
// }

const CheckoutPage = () => {
  return <CheckoutComponent />;
};

export default CheckoutPage;
