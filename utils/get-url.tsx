import { headers } from "next/headers";

const getUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const forwardedPath = headersList.get("x-forwarded-path") || "";
  const url = `${host}${forwardedPath}`;

  return url;
};

export default getUrl;
