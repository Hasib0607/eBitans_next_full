import dynamic from "next/dynamic";
import Announcement from "@/components/announcement";
import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import AppWrapper from "./app-wrapper";
import "./globals.css";
import WrongUrl from "@/components/wrongUrl";
import { imgUrl } from "@/site-settings/siteUrl";
import SetFavicon from "@/utils/useSetFavicon";
import { Metadata } from "next";
// import AllMobileBottomMenu from "./mobileBottomMenu";
const inter = Inter({ subsets: ["latin"] });
export async function generateMetadata(): Promise<Metadata> {
  const url = getUrl();
  const subDomain = await getSubdomainName(url, "headersetting");
  const headersetting = subDomain?.headersetting;
  const websiteName = headersetting?.website_name;
  const title = `${websiteName}`;
  const description = headersetting?.short_description;
  const keywords = "eBitans, eCommerce builder platform";
  return {
    title: `${title}`,
    description: description,
    icons: { icon: imgUrl + headersetting?.favicon },
    keywords: keywords,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = getUrl();
  const subDomain = await getSubdomainName(url, "design,headersetting");
  const headersetting = subDomain?.headersetting;
  const favicon = imgUrl + headersetting?.favicon;
  const design = subDomain?.design;
  const fbPixel = headersetting?.facebook_pixel;
  const googleAnalytics = headersetting?.gtm?.google_analytics;
  const googleSearchConsole = headersetting?.gtm?.google_search_console;
  const error = subDomain?.error;
  return (
    <html lang="en">
      <head>
        {googleAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalytics}');
      `}
            </Script>
          </>
        )}
        {googleSearchConsole && (
          <meta name="google-site-verification" content={googleSearchConsole} />
        )}
      </head>
      <body className={`${inter.className} lg2 `}>
        {error ? (
          <WrongUrl />
        ) : (
          <>
            <SetFavicon faviconUrl={favicon} />
            <GoogleTagManager gtmId={headersetting?.gtm?.google_tag_manager} />
            <NextTopLoader />
            <Announcement design={design} url={url} />
            <AppWrapper headerSetting={headersetting} design={design}>
              {children}
            </AppWrapper>
            {fbPixel && (
              <>
                <Script id="facebook-pixel" strategy="afterInteractive">
                  {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', ${fbPixel});
                `}
                </Script>
                <noscript>
                  <img
                    alt="pixel"
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${fbPixel}&ev=PageView&noscript=1`}
                  />
                </noscript>
              </>
            )}
          </>
        )}
      </body>
    </html>
  );
}
