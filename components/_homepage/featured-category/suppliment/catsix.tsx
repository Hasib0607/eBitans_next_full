"use client";
import { iconImg } from "@/site-settings/siteUrl";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeatureCatSix = ({ item }: any) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + `getcatproducts`,
          { id: item?.id }
        );
        setResult(data?.data?.total);
      } catch(error){
        console.error("Error fetching category products:", error);
      }
    };
    fetchData();
  }, [item?.id]);

  return (
    <div>
      <Link
        href={`/category/${item.id}`}
        className="flex items-center justify-between bg-white border border-gray-100 p-5 py-10"
      >
        <div className="flex flex-col gap-5">
          <span className="text-base font-semibold text-gray-600 menu-hover">
            {item?.name}
          </span>
          <span className="italic text-gray-400 font-medium text-base">
            {result === undefined ? 0 : result} products
          </span>
        </div>

        <div>
          <img src={iconImg + item.icon} className="h-20" alt="" />
        </div>
      </Link>
    </div>
  );
};

export default FeatureCatSix;
