import React from "react";
import FollowUs from "./components/follow-us";
import Link from "next/link";
import NewsletterTwo from "./components/newsletter-two";
import CopyrightAll from "./components/copyrightall";
import WhatsApp from "./components/whatsApp";
// import FlotingContact from '@/components/Chat/FloatingContact';
import AllPaymantGateway from "./components/all-payment-gateway";

const FooterForty = ({
  category,
  menu,
  design,
  page,
  headerSetting,
  store_id,
}: any) => {
  const result = page.filter(
    (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
  );

  const customDesign = `
    .footerColor:hover{
        color:${design?.header_color};
    }
    .searchBtn:hover{
        background-color:${design?.header_color};
        color:${design?.text_color}
    }
    .footerThirtySeven {
        margin: 0;
        padding-bottom: 7px;
        position: relative;
    }
    .footerThirtySeven:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;
        content: '';
        bottom: 0;
        width: 30px;
        left: 0;
    }
    `;
  return (
    <div className={`bg-[#F5F5F5] text-black`}>
      <footer className="">
        <style>{customDesign}</style>
        <div className="grid lg2:grid-cols-3 sm:grid-cols-1 gap-1 gap-y-5 sm:container px-5 py-10">
          <div className="">
            <h1 className="text-sm tracking-widest uppercase font-bold">
              Follow Us
            </h1>
            <div className="flex gap-x-3 mt-3 text-3xl">
              <FollowUs headerSetting={headerSetting} />
            </div>
          </div>
          <div className="xl:col-span-2 lg:col-span-2">
            <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div>
                <h1 className="text-sm tracking-widest uppercase font-bold">
                  Products
                </h1>
                <div className="mt-5">
                  {category?.slice(0, 6).map((data: any) => (
                    <Link
                      href={"/category/" + data?.id}
                      key={data?.id}
                      className="text-base footerColor font-normal leading-relaxed text-[#666666]"
                    >
                      {" "}
                      {data.name} <br />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="text-sm tracking-widest uppercase font-bold">
                  Pages
                </h1>
                <div className="mt-5 list-none">
                  {menu?.map((m: any) =>
                    m?.name !== "Category" ? (
                      <li key={m?.id}>
                        <Link
                          href={m?.url}
                          className="text-base footerColor font-normal leading-relaxed text-[#666666]"
                        >
                          {m?.name}
                        </Link>
                      </li>
                    ) : null
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-sm tracking-widest uppercase font-bold">
                  Legal
                </h1>
                <div className="mt-5 list-none">
                  {result?.map((m: any) => (
                    <li key={m?.id}>
                      <Link
                        href={"/" + m?.link}
                        className="text-base footerColor font-normal leading-relaxed text-[#666666]"
                      >
                        {" "}
                        {m?.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
                <h1 className="text-sm tracking-widest uppercase font-bold">
                  Newsletter
                </h1>
                <NewsletterTwo store_id={store_id} />
              </div>
            </div>
          </div>
        </div>
        {/* <Messenger /> */}
        <WhatsApp />
        {/* <FlotingContact /> */}
        
      </footer>

      <div className="sm:container px-5 mt-8 mb-4 text-[#666666]">
        <AllPaymantGateway headerSetting={headerSetting} />
      </div>

      <div className="pb-20 lg:pb-5 sm:container px-5 text-[#666666]">
        <CopyrightAll headerSetting={headerSetting} />
      </div>
    </div>
  );
};

export default FooterForty;
