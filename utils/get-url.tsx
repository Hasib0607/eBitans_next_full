import { headers } from "next/headers";

const getUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const forwardedPath = headersList.get("x-forwarded-path") || "";

  let url = `${host}${forwardedPath}`;

  // Remove 'www.' if it exists in the URL
  if (url.includes("www.")) {
    url = url.replace("www.", "");
  }
  // www.gadgetghor.shop -> gadgetghor.shop
  return url;
};

export default getUrl;
