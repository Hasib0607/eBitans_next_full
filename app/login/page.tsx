import Signin from "@/components/signin";

// export async function generateMetadata() {
//   const url = getUrl();
//   const { headersetting } = await getSubdomainName(url, "headersetting");
//   const websiteName = capitalizeFirstLetter(headersetting?.website_name);

//   return {
//     title: `${websiteName} | Login`,
//     icons: { icon: imgUrl + headersetting?.favicon },
//   };
// }

const LoginPage = async () => {
  return <Signin />;
};

export default LoginPage;
