"use client";
import Head from "next/head";
import { useEffect } from "react";

interface SetFaviconProps {
  faviconUrl: string;
}

function updateFavicon(newFaviconUrl: string): void {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = newFaviconUrl;
  }
}

const SetFavicon: React.FC<SetFaviconProps> = ({ faviconUrl }) => {

  useEffect(() => {
    updateFavicon(faviconUrl);
  }, []);

  return (
    <Head>
      <link rel="icon" href={faviconUrl} key={faviconUrl} type="image/x-icon" />
    </Head>
  );
};

export default SetFavicon;
