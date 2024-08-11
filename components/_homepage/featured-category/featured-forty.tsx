import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import React from "react";

const FeaturedForty = ({ category }: any) => {
  return (
    <div className="mb-10">
      {category?.slice(0, 6).map((data: any) => (
        <Link key={data?.id} href={`/category/${data.id}`}>
          <div className="relative ">
            <img
              src={catImg + data?.banner}
              className="h-auto min-w-full"
              alt="cat"
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black text-white text-center py-2 px-8">
              <h1 className="py-2 text-sm uppercase">{data?.name}</h1>
              <p>SHOP NOW</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedForty;
