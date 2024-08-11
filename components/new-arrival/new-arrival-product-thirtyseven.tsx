"use client";
import React from "react";
import img from "@/components/new-arrival/bg-img/37/MARGIN.png";
import Image from "next/image";
import Card64 from "../card/card64";

const NewArrivalProductThirtySeven = ({ product, design, store_id }: any) => {
  if (product.length === 0) {
    return null;
  }
  return (
    <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-[#F1F9DD]">
      <div className="sm:container px-5">
        <div>
          <Image src={img} alt="margin" className="mx-auto" />
          <h1 className="text-2xl text-center">NEW ARRIVAL PRODUCTS</h1>
        </div>
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
            {product?.slice(0, 12).map((item: any, id: any) => (
              <Card64
                design={design}
                store_id={store_id}
                item={item}
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalProductThirtySeven;
