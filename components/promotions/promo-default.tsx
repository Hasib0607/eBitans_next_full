import { bannerImg } from "@/site-settings/siteUrl";
import React from "react";

interface Banner {
  id: number;
  image: string;
  link?: string;
  status: string;
  uid: string;
  customer_id: string;
  store_id: string;
  creator: string;
  editor: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  banner: Banner[];
}

const DefaultPromo = ({ banner }: Props) => {
  return (
    <div className="bg-white py-8">
      <div className="container">
        <div className="flex flex-wrap justify-between mx-4 md:mx-0  items-center gap-4 px-6">
          {banner?.map((ban: Banner) => (
            <div
              key={ban.id}
              className="w-full sm:w-[45%] md:w-[30%] h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden"
            >
              <a
                href="https://admin.ebitans.com/design/homepage/banner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-full h-full hover:scale-[1.03] transition-all duration-200 ease-in"
                  src={bannerImg + ban.image}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultPromo;
