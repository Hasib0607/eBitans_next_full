import Link from "next/link";
import React from "react";
import Card39 from "@/components/card/card39";

const BestSellerNineteen = ({ best_sell_product, store_id }: any) => {
  return (
    <div className="bg-[#faf8f1]">
      <div className="sm:container px-5 grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-10 py-16">
        <div className="">
          <p className="text-sm">BEST CATEGORIES</p>
          <h2 className="text-3xl mt-3 mb-10">The Perfect Pair</h2>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Exercitation veniam. Amet minim mollit non deserunt ullamco
            est sit aliqua dolor do amet sint. <br />
            Exercitation veniam.
          </p>
          <Link href="/shop">
            <button className="tracking-wider hover:bg-[#f7f3e3] bg-[#F1EBD1] text-[#2c291d] border border-black px-3 py-2 mt-10">
              SHOP NOW
            </button>
          </Link>
        </div>
        <div className="md:col-span-2">
          <div className="grid sm:grid-cols-2 gap-5">
            {best_sell_product?.slice(0, 2).map((data: any) => (
              <Card39 item={data} key={data?.id} store_id={store_id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerNineteen;
