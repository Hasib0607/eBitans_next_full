"use client";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import SectionHeadingThirtyFive from "../section-heading/section-heading-thirty-five";
import Link from "next/link";
import Card61 from "../card/card61";

const NewArrivalProductThirtyFive = ({ product, design, store_id }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <SectionHeadingThirtyFive title={"✦ NEW ARRIVALS ✦"} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-[30px]">
        {product?.slice(0, 10).map((productData: any) => (
          <Card61
            design={design}
            store_id={store_id}
            item={productData}
            key={productData.id}
          />
        ))}
      </div>
      <Link href="/shop">
        <div className="flex justify-center items-center gap-2 mt-6 font-bold">
          <p className="border-b border-black">View all</p>
          <AiOutlineArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default NewArrivalProductThirtyFive;
