"use client";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductCardThreeSingleCard = ({ item, store_id }: any) => {
  const [camp, setCamp] = useState<any>(null);

  const productGetPrice = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
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
    <div className="col-span-1 xl:col-span-2 lg:col-span-2 rounded-lg bg-gray-200 group relative">
      {item ? (
        <div className="">
          <div className="lg:h-[800px] w-full overflow-hidden flex justify-center items-center">
            <div className="overflow-hidden w-full h-full">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <img
                  src={productImg + item?.image[0]}
                  alt="Mountain"
                  className="h-full min-w-full object-cover group-hover:scale-105 transition-all duration-300 ease-linear"
                />
              </Link>
            </div>
          </div>

          <div className="md:flex md:justify-between px-4 py-5">
            <div>
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                {" "}
                <p className="sm:text-lg font-bold">
                  {item?.name?.slice(0, 12)} {item?.name?.length > 12 && "..."}
                </p>{" "}
              </Link>
              <Link href={`/category/${item?.category_id}`}>
                <p className="text-sm">{item.category}</p>
              </Link>
            </div>
            <div>
              <div className="line-through text-gray-400 text-sm">
                {camp?.status !== "active" &&
                (item.discount_type === "no_discount" ||
                  item.discount_price === "0.00") ? (
                  " "
                ) : (
                  <p>
                    <Taka />
                    {Math.trunc(item?.regular_price)}
                  </p>
                )}
              </div>
              <p className="text-lg font-bold">
                {" "}
                <Taka />
                {camp?.status === "active" ? campPrice : productGetPrice}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl text-black flex items-center justify-center  h-[120px] xl:h-[520px] lg:h-[520px] md:h-[220px]">
          <h2> Product Not Available</h2>
        </div>
      )}
    </div>
  );
};

export default ProductCardThreeSingleCard;
