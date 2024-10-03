"use client";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";

const Card20 = ({ item, store_id }: any) => {
  const [camp, setCamp] = useState<any>(null);

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  useEffect(() => {
    async function handleCampaign() {
      try {
        const response: any = await getCampaignProduct(item, store_id);
        if (!response?.error) {
          setCamp(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  return (
    <Link
      href={"/product/" + item?.id + "/" + item?.slug}
      className="h-[100px] w-[270px] flex relative"
    >
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
          <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
            Sold Out
          </p>
        </div>
      )}
      <div className="w-[100px] h-[100px] ">
        <img
          src={productImg + item?.image[0]}
          className={"w-full h-full object-cover"}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-start bg-[#f1f1f1] pl-4 grow">
        <h3 className="text-[#333] text-base whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[150px] max-w-[150px]">
          {item?.name}
        </h3>
        <p className="text-[#40af64] text-lg font-semibold">
          <BDT
            price={camp?.status === "active" ? campPrice : productGetPrice}
          />
        </p>
        {camp?.status !== "active" &&
        (item.discount_type === "no_discount" ||
          item.discount_price === "0.00") ? (
          " "
        ) : (
          <p className="line-through text-sm">
            {" "}
            <BDT price={item.regular_price} />
          </p>
        )}
        <div className="flex gap-x-1">
          <div>
            <Rate rating={item?.rating} />
          </div>
          <div className="text-gray-500 sm:text-sm text-xs">
            ({item?.number_rating})
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card20;
