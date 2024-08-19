import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AppWrapper from "./app-wrapper";
import getUrl from "@/utils/get-url";
import { getSubdomainName } from "@/lib";
import NextTopLoader from "nextjs-toploader";
import Image from "next/image";
import WrongUrl from "@/components/wrongUrl";


const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = getUrl();
  const { design, headersetting } = await getSubdomainName(
    url,
    "design,headersetting"
  );

console.log(design, 'this is url')


let api = true

  if (design !== undefined) {
    return (
      <html lang="en">
        <body className={`${inter.className} lg2`}>
          <NextTopLoader />
          <AppWrapper headerSetting={headersetting} design={design}>
            {children}
          </AppWrapper>
        </body>
      </html>
    );
  }  

  return (

    <html lang="en">
    <body className={`${inter.className} lg2`}>
      <WrongUrl/>
    </body>
  </html>
   
  ); 
}

