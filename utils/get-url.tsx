import { headers } from "next/headers";

const getUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const forwardedPath = headersList.get("x-forwarded-path") || "";
  const url = `${host}${forwardedPath}`;

  console.log(host, "host");

  return url;
};

export default getUrl;
