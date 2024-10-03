import React from "react";
import Newsletter from "./components/newsletter";
import Link from "next/link";

const FooterTwo = ({ menu, headerSetting, store_id }: any) => {
  const date = new Date().getFullYear();

  const styleCss = `
  .footer-page .active{
      color:#f1593a;
      font-weight: 700;
     }
  `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <Newsletter headerSetting={headerSetting} store_id={store_id} />
      <div>
        <div className="flex flex-wrap md:space-x-5 space-x-3 justify-center">
          {menu?.map((item: any) => (
            <div key={item.id} className="footer-page">
              <Link
                href={item.url}
                className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center pt-5 lg:pb-5 pb-20">
          © {date} All Rights Received{" "}
          <Link href="/" className="font-semibold text-red-700 menu-hover">
            {headerSetting?.website_name}
          </Link>{" "}
          | Developed by{" "}
          <a
            href="https://ebitans.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-700 menu-hover"
          >
            eBitans
          </a>
        </p>
      </div>

      {/* <Messenger /> */}
    </div>
  );
};

export default FooterTwo;
