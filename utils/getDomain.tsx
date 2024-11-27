const getDomain = () => {
  let url = "";

  if (typeof window !== "undefined") {
    const siteURL = window.location.host.startsWith("www.")
      ? window.location.host.slice(4)
      : window.location.host;

    if (siteURL != "") {
      url = siteURL;
    }
  }

  return url;
};

export default getDomain;
