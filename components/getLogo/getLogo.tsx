import React from "react";
import Link from "next/link";
import useTheme from "@/hooks/use-theme";
import { imgUrl } from "@/site-settings/siteUrl";

export default function GetLogo() {
  const { headerSetting } = useTheme();
  return (
    <div>
      <Link href="/">
        {!headerSetting?.logo ? (
          <p>{headerSetting?.website_name}</p>
        ) : (
          <img fetchPriority="high"
            className="h-[45px] w-auto overflow-hidden"
            src={imgUrl + headerSetting?.logo}
            alt="logo"
          />
        )}
      </Link>
    </div>
  );
}
