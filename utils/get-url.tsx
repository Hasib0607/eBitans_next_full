import { headers } from "next/headers";

const getUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const forwardedPath = headersList.get("x-forwarded-path") || "";
  let url = `${host}${forwardedPath}`;
  if (url.includes("www.")) {
    url = url.replace("www.", "");
  }
  return url;
};

export default getUrl;

