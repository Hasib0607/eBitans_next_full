import HomePage from "@/components/home";

// export async function generateMetadata() {
//   const url = getUrl();
//   const { headersetting } = await getSubdomainName(url, "headersetting");
//   const websiteName = capitalizeFirstLetter(headersetting?.website_name);

//   return {
//     title: `${websiteName} | Home`,
//     icons: { icon: imgUrl + headersetting?.favicon },
//   };
// }

export default async function Home() {
  return <HomePage />;
}
