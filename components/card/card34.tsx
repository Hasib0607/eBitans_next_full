"use client";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
// created by iazadur
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card34 = ({ item, design, store_id }: any) => {
  const [open, setOpen] = useState(false);
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

  const styleCss = `
    .search-bg{
        background: ${design?.header_color} ;
        color : white ;
    } 
  `;

  return (
    <div className="group flex flex-col justify-between relative">
      <style>{styleCss}</style>
      {item.discount_type === "no_discount" ||
      item.discount_price === "0.00" ? (
        ""
      ) : (
        <div
          className="absolute text-xs px-2  py-2 top-2 right-2 rounded-md"
          style={{
            background: `${design?.header_color}`,
            color: `${design?.text_color}`,
          }}
        >
          <p>
            Save {item.discount_type === "fixed" ? "BDT" : ""}{" "}
            {Math.trunc(item.discount_price)}{" "}
            {item.discount_type === "percent" ? "%" : ""}
          </p>
        </div>
      )}

      <div className=" w-full h-full overflow-hidden py-10">
        <div className="flex justify-center overflow-hidden relative">
          <Link
            href={"/product/" + item?.id + "/" + item?.slug}
            className="h-[150px] w-[150px] mx-auto border-2 rounded-full overflow-hidden bg-white"
          >
            <img
              src={productImg + item?.image[0]}
              className="block p-2 h-auto mx-auto mt-auto scale-125  transition-all duration-300 ease-linear"
              alt=""
            />
          </Link>
          <div className="h-[80px]  absolute opacity-0 group-hover:opacity-100 bottom-0 left-[50%] translate-x-[-50%] translate-y-10 group-hover:translate-y-5 transition-all duration-500 ease-linear flex divide-x-2 lg:cursor-pointer gap-4  ">
            <div
              className="rounded-full border-4 border-white h-12 w-12 flex justify-center items-center search-bg hover:bg-blue-300 duration-300"
              onClick={() => setOpen(!open)}
            >
              <AiOutlineSearch className="text-xl " />
            </div>
          </div>
        </div>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="py-5">
            <div className="flex justify-center">
              <h2 className="text-xl text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                {item?.name}
              </h2>
            </div>
            <div className="text-gray-600 text-lg font-semibold flex flex-wrap gap-1 px-5 pt-2 justify-center items-center">
              <p className="text-color" style={{ color: design?.header_color }}>
                BDT {camp?.status === "active" ? campPrice : productGetPrice}
              </p>
              <h1
                className="line-through text-sm "
                style={{ color: design?.header_color }}
              >
                {camp?.status !== "active" &&
                (item.discount_type === "no_discount" ||
                  item.discount_price === "0.00") ? (
                  " "
                ) : (
                  <p> BDT {Math.trunc(item.regular_price)}</p>
                )}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-x-1 pt-2">
              <div>
                <Rate rating={item?.rating} />
              </div>
              <div className="text-gray-500 sm:text-sm text-xs">
                ({item?.number_rating})
              </div>
            </div>
          </div>
        </Link>
      </div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card34;
