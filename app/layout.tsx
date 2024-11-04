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
import Heading from "@/utils/heading";
import { imgUrl } from "@/site-settings/siteUrl";
import SetFavicon from "@/utils/useSetFavicon";
// import AllMobileBottomMenu from "./mobileBottomMenu";

const inter = Inter({ subsets: ["latin"] });

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
  const error = subDomain?.error;
  // Prepare meta information
  const websiteName = headersetting?.website_name;
  const title = `${websiteName}`;
  const description =
    headersetting?.short_description ||
    "eBbitans is a platform where you can create an E-commerce website for your business with just a few clicks.";
  const keywords = "eBitans, eCommerce builder platform";

  return (
    <html lang="en">
      <body className={`${inter.className} lg2 `}>
        {error ? (
          <WrongUrl />
        ) : (
          <>
            <SetFavicon faviconUrl={favicon} />
            <Heading
              title={title}
              description={description}
              keywords={keywords}
              favicon={favicon}
            />
            <GoogleTagManager gtmId={headersetting?.gtm} />
            <NextTopLoader />
            <Announcement design={design} url={url} />
            <AppWrapper headerSetting={headersetting} design={design}>
              {children}
              {/* <AllMobileBottomMenu /> */}
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
