import React, { FC } from "react";
import capitalizeFirstLetter from "@/helper/capitalize-first-letter";

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  websiteName?: string;
  favicon?: string;
  logo?: string;
}

const Heading: FC<HeadProps> = ({
  title,
  description,
  keywords,
  websiteName,
  favicon,
  logo,
}) => {
  return (
    <>
      <title>
        {title
          ? `${title}`
          : "EBitans | Power Up Your Business"}
      </title>
      <meta
        name="description"
        content={
          description ||
          "eBbitans is a platform where you can create an E-commerce website for your business with just a few clicks."
        }
      />
      <meta
        name="keywords"
        content={keywords || "eBitans, eCommerce builder platform"}
      />
      <link rel="canonical" href="https://ebitans.com/" />
      <meta name="copyright" content="Copyright © eBitans" />
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="rating" content="General" />
      <meta name="owner" content="eBitans" />
      <link rel="icon" href={favicon || "%PUBLIC_URL%/favicon.ico"} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          description ||
          "eBbitans is a platform where you can create an E-commerce website for your business with just a few clicks."
        }
      />
      <meta
        property="og:image"
        content={
          logo || "https://ebitans.com/Image/cover/eBitans-logo-mockup4.jpg"
        }
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ebitans.com/" />
      <meta
        property="twitter:title"
        content="EBitans | Power Up Your Business"
      />
      <meta
        property="twitter:description"
        content="eBbitans is a platform where you can create an E-commerce website for your business with just a few clicks."
      />
      <meta
        property="twitter:image"
        content={
          logo || "https://ebitans.com/Image/cover/eBitans-logo-mockup4.jpg"
        }
      />
    </>
  );
};

export default Heading;
