import React, { FC } from "react";

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
      <link rel="favicon" href={favicon} />
      <title>{title}</title>
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
    </>
  );
};

export default Heading;
