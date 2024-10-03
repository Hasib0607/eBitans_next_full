import Link from "next/link";
import React from "react";

const CopyrightAll = ({ headerSetting }: any) => {
  const date = new Date().getFullYear();

  return (
    <div className="">
      <p>
        © {date} All Rights Received{" "}
        <Link href="/" className="font-semibold text-red-700">
          {headerSetting?.website_name}
        </Link>
        | Developed by
        <a
          href="https://ebitans.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-red-700"
        >
          eBitans
        </a>
      </p>
    </div>
  );
};

export default CopyrightAll;
